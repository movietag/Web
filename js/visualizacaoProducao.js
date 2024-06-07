
// Evento de click dos icones
const icon = document.querySelector("#mark");

icon.addEventListener("click", (ev) => {
    const classes = ["bx-bookmark", "bxs-bookmark"];
    if (icon.classList.contains(classes[0])){
        icon.classList.remove(classes[0]);
        icon.classList.add(classes[1]);
    } else {
        icon.classList.remove(classes[1]);
        icon.classList.add(classes[0]);
    }
});