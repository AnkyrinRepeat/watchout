var score = 0;
var highScore = 0;
var collisionCount = 0;

var box = d3.select('body')
              .append('svg')
              .attr({'class': 'box','width': 700,'height': 700, 'border': '10px solid red'});

var createEnemy = d3.select('.box').selectAll('.enemy').data([1,2,3,4,5,6]).enter()
   .append("svg").attr({"width": 700,"height": 700, "class": "enemy"})
   .append("circle").attr({"cx": 25,"cy": 25,"r": 25}).style({"fill": "purple",'position' : 'absolute'})

var moveEnemy = function() { return d3.select('.box').selectAll('.enemy').selectAll('circle')
 .transition().ease('linear').duration(2000).attr(
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
  }, 2000)
}
var dragon = d3.behavior.drag()
.on('dragstart', function(){createPlayer.style({'fill':'blue'})})
.on('drag', function(){createPlayer.attr('cx', d3.event.x).attr('cy', d3.event.y)})
.on('dragend', function(){createPlayer.style({'fill':'red'})});
//
var createPlayer = d3.select('.box')
   .append("svg").attr({"width": 700,"height": 700, "class": "player"})
   .append("circle").style({"fill": "red", 'position' : 'absolute'})
   .attr({"cx": 150,"cy": 150,"r": 25})

d3.select('.player').call(dragon);


var collision = function() {
  setInterval(function(){
    var playerX = Math.abs(d3.select('.player').select('circle').attr('cx'))
    var playerY = Math.abs(d3.select('.player').select('circle').attr('cy'))
    var playerR = Math.abs(d3.select('.player').select('circle').attr('r'))

    var checkCollision = function() {
      for (var i = 0; i < createEnemy[0].length; i++){
        var enemy = createEnemy[0][i];
        var enemyX = enemy.cx.animVal.value
        var enemyY = enemy.cy.animVal.value
        var enemyR = enemy.r.animVal.value
        if (Math.abs(enemyX-playerX) < 50 && Math.abs(enemyY-playerY) < 50) {
          collisionCount++
          score=0;
        }
      }
    }
    checkCollision()
  },100)
}

var updateScore = function() {
  d3.select('.scoreboard .current span').text(score)
  d3.select('.scoreboard .high span').text(highScore)
  d3.select('.scoreboard .collisions span').text(collisionCount)
}
var increaseScore = function() {
  setInterval(function() {
    score++
    highScore = Math.max(score, highScore)
    updateScore()
  }, 100)
}

collision()
movingEnemies()
increaseScore()
