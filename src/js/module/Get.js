export default class Get {

    /**
     * 
     * @param url
     * @returns {Promise}
     */
    constructor(url) {
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
}