import './style.css';
import App from "./app.ts";

const app: HTMLDivElement | null = document.querySelector<HTMLDivElement>('#app');

if (!app) {
    throw new Error('Root element not found');
}

const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');

if (!canvas) {
    throw new Error('Canvas element not found');
}

new App(canvas);