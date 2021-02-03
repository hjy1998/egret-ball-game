class Ball extends eui.Component implements eui.UIComponent {
    public constructor() {
        super();

        this.skinName = "resource/gameSkin/ball.exml"
    }

    public btn_start: eui.Button;
    public img_ball: eui.Image;
    public win_Top: eui.Image;
    public win_Bottom: eui.Image;
    public tw: egret.Tween;
    public btn_pause: eui.Group;
    public btn_resume: eui.Group
    public btn_reset: eui.Group;

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }


    protected childrenCreated(): void {
        super.childrenCreated();
        this.btn_start.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            this.onStartGame,
            this,
        )

        this.btn_pause.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            this.onPauseGame,
            this,
        )

        this.btn_resume.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            this.onResumeGame,
            this,
        )

        this.btn_reset.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            this.onResetGame,
            this,
        )
    }

    private onStartGame(e: egret.TouchEvent) {
        this.btn_start.visible = false;
        this.btn_pause.visible = true;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.ballTween();
    }

    private onPauseGame(e: egret.TouchEvent) {
        this.btn_start.visible = false;
        this.btn_pause.visible = false;
        this.btn_resume.visible = true;
        this.btn_reset.visible = false;
        this.tw.setPaused(true);

    }

    private onResumeGame(e: egret.TouchEvent) {
        this.btn_start.visible = false;
        this.btn_pause.visible = true;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.tw.setPaused(false);
    }

    private onResetGame(e: egret.TouchEvent) {
        this.btn_start.visible = true;
        this.btn_pause.visible = false;
        this.btn_resume.visible = false;
        this.btn_reset.visible = false;
        this.win_Top.visible = false;
        this.win_Bottom.visible = false;
        this.img_ball.x = 242;
        this.img_ball.y = 485;
    }

    private ballTween() {
        this.tw = egret.Tween.get(this.img_ball);

        let bounceTimes = Math.floor(Math.random() * 4) + 5;
        let i = 1;
        const bounce = () => {
            this.tw = egret.Tween.get(this.img_ball);

            if ((this.img_ball.y === 100 || this.img_ball.y === 900) && i === bounceTimes) {
                if (this.img_ball.y === 100) {
                    this.win_Top.visible = false;
                    this.win_Bottom.visible = true;
                    this.btn_start.visible = false;
                    this.btn_pause.visible = false;
                    this.btn_resume.visible = false;
                    this.btn_reset.visible = true;
                    this.tw.setPaused(true);
                } else if (this.img_ball.y === 900) {
                    this.win_Top.visible = true;
                    this.win_Bottom.visible = false;
                    this.btn_start.visible = false;
                    this.btn_pause.visible = false;
                    this.btn_resume.visible = false;
                    this.btn_reset.visible = true;
                    this.tw.setPaused(true);
                };
            }
            
            if (this.img_ball.y === 100 || this.img_ball.y === 900) {
                if (i <= bounceTimes) {
                    if (this.img_ball.y === 900) {
                        this.tw.to({ y: 100 }, 500);
                    } else if (this.img_ball.y === 100) {
                        this.tw.to({ y: 900 }, 500);
                    };
                }
                i++;
            }

            this.tw.call(bounce, this);
        };

        this.tw.to({ y: 900 }, 250);
        bounce();
    };

}