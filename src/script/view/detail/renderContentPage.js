import DataSource from "../../data/data-source.js";
import {API_KEY,BASE_URL} from "../../key/api-key.js";

let renderContentPage = (result,type) => {
    // set synopsis
    let synopsis = document.querySelector(".content__synopsis")
    synopsis.innerText = result.overview;

    getVideoMovie(result,type)

}

let getVideoMovie = (result,type) => {
    let url = `${BASE_URL + type}/${result.id}/videos?api_key=${API_KEY}&language=en-US`;
    console.log("video url : " + url);
    DataSource.loadData(url)
    .then(renderResult)
    .catch(fallbackResult)
}

const renderResult = result => {
    let addVideo = document.querySelector(".trailer-video")
    addVideo.innerHTML = `
        <h4 class="content">TRAILER</h4>
        <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0"allowfullscreen></iframe>

    `
}

const fallbackResult = results => {
    console.log(results)
}

export default renderContentPage