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
        _this.i = 1;
        _this.skinName = "resource/gameSkin/ball.exml";
        return _this;
    }
    Ball.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Ball.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    Ball.prototype.onButtonClick = function (e) {
        switch (this.i) {
            case 1:
                this.ballTween();
                this.i++;
                this.btn_start.currentState = "pause";
                break;
            case 2:
                this.tw.setPaused(true);
                this.i++;
                this.btn_start.currentState = "resume";
                break;
            case 3:
                this.tw.setPaused(false);
                this.i = 2;
                this.btn_start.currentState = "pause";
                break;
            case 4:
                this.win_Top.visible = false;
                this.win_Bottom.visible = false;
                this.img_ball.x = 242;
                this.img_ball.y = 485;
                this.i = 1;
                this.btn_start.currentState = "up";
                break;
        }
    };
    Ball.prototype.ballTween = function () {
        var _this = this;
        this.random = Math.random();
        if (this.random < 0.5) {
            this.tw = egret.Tween.get(this.img_ball);
            this.tw.to({ y: 900 }, 250).to({ y: 100 }, 500).to({ y: 900 }, 500)
                .to({ y: 100 }, 500).to({ y: 900 }, 500).to({ y: 100 }, 500);
            this.tw.call(function () {
                _this.win_Bottom.visible = true;
                _this.btn_start.currentState = "reset";
                _this.i = 4;
            });
        }
        else if (this.random > 0.5) {
            this.tw = egret.Tween.get(this.img_ball);
            this.tw.to({ y: 900 }, 250).to({ y: 100 }, 500).to({ y: 900 }, 500)
                .to({ y: 100 }, 500).to({ y: 900 }, 500);
            this.tw.call(function () {
                _this.win_Top.visible = true;
                _this.btn_start.currentState = "reset";
                _this.i = 4;
            });
        }
        ;
    };
    ;
    return Ball;
}(eui.Component));
__reflect(Ball.prototype, "Ball", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Ball.js.map