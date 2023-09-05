import Position from "./position.ts";

class App {
    private readonly ctx: CanvasRenderingContext2D;

    private isMouseDown: boolean = false;
    private isShiftDown: boolean = false;

    private mouseDownPosition: Position = new Position(0, 0);
    private currentMousePosition: Position = new Position(0, 0);

    constructor(private canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not found');
        }

        this.ctx = ctx;

        this.init();
    }

    public init(): void {
        this.initEventListeners();
        this.loop();
    }

    public loop(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.isMouseDown) {
            this.ctx.beginPath();
            this.ctx.setLineDash([5, 3])

            this.ctx.rect(
                this.mouseDownPosition.x,
                this.mouseDownPosition.y,
                this.currentMousePosition.x - this.mouseDownPosition.x,
                this.currentMousePosition.y - this.mouseDownPosition.y
            );

            this.ctx.stroke();
        }
        
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private onMouseDown(event: MouseEvent): void {
        console.log("Mouse down")
        const rect = this.canvas.getBoundingClientRect();

        this.mouseDownPosition.x = event.clientX - rect.left;
        this.mouseDownPosition.y = event.clientY - rect.top;

        this.isMouseDown = true;
    }

    private onMouseUp(event: MouseEvent): void {
        this.isMouseDown = false;
    }

    private onMouseMove(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();

        this.currentMousePosition.x = event.clientX - rect.left;
        this.currentMousePosition.y = event.clientY - rect.top;
    }

    private initEventListeners(): void {
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Shift") {
                this.isShiftDown = true;
            }
        });

        window.addEventListener("keyup", (event: KeyboardEvent) => {
            if (event.key === "Shift") {
                this.isShiftDown = false;
            }
        });
    }
}

export default App;