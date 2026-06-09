const terminal_buddy_node = document.getElementById("terminal-buddy")
const terminal_text_node = document.getElementById("terminal-text")
export function terminal_buddy(text1, text2) {
    if (text1 === undefined) {
        return terminal_buddy_node.textContent
    }
    if (text2 === undefined) {
        terminal_buddy_node.textContent = text1
        return
    }
    let talking = true;
    (async () => {
        while (talking) {
            terminal_buddy_node.textContent = text1
            if (!talking) break
            await new Promise(resolve => setTimeout(resolve, 100))
            terminal_buddy_node.textContent = text2
            if (!talking) break
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    })()
    return () => {
        talking = false;
    }
}

export async function terminal_text(text, timeMs) {
    if (text === undefined) {
        return terminal_text_node.textContent
    }
    const timePerChar = Math.floor((timeMs / text.length))
    for (let i = 0; i < text.length; i++) {
        terminal_text_node.textContent = text.slice(0, i+1)
        await new Promise(resolve => setTimeout(resolve, timePerChar))
    }
    terminal_text_node.textContent = text
}