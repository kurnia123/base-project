import "../../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../../../style/detail/detail.css";
import "../../view/component/login-popUp/login-popUp.js";

import fetchFooterHTML from "../component/footer/app.js";
import {loadNav} from "../index/renderNav.js";
import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";
import renderContentPage from "./renderContentPage.js";

document.addEventListener("DOMContentLoaded",function () {  

    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems)

    loadNav();
    fetchFooterHTML();

    let url_string = window.location.href;
    let url_object = new URL(url_string);
    let id = url_object.searchParams.get("id");
    let type = url_object.searchParams.get("type");

    
    let url_combain = `${BASE_URL + type}/${id}?api_key=${API_KEY}&language=en-US`;
    console.log(url_combain)
    

    let renderBannerPage = result => {
        // set image movie
        let banner = document.querySelector(".banner");
        banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${result.backdrop_path})`
        
        // set title movie
        let titleMovie = document.querySelector(".title");
        titleMovie.innerText = result.original_title === undefined ? result.original_name : result.original_title
        
        // set name studio producer
        let studioProducer = document.querySelector(".studio-producer");
        let tmp = ''
        result.production_companies.forEach(producer => {
            tmp += `${producer.name}, `
        })
        studioProducer.innerText = tmp;

    }
    
    const renderResult = results => {
        console.log(results)
        renderBannerPage(results);
        renderContentPage(results,type);
    }

    const fallbackResult = results => {
        console.log(results)
    }


    DataSource.loadData(url_combain)
    .then(renderResult)
    .catch(fallbackResult)
    
    
})