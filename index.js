import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cell from "./Cell/Cell.js";
import Block from "./Block/Block.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cell: new Cell({
    x: -104,
    y: -180,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Block: new Block({
    x: 0,
    y: 148.5,
    direction: 90,
    costumeNumber: 7,
    size: 100,
    visible: false,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
