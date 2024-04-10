import { scaleFactor } from "./constants";
import { x } from "./kaboomCtx";
import { displayDialogue } from "./utils";

x.loadSprite("spritesheet", "./spritesheet.png",{
    sliceX: 39,
    sliceY: 31,
    anims: {
       "idle-down": 936,
       "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
       "idle-side": 975,
       "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
       "idle-up": 1014,
        "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    }, 
});

x.loadAseprite("map", "./map.png");

x.setBackground(x.Color.fromHex("#311047"));

x.scene("main", async () => {
   const mapData = await (await fetch("./map.json")).json()
   const layers = mapData.layers;

   const map = x.add([x.sprite("map"), x.pos(0), x.scale(scaleFactor)])

   const player = x.make([
    x.sprite("spritesheet", {anim:"idle-down" }), 
    x.area({
      shape: new x.Rect(x.vec2(0, 3), 10, 10),
    }),
    x.body(),
    x.anchor("center"),
    x.pos(),
    x.scale(scaleFactor),
    {
        speed: 250,
        direction: "down",
        isInDialogue: false,    
    },
    "player", 
]);

 for (const layer of layers){
    if (layer.name == "boundaries") {
        for (const boundary of layer.objects) {
            map.add([
               x.area({
                shape: new x.Rect(x.vec2(0), boundary.width, boundary.height),
               }),
               x.body({ isStatic: true }),
               x.pos(boundary.x, boundary.y),
               boundary.name,
            ]);

            if (boundary.name) {
                player.onCollide(boundary.name, () => {
                    player.isInDialogue = true;
                    displayDialogue("TODO", () => (player.isInDialogue = false ));
                });
            }
        }
        continue;
    }
    if (layer.name === "spawnpoints") {
        for (const entity of layer.objects) {
            if (entity.name === "player") {
              player.pos = x.vec2(
                (map.pos.x + entity.x) * scaleFactor,
                (map.pos.y + entity.y) * scaleFactor
              );
              x.add(player);
              continue;
            }
        }
    }
 }

 x.onUpdate(() => {
    x.camPos(player.pos.x, player.pos.y + 100);
 });
});

k.go("main");
