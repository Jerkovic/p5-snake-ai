import * as p5 from 'p5';
import { Snake } from './snake';
import { Vector } from 'p5';

const scl = 10; // pixels per cell
const gridSize = 40; // cells
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;

export class Scene {
  private snake: Snake = new Snake();
  private apple: Vector = new Vector();

  public setup(p: p5): void {
    this.pickAppleLocation(p);
    // this.randomEmitter(p);
  }
  public randomEmitter(p: p5): void {
    let me = this;
    let keyCodes = [65, 68, 83, 87]; // could be the outputs from nn
    setInterval(function() {
      me.keyPressed(p.random(keyCodes));
    }, 500);
  }

  public pickAppleLocation(p: p5) {
    this.apple.x = p.floor(p.random(gridSize));
    this.apple.y = p.floor(p.random(gridSize));
    console.table(this.apple);
    this.apple.mult(scl);
  }
  public drawGrid(p: p5) {
    for(let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        p.stroke(10);
        p.fill(50);
        p.rect(x * scl, y * scl, scl, scl);
      }
    }
  }
  public draw(p: p5): void {
    if (this.snake.eatApple(this.apple)) {
      this.pickAppleLocation(p);
    }
    this.drawGrid(p);
    p.stroke(10);
    p.fill(255, 0, 0);
    p.rect(this.apple.x, this.apple.y, scl, scl);

    this.snake.gameOver(p); // not in snake class??
    this.snake.update(p);
    this.snake.draw(p);
  }

  public keyPressed(keyCode: number) {
    // W
    if (keyCode === W_KEY) { // UP
      this.snake.setDir(0, -1);
    }
    // A
    if (keyCode === A_KEY) { //
      this.snake.setDir(-1, 0);
    }
    // S
    if (keyCode === S_KEY) {
      this.snake.setDir(0, 1);
    }
    // D
    if (keyCode === D_KEY) {
      this.snake.setDir(1, 0);
    }
  }
}
