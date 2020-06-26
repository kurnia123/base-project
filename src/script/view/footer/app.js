
export default function fetchFooterHTML() {
    let selectElement = document.querySelector(".page-footer");

    fetch("../component/footer.html")
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