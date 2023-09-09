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

        if (this.state.isHovered) {
            ctx.beginPath();
            ctx.strokeStyle = 'cyan';
            ctx.setLineDash([5, 3])
            ctx.rect(this.position.x - 8, this.position.y - 8, this.dimension.width + 16, this.dimension.height + 16);
            ctx.stroke();
            ctx.closePath();
        }
        
        if (this.state.isSelected) {
            ctx.beginPath();
            ctx.strokeStyle = 'cyan';
            ctx.setLineDash([0, 0])
            ctx.rect(this.position.x - 8, this.position.y - 8, this.dimension.width + 16, this.dimension.height + 16);
            ctx.stroke();
            ctx.closePath();
        }

        ctx.beginPath();
        ctx.strokeStyle = 'black';
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