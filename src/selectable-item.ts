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

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();

        if (this.state.isHovered) {
            ctx.setLineDash([3, 5]);
        } else {
            ctx.setLineDash([0, 0]);
        }

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