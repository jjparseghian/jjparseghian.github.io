"use strict"

$(document).ready(function(){

  var ConnectTheDots = (function(){

    // Reset canvas width and height on window resize
    var resizeCanvas = function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var context = canvas.getContext("2d");

    var instructions = document.getElementsByTagName("p")[0]

    // Draw dots on mouse click
    canvas.addEventListener('click', function(evt){
      var d = new Dot(canvas, evt);
      d.draw(evt)
      instructions.className = 'hide'
    });

    var solveButton = document.querySelector("#solve");
    var resetButton = document.querySelector("#reset");

    // Function to toggle button display
    var toggle = function(ele){
      var element = ele
      if (element.className == 'hide'){
        element.className = '';
      } else {
        element.className = 'hide';
      };
    };

    // On click run solve function and toggle button displays
    solveButton.addEventListener('click', function(evt){
      solve();
      toggle(solveButton);
      toggle(resetButton);
    });

    // On click reset canvas and toggle button displays
    resetButton.addEventListener('click', function(evt){
      resetCanvas();
      toggle(solveButton);
      toggle(resetButton);
      instructions.className = '';
    });


    // Collection of all dots
    var allDots = [];

    // Dot object constructor
    var Dot = function(canvas, evt){
      this.pos = getMousePos(canvas, evt)
    }

    // Dot drawing function
    Dot.prototype.draw = function(e){
      var posx = this.pos.x;
      var posy = this.pos.y;

      context.fillStyle = "black";
      context.beginPath();
      context.arc(posx, posy, 2, 0, 2*Math.PI);
      context.fill();

      // Add Dot objects to collection
      allDots.push(this)
    }

    // Function to get mouse position
    var getMousePos = function(canvas, evt){
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }

    // Function to connect the dots
    var solve = function(){

      // Find the center point
      var sumX = 0;
      var sumY = 0;

      // Calculate sum of X ann Y coordinates
      for (var i = 0; i < allDots.length; i++) {
        sumX += allDots[i].pos.x;
        sumY += allDots[i].pos.y;
      };

      // Center point is average x, y coordinate
      var centerPoint = {
        x: sumX / allDots.length,
        y: sumY / allDots.length
      };

      // Compute angle from center to each point
      for (var i = 0; i < allDots.length; i++) {
        allDots[i].angle = Math.atan2(allDots[i].pos.y - centerPoint.y, allDots[i].pos.x - centerPoint.x)
      }

      // Sort points based on angles from center point
      allDots.sort(function(a, b){
        if (a.angle < b.angle) {
          return -1;
        } else if (a.angle > b.angle) {
          return 1;
        } else {
          return 0;
        };
      });

      // Connect paths between points
      for (var i = 0; i < allDots.length; i++) {
        context.beginPath();
        context.moveTo(allDots[i].pos.x, allDots[i].pos.y);
        if (i < allDots.length - 1) {
          context.lineTo(allDots[i + 1].pos.x, allDots[i + 1].pos.y);
        } else {
          context.lineTo(allDots[0].pos.x, allDots[0].pos.y);
        };
        context.stroke();
      };
    }

    // Function to clear the canvas
    var resetCanvas = function(){
      allDots = [];
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

  }());

});