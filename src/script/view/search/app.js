import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../../../style/search/index.css";

import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

document.addEventListener("DOMContentLoaded",function () {  

    let url_string = window.location.href
    let url_object = new URL(url_string)
    let keyword = url_object.searchParams.get("keyword");
    let url_combain = `${BASE_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;

    let select_element = document.querySelector(".content");
    let tmp = "";

    const renderResult = results => {
        console.log(results)
        results.results.forEach(element => {
            tmp += `
            <div class="row">
                <div class="col">
                    <a href="../detail/detail.html?id=${element.id}&type=${element.original_title === undefined ? "tv" : "movie"}">
                        <div class="card">
                            <div class="card-image">
                                <img src="https://image.tmdb.org/t/p/w300${element.backdrop_path}">
                                <span class="card-title">${element.original_title}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite_border</i></a>
                            </div>
                            <div class="card-content">
                                <p>${element.overview.slice(0,50)}...</p>
                                <a href="../detail/detail.html?id=${element.id}&type=${element.original_title === undefined ? "tv" : "movie"}"><p>Read more..</p></a>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            `
        });

        select_element.innerHTML = tmp
    }
    
    const fallbackResult = message => {
        console.log(message)
    }

    DataSource.loadData(url_combain)
    .then(renderResult)
    .catch(fallbackResult)

})