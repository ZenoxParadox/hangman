export class SecretWords extends Array<string> {
  constructor() {
    super();
    super.push("3dhubs", "marvin", "print", "filament", "order", "layer");
  }

  getRandom(): string {
    return this[Math.floor(Math.random() * this.length)];
  }
}
