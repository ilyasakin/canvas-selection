import Vector2d from "./vector2d.ts";
import Position from "./position.ts";
import Dimension from "./dimension.ts";
import State from "./state.ts";

class SelectableItem extends Vector2d {

    constructor(dimension: Dimension, position: Position, public state: State) {
        super(dimension, position);
    }

    public init(): void {
    }

    private drawSelection(ctx: CanvasRenderingContext2D, isDashed: boolean): void {
        ctx.beginPath();
        ctx.strokeStyle = 'cyan';

        if (isDashed) {
            ctx.setLineDash([5, 3])
        } else {
            ctx.setLineDash([0, 0])
        }

        ctx.rect(this.position.x - 8, this.position.y - 8, this.dimension.width + 16, this.dimension.height + 16);
        ctx.stroke();
        ctx.closePath();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.state.isHovered) {
            this.drawSelection(ctx, true);
        } else if (this.state.isSelected) {
            this.drawSelection(ctx, false);
        }

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.setLineDash([0, 0])

        ctx.rect(
            this.position.x,
            this.position.y,
            this.dimension.width,
            this.dimension.height
        );

        ctx.stroke();
        ctx.closePath();
    }
}

export default SelectableItem;