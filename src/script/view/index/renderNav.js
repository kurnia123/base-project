import loadPage from "./loadPageFromNav.js";

function loadNav() {
    fetch("../nav.html")
        .then(function respons(value) {
            return value.text();
        })
        .then(result => {
            document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                elm.innerHTML = result
            })

            document.querySelectorAll(".topnav a, .topnavright a, .sidenav a").forEach(elm => {
                elm.addEventListener("click", function (event) {
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    // page = event.target.getAttribute("href").substr(1);
                    // loadPage(page);
                })
            })

        })
        .catch(reject => {
            document.querySelectorAll(".topnav, .sidenav").forEach(elem => {
                elem.innerHTML = "<h2>file tidak ada</h2>"
            })
        })
}

export default loadNav;