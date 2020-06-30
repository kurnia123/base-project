function navRoute(route) {
    console.log("aku di klik : " + route)
    let _baseUrl = window.location.host;
    let _protocol = window.location.protocol;

    if (route === "index") {
        console.log("cek BaseURL : " + _baseUrl)
        window.location.href = `${_protocol}//${_baseUrl}/${route}.html`;
    } else if (route === "login") {
        return;
    } else {
        window.location.href = `${_protocol}//${_baseUrl}/${route}/${route}.html`;      
    }
}

export default navRoute;