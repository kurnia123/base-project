class DataSource {

    static loadData(url) {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                return Promise.resolve(responseJson);
            })
    }
}

export default DataSource