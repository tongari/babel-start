let _instance = null;
let _isInit = false;

export default class Singleton{

    /**
     *
     * @type {number}
     * @private
     */
    _counter = 0;

    /**
     * 
     * @returns {*}
     */
    constructor() {

        if ( !_isInit || _instance ) throw new Error('Cannot construct Singleton');
        if ( !_instance ) _instance = this;
        return _instance;
    }

    /**
     *
     * @returns {number}
     */
    get counter(){
        ++this._counter;
        return this._counter;
    }

    /**
     *
     * @returns {*}
     */
    static getInstance() {

        if( !_isInit ) _isInit = true;
        if ( !_instance )_instance = new Singleton();
        return _instance;
    }

}