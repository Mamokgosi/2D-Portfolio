import kaboom from "kaboom";

export const x = kaboom({
   global: false,
   touchToMouse: true, 
   canvas: document.getElementById("game"),
});