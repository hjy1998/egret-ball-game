class Ball extends eui.Component implements eui.UIComponent {
    public constructor() {
        super();

        this.skinName = "resource/gameSkin/ball.exml"
    }

    public btn_start: eui.Button;
    public img_ball: eui.Image;
    public win_Top: eui.Image;
    public win_Bottom: eui.Image;
    public i: number = 1;
    public tw: egret.Tween;
    random: number;

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.btn_start.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            this.onButtonClick,
            this,
        )
    }

    private onButtonClick(e: egret.TouchEvent) {
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
    }

    private ballTween() {
        this.random = Math.random();
        if (this.random < 0.5) {
            this.tw = egret.Tween.get(this.img_ball)
            this.tw.to({ y: 900 }, 250).to({ y: 100 }, 500).to({ y: 900 }, 500)
                .to({ y: 100 }, 500).to({ y: 900 }, 500).to({ y: 100 }, 500);
            this.tw.call(() => {
                this.win_Bottom.visible = true;
                this.btn_start.currentState = "reset";
                this.i = 4;
            })
        } else if (this.random > 0.5) {
            this.tw = egret.Tween.get(this.img_ball)
            this.tw.to({ y: 900 }, 250).to({ y: 100 }, 500).to({ y: 900 }, 500)
                .to({ y: 100 }, 500).to({ y: 900 }, 500);
            this.tw.call(() => {
                this.win_Top.visible = true;
                this.btn_start.currentState = "reset";
                this.i = 4;
            });
        };
    };

}