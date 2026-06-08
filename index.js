// IMPORTS
import {terminal_buddy, terminal_text} from "./terminal.js"

// CHARACTER MOVEMENT
let lastMs = 0
const player = {x: 0, y: 0, speed: 200}
const mapElements = document.getElementById("mapElements").children
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
}
document.addEventListener('keydown', (event) => {
    if (document.activeElement.isContentEditable) return;
    if (event.key in keys) keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    if (document.activeElement.isContentEditable) return;
    if (event.key in keys) keys[event.key] = false;
});
function setCharacterPosition() {
    for (let i=0; i<mapElements.length; i++) {
        mapElements[i].style.transform = `translateX(${player.x}px) translateY(${[player.y]}px)`
    }
}
function characterMovementLoop(timestampMs) {
    const deltaSeconds = (timestampMs - lastMs)/1000
    lastMs = timestampMs
    const movement = deltaSeconds * player.speed

    if (deltaSeconds < 0.1) {
        if (keys.w) {
            player.y += movement
        } else if (keys.s) {
            player.y -= movement
        }
        if (keys.a) {
            player.x += movement
        } else if (keys.d) {
            player.x -= movement
        }
    }

    setCharacterPosition()

    requestAnimationFrame( characterMovementLoop )
}

characterMovementLoop()

// Terminal
const cool = terminal_buddy("(・o・)", "(・_・)");
setTimeout(cool, 1000);
terminal_text("Hello this is a great great text", 1000)
setTimeout(()=> {
    document.getElementById("codeterminal").classList.add("show")
}, 1000)