const codeterminal = document.getElementById("codeterminal")
const codeterminal_code = document.getElementById("codeterminal-code")
const codeterminal_run = document.getElementById("codeterminal-run")

codeterminal_code.addEventListener("keydown", (e) => {
    if (e.key == "Tab") {
        e.preventDefault();
        const start = codeterminal_code.selectionStart
        const end = codeterminal_code.selectionEnd
        const replace = "    "
        codeterminal_code.value = codeterminal_code.value.substring(0, start) + replace + codeterminal_code.value.substring(end);
        codeterminal_code.selectionStart = start + replace.length
        codeterminal_code.selectionEnd = codeterminal_code.selectionStart
        return
    }
})

export function runPuzzle(template, answer) {
    codeterminal.classList.add("show");
    codeterminal_code.value = template
    return new Promise((resolve) => {
        codeterminal_run.addEventListener("click", () => {
            let proposed = codeterminal_code.value
            proposed = proposed.trim()
            proposed = proposed.replace(/#[\s\S]+?\n/, "\n")
            proposed = proposed.replace("'", '"')
            proposed = proposed.trim()
            resolve()
        })
    })
}