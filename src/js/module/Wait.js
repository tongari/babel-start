export default class Wait {

    /**
     *
     * @param millisecond
     * @returns {Promise}
     */
    constructor(millisecond = 1000) {
        return new Promise(resolve => {

            setTimeout(() => {
                console.log(`${millisecond}ミリ秒待機しました。`);
                resolve();
            }, millisecond);
        });
    }
}