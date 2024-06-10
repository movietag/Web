
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

API

function queryObj() { // Pega os valores do link HTML
    var result = {}, keyValuePairs = location.search.slice(1).split("&");
    keyValuePairs.forEach(function(keyValuePair) {
        keyValuePair = keyValuePair.split('=');
        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
    });
    return result;
}
var myParam = queryObj();
console.log(myParam);