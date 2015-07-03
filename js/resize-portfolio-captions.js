$(document).ready(function(){
  var heights = $(".portfolio-caption").map(function() {
    return $(this).height();
  })

  maxHeight = Math.max.apply(null, heights);

  $(".portfolio-caption").height(maxHeight);
});
