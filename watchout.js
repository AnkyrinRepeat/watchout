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

//implement score
var collision = function() {
  setTimeout(function(){
  var checkXCollision = function(enemyX, playerX) {
    if (Math.abs(enemyX-playerX) < playerR)) {
      collide()
    }
  }

  d3.select('.enemy').data([1,2,3,4,5,6]).enter().checkXCollision(this.cx, playerX)
    // var playerX = d3.selectAll('.player').selectAll('circle').attr("cx", function(d) { return d; })
    // var playerY = d3.selectAll('.player').selectAll('circle').attr("cy", function(d) { debugger; return d; })
    // var enemies = d3.selectAll('.enemy').selectAll('circle')
    // debugger;
    // for (var i = 0; enemies.length; i++ ){
    //  var enemyX = enemies[i].attr("cx", function(d) { return d.x; })
    //  var enemyY = enemies[i].attr("cy", function(d) { return d.y; })
    // }
  },100)
}
//if player.x+r = enemy.x || player.x-r = enemy.x

//if player.y+r = enemy.y || player.y-r = enemy.y
  //worlds collide
  //reset score
collision();
moveEnemy();
movingEnemies()
