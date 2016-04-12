let _instance = null;
let _isInit = false;

export default class ApiConnector{

    /**
     *
     * @returns {*}
     */
    constructor() {

        if ( !_isInit || _instance ) throw new Error('Cannot construct ApiConnector');
        if ( !_instance ) _instance = this;
        return _instance;
    }

    /**
     *
     * @param url
     * @returns {Promise}
     */
    fetch(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                } };
            xhr.onerror = () => {
                reject(new Error(xhr.statusText));
            };
            xhr.send(null);
        });
    }



    /**
     *
     * @returns {*}
     */
    static get instance() {

        if( !_isInit ) _isInit = true;
        if ( !_instance )_instance = new ApiConnector();
        return _instance;
    }

}