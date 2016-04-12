export default class Chain {

    /**
     *
     * @private
     */
    _onEndCallBack = function(){};

    /**
     *
     * @private
     */
    _generator = function* (){};

    /**
     *
     * @param generatorFn
     */
    constructor(generatorFn) {
        this._generator = generatorFn;
    }

    /**
     *
     * @returns {Promise}
     */
    execute(){

        const generator = this._generator.apply(this, arguments);
        return new Promise( (resolve, reject) => {
            const step = () => {
                const result = generator.next();
                Promise.resolve(result.value)
                    .then( () => {
                        if(!result.done) resolve(step());
                        else this._onEndCallBack();
                    })
                    .catch(reject)
            }
            step();
        })
    }

    /**
     *
     * @param callback
     */
    set onEnd(callback){
        this._onEndCallBack = callback;
    }
}