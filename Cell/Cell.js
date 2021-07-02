import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cell extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("empty", "./Cell/costumes/empty.png", { x: 22, y: 22 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "take cell" },
        this.whenIReceiveTakeCell
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "remove this row" },
        this.whenIReceiveRemoveThisRow
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveTakeCell() {
    if (this.touching(Color.rgb(230, 230, 230))) {
      this.costume = this.sprites["Block"].costume.name;
      this.broadcast("Change Score BOIS");
    }
  }

  *whenIReceiveRemoveThisRow() {
    if (this.touching(this.sprites[undefined].andClones())) {
      this.y = this.stage.vars.yTop;
      this.costume = "empty";
    } else {
      if (this.y > this.sprites[undefined].y) {
        this.y += 0 - this.stage.vars.step;
      }
    }
  }

  *startAsClone() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.step = 23;
    this.stage.vars.yTop = 160;
    this.goto(-104, this.stage.vars.yTop);
    this.costume = "empty";
    this.visible = false;
    yield* this.createGrid();
    yield* this.wait(0.75);
    this.stage.vars.gameOn = 1;
  }

  *whengreaterthan() {
    this.visible = false;
  }

  *createGrid() {
    for (let i = 0; i < 15; i++) {
      for (let i = 0; i < 10; i++) {
        this.createClone();
        this.x += this.stage.vars.step;
      }
      this.x = -104;
      this.y += 0 - this.stage.vars.step;
    }
  }
}
