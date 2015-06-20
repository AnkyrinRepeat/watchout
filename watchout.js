// start slingin' some d3 here.


//select all .enemy
  //set position to page.width/height * math.random
  //ease the animation
  //repeat in one second

var box = d3.select('body')
              .append('svg')
              .attr('class', 'box')
              .attr('width', 700)
              .attr('height', 700);

var createEnemy = d3.select('.box').selectAll('.enemy').data([1,2,3,4,5,6]).enter()
   .append("svg").attr({"width": 700,"height": 700, "class": "enemy"})
   .append("circle").attr({"cx": 25,"cy": 25,"r": 25}).style({"fill": "purple",'position' : 'absolute'})

var moveEnemy = function() { return d3.select('.box').selectAll('.enemy').selectAll('circle').transition().attr(
  {
    'cy': function(){
      debugger;
    return d3.select('.box').node().getBoundingClientRect().height * Math.random();
  }, 'cx': function(){
    return d3.select('.box').node().getBoundingClientRect().width * Math.random();
  }
})}

var movingEnemies = function() {
  setTimeout(function() {
    moveEnemy();
    movingEnemies();
  }, 1000)
}
var dragon = d3.behavior.drag()
.on('dragstart', function(){createPlayer.style({'fill':'blue'})})
.on('drag', function(){createPlayer.attr('cx', d3.event.x).attr('cy', d3.event.y)})
.on('dragend', function(){createPlayer.style({'fill':'blue'})});
//
var createPlayer = d3.select('.box')
   .append("svg").attr({"width": 700,"height": 700, "class": "player"})
   .append("circle").style({"fill": "red", 'position' : 'absolute'})
   .attr({"cx": 25,"cy": 25,"r": 25})

d3.select('.player').call(dragon);

moveEnemy();
movingEnemies()
