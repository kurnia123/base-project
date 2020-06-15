import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import '../../../style/index/index.css';

document.addEventListener("DOMContentLoaded",function () {  
    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems)


    loadNav();

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

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })

            })
            .catch(reject => {
                document.querySelectorAll(".topnav, .sidenav").forEach(elem => {
                    elem.innerHTML = "<h2>file tidak ada</h2>"
                })
            })
    }

    var page = window.location.hash.substr(1);
    if(page === '') page = "home"
    console.log(page)
    loadPage(page);

    function loadPage(page) {
        
        switch (page) {
            case "home":
                
                break;
            
            case "save":
                
                break;
        
            default:
                break;
        }
    }
})