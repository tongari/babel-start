export default class Organization {

    //instance member
    /**
     *
     * @type {string}
     * @private
     */
    _name = '';

    /**
     *
     * @type {number}
     * @private
     */
    _age = 37;

    /**
     *
     * @param in_name
     */
    constructor(in_name) {
        this._name = in_name;
    }

    //class member
    /**
     *
     * @param in_obj
     * @returns {boolean}
     */
    static isOrganization(in_obj) {
        return in_obj instanceof Organization;
    }

    //public method
    /**
     *
     * @returns {string}
     */
    greet() {
        return 'Hello! We are ' + this._name + '!!';
    }

    /**
     *
     * @returns {string}
     */
    get name(){
        return this._name;
    }

    /**
     *
     * @param in_name
     */
    set name(in_name){
        this._name = in_name;
    }

    /**
     *
     * @returns {number}
     */
    get age() {
        return this._age;
    }
}