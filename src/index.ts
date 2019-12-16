import { Scene } from './scene';
import * as p5 from 'p5';
// @ts-ignore
// import * as tf from '@tensorflow/tfjs';

const sketch = (p: p5): void => {
  const scene = new Scene();

  p.preload = (): void => {};

  p.setup = (): void => {
    p.createCanvas(400, 400); // 40x40 board
    p.frameRate(10);
    scene.setup(p);
  };
  p.keyPressed = (): void => {
    scene.keyPressed(p.keyCode);
  };
  p.draw = (): void => {
    p.background(0);
    scene.draw(p);
  };
};

new p5(sketch);
