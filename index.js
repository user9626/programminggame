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
    if (document.activeElement.tagName === "INPUT") return;
    if (event.key in keys) keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    if (document.activeElement.tagName === "INPUT") return;
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

// Terminal
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
    terminal_text("This game is going to teach you a few CODING basics and hopefully allow you to give it a try.", 1000);
    await wait(4000)


    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text("This is Python! You've probably seen it before. First, write < "+'print("Hello World!") >', 1000);
    let helloworldpuzzle = await runPuzzle("", 'print("hello world!")'); // idk why but you cant declare the puzzle without await then later await the variable or else the promise values are weird
    while (!helloworldpuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
        await terminal_text("That's not it! Just write "+'print("Hello World!")', 1000);
        helloworldpuzzle = await runPuzzle(helloworldpuzzle.raw, 'print("hello world!")')
    }

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text("Great job! If you ran that script, it would say:\nHello World!", 1000);
    await wait(3500)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("That's because you specified the 'print' function, which prints an output! A function is basically just an action, like a verb in english!", 1000);
    await wait(7000)

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 1000);
    terminal_text("You can use a function by saying its name, like 'print', then using brackets '()' with stuff inside them if you want to tell a function something specific, like 'Hello World'!", 1000);
    await wait(7000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text(`Now, try using this new *special* function called shoot! (try < shoot("Hello World!") > )`, 1000);
    let shootpuzzle = await runPuzzle("", 'shoot("Hello World!")');
    while (!shootpuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
        await terminal_text("That's not it! Just write "+'shoot("Hello World")', 1000);
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

    setTimeout(terminal_buddy("(^ o ^)", "(^ _ ^)"), 2000);
    terminal_text("To do this, we can create a loop! Specifically a for loop! To do this in Python, you can do the following:\n\nfor i in range(x):\n   shoot()\n\nWhere x can be replaced with how many times you want to repeat.", 3000);
    await wait(10000)

    setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
    terminal_text(`You try! Create a *for loop* that runs the shoot("Hi") function 10 times! Tip: You can press tab to create an indent!`, 1000);
    let forlooppuzzle = await runPuzzle("", 'for i in range(10):\n    shoot("Hi")');
    while (!forlooppuzzle.success) {
        setTimeout(terminal_buddy("(⋅ o ⋅)", "(⋅ _ ⋅)"), 1000);
        await terminal_text("This one's more difficult! Remember, you can write a for loop by doing:\n\nfor i in range(x):\n    # shoot function that says 'hi'\n\n...and remember to shoot exactly 10 times!", 1000);
        forlooppuzzle = await runPuzzle(forlooppuzzle.raw, 'for i in range(10):\n    shoot("Hi")')
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
    terminal_text("Thanks for playing! I hope you learned a bit about the fundementals of coding, or even just what a function is; so thanks!", 1000);
    await wait(8000)

    window.location.replace("./onboarding.html")
})();