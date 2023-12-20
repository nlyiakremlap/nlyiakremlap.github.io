var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y) {
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      game.addGameItem(sawBladeHitZone);
      var obstacleImage = draw.bitmap("img/sawblade.png");
      sawBladeHitZone.addChild(obstacleImage);
      obstacleImage.x = -25;
      obstacleImage.y = -25;
    }
    createSawBlade(400, 350);
    createSawBlade(600, 350);
    createSawBlade(800, 350);

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy, 25");
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = groundY - y;
      game.addGameItem(enemy);
      enemy.velocityX = -3
      enemy.rotationVelocity = 9
      enemy.onPlayerCollision = function () {
        game.changeIntergrity(-10)
      }

      enemy.onProjectileCollision + function () {
        game.increaseScore(100);
        enemy.fadeOut();
      }
    };
    createEnemy(400, 10);
    createEnemy(800, 15);
    createEnemy(1200, x2);

    function createReward(x, y) {
      var rewards = game.createGameItem("reward", 25);
      var redSquare = draw.rect(50, 50, "pink");
      redSquare.x = -25;
      redSquare.y = -25;
      rewards.addChild(redSquare);
      rewards.x = x; 300
      rewards.y = groundY - y;
      game.addGameItem(rewards);
      rewards.velocityX = -1;
      rewards.rotationalVelocity = 9
      rewards.onPlayerCollision = function () {
        game.changeItegrity(100);
        rewards.fadeOut()
      }
    }
    createReward(600, groundY - 260);

    function createMarker(x, y) {
      var endmarker = game.createGameItem("endmarker", 45)
      var rect = draw.rect (100, 100, "blue");
      rect.x = 50;
      rect.y = 50;
      endmarker.addChild(rect);
      endmarker.x = x;
      endmarker.y = y;
      game.addGameITem(endmarker);
      endmarker.velocityX = -1;
      endmarker.onPlayerCollision = function () {
        startLevel()
      };
      endmarker.onProjectileCollision = function () {
        startLevel()
      }
    }
    createMarker(1500, groundY - 60);
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems
      for (var i = 0; i < levelObjects.length; i++) {
        if (levelObjects[i].type === "sawblade") {
          createSawBlade((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "enemy") {
          createEnemy((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "reward") {
          createReward((levelObjects[i].x), (levelObjects[i].y))
        }
        else if (levelObjects[i].type === "endmarker") {
          createMarker((levelObjects[i].x), (levelObjects[i].y))
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
