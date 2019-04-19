//

/**
 * @class Entity
 */
export default class Entity
{
    /**
     * 
     * @param {object} _data
     */
    constructor(_data = {})
    {
        // Get, format input(s)
        let data = Object.assign({}, _data);
        // +++
        if (!data.id) {
            data.id = Entity.genID();
        }
        //
        Object.assign(this, data);
    }

    /**
     * 
     * @param {object} data 
     */
    static genID(opts = {})
    {
        let id = (new Date().toISOString()) + Math.random().toString();
        return id;
    }
}