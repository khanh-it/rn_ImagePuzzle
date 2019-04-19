//
// import { connect } from 'react-redux';
import { store } from '../configs/store';

/**
 * @class Model
 */
export default class Model
{
    /**
     * @var {Object} redux store object
     */
    _store = null;

    /**
     * @var {String} redux store::state key
     */
    _stateKeyName = null;

    /**
     * @var {Ref}
     */
    _entity = null;

    /**
     * 
     * @param {object} data 
     */
    constructor(data)
    {
        // @var {Object} redux store object
        this._store = store;
    }

    /**
     * 
     * @returns mixed
     */
    stateData()
    {
        let data = this._store.getState()[this._stateKeyName];
        return data;
    }

    /**
     * 
     * @returns mixed
     */
    dataList()
    {
        let data = this.stateData();
        if (this._entity && data instanceof Array) {
            let Entity = this._entity;
            data = data.map((eData, index) => new Entity(eData));
        }
        return data;
    }

    /**
     * @param {Object} mapStateToProps
     * @param {Object} mapDispatchToProps
     * @param {Object} mergeProps
     * @param {Object} options
     */
    connect(mapStateToProps, mapDispatchToProps, mergeProps, options)
    {
        connect();
    }
}