import DataSource from "../../data/data-source.js";
import {API_KEY,BASE_URL} from "../../key/api-key.js";

let renderContentPage = (result,type) => {
    // set synopsis
    let synopsis = document.querySelector(".content__synopsis")
    synopsis.innerText = result.overview;

    getVideoMovie(result,type);
    getReviews(result,type);

}

let getVideoMovie = (result,type) => {
    let url = `${BASE_URL + type}/${result.id}/videos?api_key=${API_KEY}&language=en-US`;
    console.log("video url : " + url);
    DataSource.loadData(url)
    .then(renderResultVideo)
    .catch(fallbackResult)
}

let getReviews = (result,type) => {
    let url = `${BASE_URL + type}/${result.id}/reviews?api_key=${API_KEY}&language=en-US`;
    DataSource.loadData(url)
    .then(renderResultReview)
    .catch(message => {
        console.log(message)
    })
}

const renderResultReview = result => {
    let selectElmReview = document.querySelector(".reviews")

    if (result.results.length === 0) {
        selectElmReview.innerHTML = `
            <h4 class="content">REVIEW</h4>
            <p>From : Null</p>
            <p>Null</p>
        `;
    } else {
        selectElmReview.innerHTML = `
            <h4 class="content">REVIEW</h4>
            <p>From : ${result.results[0].author}</p>
            <p>${result.results[0].content}</p>
        `;
    }

}


const renderResultVideo = result => {
    let addVideo = document.querySelector(".trailer-video")
    addVideo.innerHTML = `
        <h4 class="content">TRAILER</h4>
        <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/${result.results[0].key}" frameborder="0"allowfullscreen></iframe>
    `;
}

const fallbackResult = results => {
    console.log(results)
}

export default renderContentPage