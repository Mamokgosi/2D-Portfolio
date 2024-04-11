import kaboom from "kaboom";
import { scaleFactor } from "./constants";

export const p = kaboom({
   global: false,
   touchToMouse: true, 
   canvas: document.getElementById("game"),
   debug: false,
});