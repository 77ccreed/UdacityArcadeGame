"use strict";

// Random number, use when make bug speed and row (I add +1(row) and *72(height))
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max) + 1) * 72);
}

// Variables
let lives = 5;
let level = 1;
let score = 0;

// Canvas width and heigth
const tileWidth = 101;
const tileHeight = 83;


// Superclass, some common methods in both player and enemy classes have
class gameObject {
    //constructor for gameObject
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    // Draw the gameObject on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends gameObject{
    constructor(y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super();
        this.sprite = 'images/enemy-bug.png';
        this.x = -70;
        this.y = y;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (this.x < 505) {
            this.x += this.speed * dt;
        } else {
            this.x = -70;
            this.y = getRandomInt(3);
            this.speed = getRandomInt(8);
        }
        //2D collision detection function from: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (this.x < player.x + 35 &&
            this.x + 60 > player.x &&
            this.y < player.y + 62 &&
            65 + this.y > player.y) {
            player.x = 202;
            player.y = 390;
            score -= 50;
            document.getElementById("scoreDisplay").innerHTML = score;
            lives = document.getElementById("livesDisplay").innerHTML;
            lives--;
            document.getElementById("livesDisplay").innerHTML = lives;
            if (lives === 0) {
                   // Select modal
                   const loseModal = document.getElementById('lose_modal');
                   // Switch modal from display none to display block
                   loseModal.style.display = 'block';
                   // Add a click event listener to the document
                   document.addEventListener('keydown', e => {
                       if (e.keyCode === 13) {
                           loseModal.style.display = 'none';              
                           level=1;
                           document.getElementById("levelDisplay").innerHTML = level;
                          score = 0;
                          document.getElementById("scoreDisplay").innerHTML = score;
                          lives = 5;
                          document.getElementById("livesDisplay").innerHTML = lives;
                       }
                   });
            }
        }
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Draw the enemy on the screen, required method for game
   
}

// Now write your own player class
class Player extends gameObject {
    constructor(y, x) {
        super();
        this.x = 202;
        this.y = 390;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {
        if (this.y < 0) {
            this.x = 202;
            this.y = 390;
            score += 100;
            document.getElementById("scoreDisplay").innerHTML = score;
            level++;
            document.getElementById("levelDisplay").innerHTML = level;
        }
    }


    handleInput(key) {
        switch (key) {
            case 'up':
                if (this.y > 0) {
                    this.y -= tileHeight;
                }
                break;
            case 'down':
                if (this.y < 370) {
                    this.y += tileHeight;
                }
                break;
            case 'left':
                if (this.x >= tileWidth) {
                    this.x -= tileWidth;
                }
                break;
            case 'right':
                if (this.x <= 303) {
                    this.x += tileWidth;
                }
                break;
        }
    }
}

class Rock extends gameObject {
constructor(x,y){
      super();
      this.x = 400;
      this.y = 200;
      this.sprite = 'images/Rock.png';
}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const newEnemy = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy1 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy2 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy3 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy4 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy5 = new Enemy(getRandomInt(3), getRandomInt(8));

const allEnemies = [newEnemy, newEnemy1, newEnemy2, newEnemy3, newEnemy4, newEnemy5];
// Place all rock objects in an array called allRock
const newRock = new Rock();
const allRock = [newRock];
// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

