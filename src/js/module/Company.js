import Organization from './Organization';
export default class Company extends Organization{

    //instance member
    /**
     *
     * @type {string}
     * @private
     */
    _location = 'chiba';


    //class member
    /**
     *
     * @type {boolean}
     * @private
     */
    static isInit = false;

    /**
     *
     * @param in_name
     */
    constructor(in_name) {
        super(in_name);
    }

    /**
     *
     * @returns {string}
     */
    greet() {
        return super.greet() + ' We are based in ' + this._location + '.';
    }
}


