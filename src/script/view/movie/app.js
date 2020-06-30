import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../component/login-popUp/login-popUp.js"
import "../../../style/movie/movie.css"

import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";
import fetchFooterHTML from "../component/footer/app.js";
import {loadNav} from "../index/renderNav.js"

document.addEventListener("DOMContentLoaded",function () {
    let url = `${BASE_URL + "movie/popular?api_key=" + API_KEY}&language=en-US&page=1`
    let selectElm = document.querySelector(".carousel")
    let tmp = ``;

    let elems = document.querySelectorAll('.sidenav');
    let instanceSideNav = M.Sidenav.init(elems)

    console.log(url)
    loadNav()
    fetchFooterHTML(); 


    const renderResult = function (data) {
        console.log(data)
        data.results.forEach(item => {

            if (item.poster_path === null) {
                return
            } else {
                tmp += `
                    <a class="carousel-item" href="${window.location.protocol + "//" +  window.location.host}/detail/detail.html?id=${item.id}&type=${item.original_title === undefined ? "tv" : "movie"}">
                        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title === undefined ? item.original_name : item.title}">
                    </a>
                `;
            }
        })
        selectElm.innerHTML = tmp;
        M.Carousel.init(selectElm,{
            numVisible:9,
            noWrap: true,
        })
    }



    DataSource.loadData(url)
    .then(renderResult)
    .catch(message => {
        console.log(message)
    })
})