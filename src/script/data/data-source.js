class DataSource {

    static loadData(url) {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if(responseJson != null) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject("Cannot find");
                }
            })
    }
}

export default DataSource