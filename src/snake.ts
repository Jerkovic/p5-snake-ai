import * as p5 from 'p5';
import { Vector } from 'p5';

const scl = 10;

export class Snake {
  public head: Vector;
  public tail: Vector[] = [];
  public dir: Vector;
  public eatenApples: number = 0;

  public constructor() {
    this.head = new Vector();
    this.dir = new Vector();
    this.reset();
  }
  public gameOver(p: p5) {
    if (
      this.head.x < 0 ||
      this.head.x > 400 ||
      this.head.y < 0 ||
      this.head.y > 400
    ) {
      this.reset();
    }
    for (let i = 0; i < this.tail.length; i++) {
      const dist = p.dist(
        this.head.x,
        this.head.y,
        this.tail[i].x,
        this.tail[i].y,
      );
      if (dist < 1) {
        console.log('game over');
        this.reset();
      }
    }
  }
  public reset(): void {
    this.setDir(1, 0);
    this.head.x = 3;
    this.head.y = 3;
    this.head.mult(scl);
    this.eatenApples = 0;
    this.tail = [];
  }
  public eatApple(apple: Vector): boolean {
    if (apple.dist(this.head) < 1) {
      this.eatenApples++;
      return true;
    }
    return false;
  }

  public draw(p: p5): void {
    p.stroke(0);
    p.fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    p.rect(this.head.x, this.head.y, scl, scl);
    p.text(this.eatenApples, 200, 50);
  }

  public setDir(x: number, y: number): void {
    if (this.dir.y > 0 && y < 0 && this.eatenApples) return;
    if (this.dir.y < 0 && y > 0 && this.eatenApples) return;
    if (this.dir.x > 0 && x < 0 && this.eatenApples) return;
    if (this.dir.x < 0 && x > 0 && this.eatenApples) return;
    this.dir.x = x;
    this.dir.y = y;
  }

  public update(p: p5): void {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.eatenApples >= 1) {
      this.tail[this.eatenApples - 1] = p.createVector(
        this.head.x,
        this.head.y,
      );
    }
    this.head.x += this.dir.x * scl;
    this.head.y += this.dir.y * scl;
  }
}
