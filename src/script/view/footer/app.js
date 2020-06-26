
export default function fetchFooterHTML() {
    let selectElement = document.querySelector(".page-footer");

    fetch("../footer/footer.html")
    .then(function (value) {
        return value.text();
    })
    .then(result => {
        selectElement.innerHTML = result;
    })
    .catch(message => {
        selectElement.innerHTML = `<b>${message}</b>`
    })
}