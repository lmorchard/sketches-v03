import BaseSketch from "../../lib/BaseSketch.js";
import { Graphics } from "pixi.js";

class VectorAvatar extends BaseSketch {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  async initApp() {
    await super.initApp();

    this.stage.addChild(
      new Graphics().moveTo(-100, -100).lineTo(100, 100).stroke({
        color: 0x6666ff,
        width: 2,
      })
    );

    this.stage.addChild(
      new Graphics().moveTo(100, -100).lineTo(-100, 100).stroke({
        color: 0xff6666,
        width: 2,
      })
    );
  }

  render() {
    super.render();
  }
}

customElements.define("vector-avatar", VectorAvatar);
