// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

    // 重置行进参数
    this.reset();
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + dt * this.speed;
    this.y = this.row * 83 - 23;

    // 如果敌人移出了 canvas 范围，则重新设定参数进入 canvas
    if (this.x>502) {
        this.reset();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 重置敌人行进参数
Enemy.prototype.reset = function() {
    // 随机选择一行作为行进道路
    this.row = 1 + Math.floor(Math.random() * 3);

    // 随机选择速度
    this.speed = 100 * (2 + Math.floor(Math.random() * 3));

    // 初始化横坐标
    this.x = -101;
};

// 检测碰撞
Enemy.prototype.checkCollisions = function(player) {
    return this.row==player.row&&this.x>player.x-60&&this.x<player.x+55;
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

// 此为游戏必须的函数，用来更新玩家的位置
Player.prototype.update = function() {
    this.x = this.col * 101;
    this.y = this.row * 83 - 30;
};

// 此为游戏必须的函数，用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 接受指令支字符串用来移动玩家
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left': 
            this.col -= 1;
            break;
        case 'up':
            this.row -= 1;
            break;
        case 'right': 
            this.col += 1;
            break;
        case 'down':
            this.row += 1;
            break;
    }

    if (this.col<0) {
        this.col = 0;
    }

    if (this.col>4) {
        this.col = 4;
    }

    if (this.row<1) {
        this.row = 1;
    }

    if (this.row>5) {
        this.row = 5;
    }
};

// 重置玩家初始参数
Player.prototype.reset = function() {
    // 设置玩家初始位置
    this.col = 2;
    this.row = 5;
};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
