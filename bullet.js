let mousex = 0
let mousey = 0
document.addEventListener("mousemove", (e) => {
    mousex = e.clientX - (window.innerWidth/2)
    mousey = e.clientY - (window.innerHeight/2)
})
export function summonBullet(text) {
    const bullet = document.createElement("div")
    bullet.innerHTML = text
    bullet.className = "bullet"
    bullet.setAttribute("data-xvelocity", mousex/200)
    bullet.setAttribute("data-yvelocity", mousey/200)
    bullet.setAttribute("data-x", 0)
    bullet.setAttribute("data-y", 0)
    document.getElementById("bullets").appendChild(bullet)
}