import Position from "./position.ts";
import Dimension from "./dimension.ts";

abstract class Vector2d {
    constructor(public dimension: Dimension, public position: Position) {
    }

    public abstract init(): void ;

    public abstract draw(ctx: CanvasRenderingContext2D): void;
}

export default Vector2d;