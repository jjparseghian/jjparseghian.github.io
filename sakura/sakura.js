"use strict"

var branchCount = 0

var Sakura = function (trunk) {
  this.trunk = new Branch(Math.random() * 10, Math.random() / 10.0, 0, this);
  this.canvas = document.getElementById("the-canvas")
  this.canvas.width = this.canvas.clientWidth
  this.canvas.height = this.canvas.clientHeight
  this.ctx = this.canvas.getContext('2d')
  this.tick = this.tick.bind(this)

};

Sakura.prototype.draw = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Sakura.prototype.tick = function () {
  // requests another animation frame
  // calls tick on tree's trunck
  window.requestAnimationFrame(this.tick)
  var t = new Turtle();
  t.x = this.canvas.width / 2
  t.y = this.canvas.height
  if (branchCount < 4000) {
    this.draw()
    this.trunk.tick(t)
    window.cancelAnimationFrame(this.tick)
  }
};


var Branch = function (length, thickness, angle, tree) {
  this.length = length;
  this.thickness = thickness;
  this.angle = angle;
  this.tree = tree;
  this.children = [];
  branchCount += 1;
  this.depth = 0
  // console.log(branchCount)
}

var randomLength = function () {
  return Math.floor( Math.random() * 5 ) + 1
}

Branch.prototype.draw = function (turtle) {
  // stuff
  this.tree.ctx.beginPath();
  this.tree.ctx.lineWidth = this.thickness;
  this.tree.ctx.strokeStyle = "black";
  // console.log("position", turtle.pos);
  this.tree.ctx.moveTo(turtle.pos[0], turtle.pos[1]);
  turtle.turnRight(this.angle);
  turtle.fwd(this.length);
  this.tree.ctx.lineTo(turtle.pos[0], turtle.pos[1]);
  this.tree.ctx.stroke();
  // console.log("position 2", turtle.pos);

if(this.depth>5 && this.depth<10) {
  if (branchCount > 100) {
    this.tree.ctx.beginPath();
    this.tree.ctx.lineWidth = "4";
    this.tree.ctx.strokeStyle = "green";
    this.tree.ctx.rect(turtle.x, turtle.y, 2, 2);
    this.tree.ctx.stroke();
  }

}
if (this.depth >= 7) {
  if (branchCount > 1000) {
    this.tree.ctx.beginPath();
    this.tree.ctx.lineWidth = "4";
    this.tree.ctx.strokeStyle = "pink";
    this.tree.ctx.rect(turtle.x + 5, turtle.y + 5, 2, 2);
    this.tree.ctx.stroke();
  }

}

}

Branch.prototype.tick = function (turtle) {
  // grows branch by a random amount
  // sprouts new children 0.3% of the time
  // calls tick on all of its children
  this.length +=  Math.random() / 15.0;
  this.thickness += Math.random() / 60.0;
  // if (branchCount > 1000) {
  //   this.angle += (0.001 * this.depth);
  // }
  // this.angle += Math.random() - 0.5; // wobble
  if (Math.random() <= 0.003) {
    var b = new Branch(Math.random() * 15, (Math.random() / 65.0), (Math.random() * 90) - 45, this.tree)
    b.depth = this.depth + 1;
    this.children.push(b)

  };
  var i = this.children.length;
  this.draw(turtle)
    while (--i >= 0) {
      this.children[i].tick(turtle.spawn())
    }
}


var tree1 = new Sakura()
console.log(tree1.tick())