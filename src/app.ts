import Position from "./position.ts";
import Dimension from "./dimension.ts";
import SelectableItem from "./selectable-item.ts";
import State from "./state.ts";

class App {
    private readonly ctx: CanvasRenderingContext2D;

    private isMouseDown: boolean = false;

    private mouseDownPosition: Position = new Position(0, 0);
    private currentMousePosition: Position = new Position(0, 0);

    private objects: SelectableItem[] = [
        new SelectableItem(
            new Dimension(100, 100),
            new Position(100, 100),
            new State(false, false)
        ),
        new SelectableItem(
            new Dimension(120, 150),
            new Position(400, 200), new State(false, false)
        ),
        new SelectableItem(
            new Dimension(50, 50),
            new Position(200, 400), new State(false, false)
        )
    ];

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
        this.objects.forEach((object) => object.init());
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
            const isStartedDragginFromTopLeft = this.mouseDownPosition.x < this.currentMousePosition.x
                && this.mouseDownPosition.y < this.currentMousePosition.y;
            const isStartedDragginFromBottomRight = this.mouseDownPosition.x > this.currentMousePosition.x
                && this.mouseDownPosition.y > this.currentMousePosition.y;
            const isStartedDragginFromTopRight = this.mouseDownPosition.x > this.currentMousePosition.x
                && this.mouseDownPosition.y < this.currentMousePosition.y;
            const isStartedDragginFromBottomLeft = this.mouseDownPosition.x < this.currentMousePosition.x
                && this.mouseDownPosition.y > this.currentMousePosition.y;

            // is drawn rectangle intersecting with any of the objects?
            this.objects.forEach((object) => {
                if (isStartedDragginFromTopLeft) {
                    if (this.mouseDownPosition.x < object.position.x + object.dimension.width
                        && this.mouseDownPosition.y < object.position.y + object.dimension.height
                        && this.currentMousePosition.x > object.position.x
                        && this.currentMousePosition.y > object.position.y) {
                        object.state.isHovered = true;
                    } else {
                        object.state.isHovered = false;
                    }

                }

                if (isStartedDragginFromBottomRight) {
                    if (this.mouseDownPosition.x > object.position.x
                        && this.mouseDownPosition.y > object.position.y
                        && this.currentMousePosition.x < object.position.x + object.dimension.width
                        && this.currentMousePosition.y < object.position.y + object.dimension.height) {
                        object.state.isHovered = true;
                    } else {
                        object.state.isHovered = false;
                    }
                }

                if (isStartedDragginFromTopRight) {
                    if (this.mouseDownPosition.x > object.position.x
                        && this.mouseDownPosition.y < object.position.y + object.dimension.height
                        && this.currentMousePosition.x < object.position.x + object.dimension.width
                        && this.currentMousePosition.y > object.position.y) {
                        object.state.isHovered = true;
                    } else {
                        object.state.isHovered = false;
                    }
                }

                if (isStartedDragginFromBottomLeft) {
                    if (this.mouseDownPosition.x < object.position.x + object.dimension.width
                        && this.mouseDownPosition.y > object.position.y
                        && this.currentMousePosition.x > object.position.x
                        && this.currentMousePosition.y < object.position.y + object.dimension.height) {
                        object.state.isHovered = true;
                    } else {
                        object.state.isHovered = false;
                    }
                }
            });
        }

        this.objects.forEach((object) => object.draw(this.ctx));

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private onMouseDown(event: MouseEvent): void {
        console.log("Mouse down")
        const rect = this.canvas.getBoundingClientRect();

        this.mouseDownPosition.x = event.clientX - rect.left;
        this.mouseDownPosition.y = event.clientY - rect.top;

        this.isMouseDown = true;
    }

    private onMouseUp(): void {
        this.isMouseDown = false;
        this.objects.forEach((object) => {
            if (object.state.isHovered) {
                object.state.isSelected = true;
                object.state.isHovered = false;
            } else {
                object.state.isSelected = false;
                object.state.isHovered = false;
            }
        });
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
        
        window.addEventListener("click", () => {
            // const rect = this.canvas.getBoundingClientRect();
            // const clickPosition = new Position(
            //     event.clientX - rect.left,
            //     event.clientY - rect.top
            // );
            //
            // this.objects.forEach((object) => {
            //         if (clickPosition.x > object.position.x
            //             && clickPosition.x < object.position.x + object.dimension.width
            //             && clickPosition.y > object.position.y
            //             && clickPosition.y < object.position.y + object.dimension.height) {
            //             object.state.isSelected = true;
            //             object.state.isHovered = false;
            //         } else {
            //             object.state.isSelected = false;
            //             object.state.isHovered = false;
            //         }
            //     }
            // );
        });
    }
}

export default App;