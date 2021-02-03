var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/gameSkin/ball.exml";
        return _this;
    }
    Ball.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Ball.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartGame, this);
        this.btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseGame, this);
        this.btn_resume.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResumeGame, this);
        this.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetGame, this);
    };
    Ball.prototype.onStartGame = function (e) {
        this.btn_start.visible = false;
        this.btn_pause.visible = true;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.ballTween();
    };
    Ball.prototype.onPauseGame = function (e) {
        this.btn_start.visible = false;
        this.btn_pause.visible = false;
        this.btn_resume.visible = true;
        this.btn_reset.visible = false;
        this.tw.setPaused(true);
    };
    Ball.prototype.onResumeGame = function (e) {
        this.btn_start.visible = false;
        this.btn_pause.visible = true;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.tw.setPaused(false);
    };
    Ball.prototype.onResetGame = function (e) {
        this.btn_start.visible = true;
        this.btn_pause.visible = false;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.win_Top.visible = false;
        this.win_Bottom.visible = false;
        this.img_ball.x = 242;
        this.img_ball.y = 485;
    };
    Ball.prototype.ballTween = function () {
        var _this = this;
        this.tw = egret.Tween.get(this.img_ball);
        var bounceTimes = Math.floor(Math.random() * 4) + 5;
        var i = 1;
        var bounce = function () {
            _this.tw = egret.Tween.get(_this.img_ball);
            console.log(i === bounceTimes);
            if ((_this.img_ball.y === 100 || _this.img_ball.y === 900) && i === bounceTimes) {
                if (_this.img_ball.y === 100) {
                    _this.win_Top.visible = false;
                    _this.win_Bottom.visible = true;
                    _this.btn_start.visible = false;
                    _this.btn_pause.visible = false;
                    _this.btn_resume.visible = false;
                    _this.btn_reset.visible = true;
                    _this.tw.setPaused(true);
                }
                else if (_this.img_ball.y === 900) {
                    _this.win_Top.visible = true;
                    _this.win_Bottom.visible = false;
                    _this.btn_start.visible = false;
                    _this.btn_pause.visible = false;
                    _this.btn_resume.visible = false;
                    _this.btn_reset.visible = true;
                    _this.tw.setPaused(true);
                }
                ;
            }
            if (_this.img_ball.y === 100 || _this.img_ball.y === 900) {
                console.log(i, bounceTimes);
                if (i <= bounceTimes) {
                    if (_this.img_ball.y === 900) {
                        _this.tw.to({ y: 100 }, 500);
                    }
                    else if (_this.img_ball.y === 100) {
                        _this.tw.to({ y: 900 }, 500);
                    }
                    ;
                }
                i++;
            }
            _this.tw.call(bounce, _this);
        };
        this.tw.to({ y: 900 }, 250);
        bounce();
    };
    ;
    return Ball;
}(eui.Component));
__reflect(Ball.prototype, "Ball", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Ball.js.map