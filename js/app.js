// 游戏的状态，可以为 'menu' 或者 'gaming'
var stage = 'menu';

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

// 角色选择器
var  CharSelector = function() {
    // 选择框图像
    this.sprite = "images/Selector.png";

    // 角色形象数组
    this.avatars = [
        "images/char-princess-girl.png",
        "images/char-pink-girl.png",
        "images/char-boy.png",
        "images/char-horn-girl.png",
        "images/char-cat-girl.png",
    ];

    this.reset();
};

CharSelector.prototype.reset = function() {
    // 初始化选择器横坐标
    this.x = 0;

    // 初始化横轴位移
    this.offset = 41;

    // 选择完成标志
    this.completed = false;

    // 初始化角色形象选择
    this.selected = 2;
};

CharSelector.prototype.render = function() {
    ctx.font = "24px normal";
    ctx.strokeText("请选择角色", 155 + this.offset, 150);

    // 渲染选择框
    ctx.drawImage(Resources.get(this.sprite), this.x, 200);

    // 渲染所有角色形象
    this.avatars.forEach(function(avatar, index) {
        ctx.drawImage(Resources.get(avatar), index * 83 + this.offset, 200);
    }.bind(this));
};

// 更新选择框横坐标，并返回选择完成标志量
CharSelector.prototype.update = function() {
    this.x = this.selected * 83 + this.offset;
    return this.completed;
};

// 左右进行循环选择，回车确认选择
CharSelector.prototype.handleInput = function(key) {
    switch(key)
    {
        case "right":
            this.selected += 1;
            break;
        case "left":
            this.selected -= 1;
            break;
        case "enter":
            this.completed = true;
            player.sprite = this.avatars[this.selected];
            break;
    }

    if (this.selected<0) {
        this.selected = this.avatars.length - 1; 
    }

    if (this.selected>this.avatars.length - 1) {
        this.selected = 0;
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 实例化角色形象选择器
var charSelector = new CharSelector();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (stage=='gaming') {
        player.handleInput(allowedKeys[e.keyCode]);
    }

    if (stage=='menu') {
        charSelector.handleInput(allowedKeys[e.keyCode]);
    }
});
