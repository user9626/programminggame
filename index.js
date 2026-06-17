// IMPORTS
import { terminal_buddy, terminal_text } from "./terminal.js"
import { runPuzzle } from "./codeterminal.js"
import { summonBullet } from "./bullet.js"

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
    if (document.activeElement.tagName === "TEXTAREA") return;
    if (event.key in keys) keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    if (document.activeElement.tagName === "TEXTAREA") return;
    if (event.key in keys) keys[event.key] = false;
});
function setCharacterPosition() {
    for (let i=0; i<mapElements.length; i++) {
        mapElements[i].style.transform = `translateX(${player.x}px) translateY(${[player.y]}px)`
    }
    document.body.style.setProperty("--backgroundx", String(player.x)+"px")
    document.body.style.setProperty("--backgroundy", String(player.y)+"px")
}
function stepBullets() {
    const bullets = document.getElementsByClassName("bullet")
    for (let i=0; i<bullets.length; i++) {
        const xvelocity = bullets[i].getAttribute("data-xvelocity")
        const yvelocity = bullets[i].getAttribute("data-yvelocity")
        const x = bullets[i].getAttribute("data-x")
        const y = bullets[i].getAttribute("data-y")
        bullets[i].setAttribute("data-x", String(parseFloat(x)+parseFloat(xvelocity)))
        bullets[i].setAttribute("data-y", String(parseFloat(y)+parseFloat(yvelocity)))
        bullets[i].style.transform = `translate(calc(50vw + ${bullets[i].getAttribute("data-x")}px), calc(50vh + ${bullets[i].getAttribute("data-y")}px))`
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

    stepBullets()

    requestAnimationFrame( characterMovementLoop )
}

characterMovementLoop();

// GAME
(async () => {
    async function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    document.getElementById("terminal").classList.add("full")

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("Oh hey there! Welcome to CONSOLE!", 1000);
    await wait(3000)

    document.getElementById("terminal").classList.remove("full")
    
    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("You can use WASD to move your character!", 1000);
    await wait(3000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("This game is going to teach you a few CODING basics and hopefully allow you to give it a try.", 1000);
    await wait(4000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 2000);
    terminal_text("Personally, the first programming language I ever learned was Python, one of the most popular programming languages in the world. It was created all the way back in 1991.", 2000);
    await wait(9000)

    setTimeout(terminal_buddy("(★ o ★)", "(★ _ ★)"), 2000);
    terminal_text("I enjoy coding because it's a space where you can create whatever you want, like any other art form, but in the DIGITAL WORLD!", 2000);
    await wait(9000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text(`To start, let's learn some Python! You've probably seen it before. First, write: \n\nprint("Hello World!")`, 1000);
    let helloworldpuzzle = await runPuzzle("", 'print("hello world!")'); // idk why but you cant declare the puzzle without await then later await the variable or else the promise values are weird
    while (!helloworldpuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
        await terminal_text(`That's not it! Just write:\n\nprint("Hello World!")\n\nDon't forget the exclamation mark!`, 1000);
        helloworldpuzzle = await runPuzzle(helloworldpuzzle.raw, 'print("hello world!")')
    }

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text("Great job! If you ran that script, it would say:\nHello World!", 1000);
    await wait(3500)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("That's because you specified the 'print' function, which prints an output! A function is basically just an action, like a verb in english!", 1000);
    await wait(7000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1500);
    terminal_text("You can use a function by saying its name, like 'print', then using brackets '()' with stuff inside them if you want to tell a function something specific, like 'Hello World'!", 1500);
    await wait(11000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text(`Now, try using this new *special* function called shoot! Try:\n\nshoot("Hello World!")`, 1000);
    let shootpuzzle = await runPuzzle("", 'shoot("Hello World!")');
    while (!shootpuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
        await terminal_text("That's not it! Just write:\n\n"+'shoot("Hello World")', 1000);
        shootpuzzle = await runPuzzle(shootpuzzle.raw, 'shoot("Hello World!")')
    }

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("Neat! Now every few seconds you should be able to shoot a bullet!", 1000);
    const bulletspawn1 = setInterval(() => {
        summonBullet("Hello World!")
    }, 3000)
    await wait(3500)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("That's not all though, we can also shoot multiple bullets at once!", 1000);
    await wait(3500)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 3000);
    terminal_text("To do this, we can create a loop! In programming, a loop allows you to repeat a line of code multiple times!", 3000);
    await wait(8000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 4500);
    terminal_text("To do this in Python, you can do the following:\n\nfor i in range(3):\n   shoot()\n\nIn this code, 'for i in range(3):' means to repeat the indented code 3 times, in this case 'shoot()'", 4500);
    await wait(18000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text(`You try! Create a loop that runs 'shoot("Hi")' 10 times!\nIf you need a hint, write:\n\nfor i in range(3):\n    shoot("Hi")\n\nAll you need to do is make sure that instead of repeating shoot 3 times, it repeats shoot 10 times!\n\nTip: Press Tab to create an indent, and MAKE SURE you put an indent before shoot("Hi")!`, 1000);
    let forlooppuzzle = await runPuzzle("", 'for i in range(3):\n    shoot("Hi")');
    while (!forlooppuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 2000);
        await terminal_text(`This one's more difficult! If you need a hint, write:\n\nfor i in range(3):\n    shoot("Hi")\n\nThis code repeats the indented code 'shoot("Hi")' 3 times! Your goal is to repeat the code 10 times. Try modifing the '3' in 'for i in range(3):'\n\nTip: CREATE AN INDENT by pressing tab before shoot("Hi") and DON'T FORGET the colon after 'for i in range()!`, 2000);
        forlooppuzzle = await runPuzzle(forlooppuzzle.raw, 'for i in range(3):\n    shoot("Hi")')
    }
    clearInterval(bulletspawn1)
    const bulletspawn2 = setInterval(async () => {
        for (let i=0; i<10; i++) {
            summonBullet("Hi")
            await wait(100)
        }
    }, 3000)
    
    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("Congrats! That's spot on.", 1000);
    await wait(3000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("Now you know some programming basics, and hopefully you learned something new!", 1000);
    await wait(4000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("Thank you for playing!", 1000);
    await wait(16000)

    window.location.replace("./onboarding.html")
})();