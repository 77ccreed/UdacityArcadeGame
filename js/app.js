

function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max) + 1) * 63);
}

const tileWidth = 101;
const tileHeight = 83;
// Enemies our player must avoid

class Enemy {
    constructor(y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
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
        }
        //2D collision detection function from: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (this.x < player.x + 35 &&
            this.x + 60 > player.x &&
            this.y < player.y + 62 &&
            65 + this.y > player.y) {
            player.x = 202;
            player.y = 390;
        }
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor(y, x) {
        this.x = 202;
        this.y = 390;
        this.sprite = 'images/char-boy.png';
    }
    update(dt) {
        if (this.y < 0 && this.x===202) {
            this.x = 202;
            this.y = 390;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
// Now write your own player class
/*
let Player = function (x, y) {
    this.x = 202;
    this.y = 390;
    this.sprite = 'images/char-boy.png';

};


Player.prototype.update = function (dt) {};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function (key) {
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

 console.log(this.x, this.y);
 
};*/



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


const newEnemy = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy1 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy2 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy3 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy4 = new Enemy(getRandomInt(3), getRandomInt(8));
const newEnemy5 = new Enemy(getRandomInt(3), getRandomInt(8));

const allEnemies = [newEnemy, newEnemy1, newEnemy2, newEnemy3, newEnemy4, newEnemy5];
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