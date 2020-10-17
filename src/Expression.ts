/*
  A wrapper class that represents an expression
*/

export class Expression {
  private leftParen: number;
  private rightParen: number;
  private body: string[];

  constructor() {
    this.leftParen = 0;
    this.rightParen = 0;
    this.body = [];
    this.clear();
  }

  public clear(): void {
    this.leftParen = 0;
    this.rightParen = 0;
    this.body = [];
  }

  public length(): number {
    return this.body.length;
  }

  public push(token: string): void {
    this.body.push(token);

    if (token === "(") {
      this.leftParen++;
    } else if (token === ")") {
      this.rightParen++;
    }
  }

  public pop(): string | undefined {
    if (this.body.length === 0) {
      return "";
    }

    const token: string | undefined = this.body.pop();

    if (token === "(") {
      this.leftParen--;
    } else if (token === ")") {
      this.rightParen--;
    }

    return token;
  }

  public last(): string {
    const last = this.body[this.body.length - 1];
    return last === undefined ? "" : last;
  }

  public matchesParen(): boolean {
    return this.leftParen === this.rightParen;
  }

  public endsWith(target: string): boolean {
    return target.indexOf(this.last().trim()) !== -1;
  }

  public toString(): string {
    return this.body.join('');
  }
}
