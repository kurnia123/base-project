import {API_KEY,BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";


export function loadGenre() {
    const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`

    DataSource.loadData(url)
    .then(renderResultGenre)
    .catch(message => {
        console.log("Error : " + message)
    })
}

function renderResultGenre(result) {
    let elm = document.querySelector("#dropdown2");
    let itemGenre = ""

    for (let index = 0; index < 6; index++) {
        itemGenre += `
            <li><a class="btn-genre" href="#!">${result.genres[index].name}</a></li>
        `;
    }
    elm.innerHTML = itemGenre;

    document.querySelectorAll(".btn-genre").forEach(elms => {
        elms.addEventListener("click",() => {
            document.querySelector(".watching-genre").innerText = elms.textContent.toUpperCase();
            eventClick();
        })
    })
}


export function loadItemMovie() {
    document.querySelectorAll(".btn-type-watch").forEach(elm => {
        elm.addEventListener("click",eventClick)
    })
}

function eventClick() {
    const type = document.querySelector(".watching-type").textContent;
    let url = `${BASE_URL}${type.toLowerCase() === "tv show" ? "tv" : "movie"}/popular?api_key=${API_KEY}&language=en-US`

    DataSource.loadData(url)
    .then(renderResult)
    .catch(message => {
        console.log(`error : ${message}`);
    })

    document.querySelector(".title-item").innerText = type === "TV SHOW" ? "TV Show" : "Movie"
}

function renderResult(data) {
    let tmp = ''
    let selectElm = document.querySelector(".wrap__listItem");
    
    getDataGenre(val => {
        data.results.forEach(item => {
            item.genre_ids.forEach(genre => {
                if (genre === val) {
                    tmp += `
                    <div class="itemMovie">
                        <a href="${window.location.origin}/detail/detail.html?id=${item.id}&type=${item.original_title === undefined ? "tv" : "movie"}">
                            <img class="itemMovie__img" src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
                        </a>
                        <p class="itemMovie__title center-align">${item.original_name === undefined ? item.original_title : item.original_name}</p>
                    </div>
                    `;
                }
            })
            
    
        })
        selectElm.innerHTML = tmp;
    });
}

function getDataGenre(callback) {
    let genre = document.querySelector(".watching-genre").textContent.toLowerCase();

    const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
    
    DataSource.loadData(url)
    .then( (res) => {
        res.genres.forEach(item => {
            if (item.name.toLowerCase() === genre) {
                callback(item.id)
            } else {

            }
        })
    })
    .catch(message => {
        console.log(`${message}`)
    })
}