import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../component/login-popUp/login-popUp.js";
import "../../../style/genre/genre.css";

import { loadGenre,loadItemMovie } from "./loadData.js"
import fetchFooterHTML from "../component/footer/app.js";
import {loadNav} from "../index/renderNav.js"

document.addEventListener("DOMContentLoaded", function () {
    
    let elems = document.querySelectorAll('.sidenav');
    let instanceSideNav = M.Sidenav.init(elems)

    let elemsDropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elemsDropdown)

    loadNav()
    fetchFooterHTML(); 

    loadGenre();
    document.querySelectorAll(".btn-type-watch").forEach(elms => {
        elms.addEventListener("click",() => {
            document.querySelector(".watching-type").innerText = elms.textContent.toUpperCase();
        });

    })
    loadItemMovie();

})