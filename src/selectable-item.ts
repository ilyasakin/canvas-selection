import Vector2d from "./vector2d.ts";
import Position from "./position.ts";
import Dimension from "./dimension.ts";

class SelectableItem extends Vector2d {
    constructor(dimension: Dimension, position: Position) {
        super(dimension, position);
    }
    
    public init(): void {}
    
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        
        ctx.setLineDash([0, 0]);
        
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