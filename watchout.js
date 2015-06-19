// start slingin' some d3 here.


//select all .enemy
  //set position to page.width/height * math.random
  //ease the animation
  //repeat in one second

var createEnemy = function() {
  return d3.select('body').selectAll('.enemy').data([1,2,3,4,5,6]).enter()
   .append("svg").attr({"width": 50,"height": 50, "class": "enemy"})
   .append("circle").attr({"cx": 25,"cy": 25,"r": 25}).style("fill", "purple")
}
var moveEnemy = function() { return d3.select('body').selectAll('.enemy').transition().style(
  {'position' : 'absolute',
    'top': function(){
    return d3.select('body').node().getBoundingClientRect().height * Math.random();
  }, 'left': function(){
    return d3.select('body').node().getBoundingClientRect().width * Math.random();
  }
})}

var movingEnemies = function() {
  setTimeout(function() {
    moveEnemy();
    movingEnemies();
  }, 1000)
}

var createPlayer = function() {
  return d3.select('body').selectAll('.player').data([1]).enter()
   .append("svg").attr({"width": 50,"height": 50, "class": "player"})
   .append("circle").attr({"cx": 25,"cy": 25,"r": 25}).style("fill", "red")
}


createEnemy()
movingEnemies();
