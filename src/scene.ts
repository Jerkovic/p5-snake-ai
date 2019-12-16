import * as p5 from 'p5';
import { Snake } from './snake';
import { Vector } from 'p5';

const scl = 10;
const gridSize = 40;

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
    }, 1500);
  }

  public pickAppleLocation(p: p5) {
    this.apple.x = p.floor(p.random(gridSize));
    this.apple.y = p.floor(p.random(gridSize));
    console.table(this.apple);
    this.apple.mult(scl);
    console.table(this.apple);
  }

  public draw(p: p5): void {
    if (this.snake.eatApple(this.apple)) {
      this.pickAppleLocation(p);
    }
    p.stroke(255, 0, 0);
    p.fill(255, 0, 0);
    p.rect(this.apple.x, this.apple.y, scl, scl);

    this.snake.gameOver(p);
    this.snake.update(p);
    this.snake.draw(p);
  }

  public keyPressed(keyCode: number) {
    if (keyCode === 83) {
      this.snake.setDir(0, 1);
    }
    if (keyCode === 87) {
      this.snake.setDir(0, -1);
    }
    if (keyCode === 65) {
      this.snake.setDir(-1, 0);
    }
    if (keyCode === 68) {
      this.snake.setDir(1, 0);
    }
  }
}
