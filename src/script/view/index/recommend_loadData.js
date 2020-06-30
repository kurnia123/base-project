import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

function loadDataRecommend(path="tv/2/recommendations?api_key=") {
    let url = `${BASE_URL + path + API_KEY}&language=en-US&page=1`

    DataSource.loadData(url)
    .then(renderResult)
    .catch(fallbackResult)
}

const renderResult = results => {
    addItemTVRecommend(results.results)
}

const fallbackResult = results => {
    console.log(results)
}


const addItemTVRecommend = function (data) {  
    let selectElement = document.querySelector(".recommendation__content");
    let tmp = ``;

    data.forEach(item => {

        if (item.poster_path === null) {
            return;
        } else {
            tmp += 
            `
            <div class="itemMovie">
                <a href="./detail/detail.html?id=${item.id}&type=${item.original_title === undefined ? "tv" : "movie"}">
                    <img class="itemMovie__img" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
                </a>
                <p class="itemMovie__title center-align">${item.title === undefined ? item.original_name : item.title}</p>
            </div>
            `
        }

    })
    selectElement.innerHTML = tmp;

}

export {loadDataRecommend}