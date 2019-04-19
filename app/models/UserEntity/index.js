//
import Entity from '../Entity';

/**
 * @class UserEntity
 */
export default class UserEntity extends Entity
{
    /**
     * 
     * @param {object} data 
     */
    constructor(data)
    {
        super(data);
    }

    /**
     * 
     * @returns {String}
     */
    key()
    {
        let key = this.tel || Math.random().toString();
        return key;
    }

    /**
     * 
     * @returns {String}
     */
    __fullname()
    {
        return this.fullname || [
            this.first_name,
            this.last_name
        ].join(' ').trim();
    }
}