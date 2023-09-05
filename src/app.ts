class App {
    private readonly ctx: CanvasRenderingContext2D;

    constructor(private readonly canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not found');
        }

        this.ctx = ctx;
        
        this.run();
    }

    public run(): void {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, 100, 100);
    }
}

export default App;