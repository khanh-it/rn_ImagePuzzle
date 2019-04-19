//
import Model from '../Model';
//
import UserEntity from '../UserEntity';
// Action(s)
import {
    userAdd
} from '../../actions/user';

/**
 * @class UserModel
 */
export default class UserModel extends Model
{
    /**
     * @var {String} redux store::state key
     */
    _stateKeyName = 'users';

    /**
     * @var {Ref}
     */
    _entity = UserEntity;

    /**
     * 
     * @param {object} data
     */
    constructor(data)
    {
        super(data);
    }

    dataList(_opts = {})
    {
        // Get, format input(s)
        let opts = Object.assign({}, _opts);

        // Fetch data
        let dataList = super.dataList(opts);
        // +++ Include 'Favorites'?
        if (opts.favorite/* && (dataList instanceof Array)*/) {
            dataList = ([
                new UserEntity({
                    first_name: 'Favorites',
                    last_name: 'Favorites',
                    tel: 'Favorites',
                    favorite: true,
                })
            ]).concat(dataList);
        }

        // Filter?
        let { filters = {} } = opts;
        // ---
        if (Object.keys(filters).length) {
            dataList = dataList.filter((item, idx) => {
                let rtn = true;
                // Filter by: fullname or tel?
                if (filters.fullname_or_tel) {
                    rtn = false;
                    let fnOrTelLC = filters.fullname_or_tel.toString().toLowerCase();
                    let fnLC = item.fullname().toString().toLowerCase();
                    let telLC = item.tel.toString().toLowerCase();
                    if ((fnLC.indexOf(fnOrTelLC) >= 0)
                        || (telLC.indexOf(fnOrTelLC) >= 0)
                    ) {
                        rtn = true;
                    }
                    // console.log('fnLC: ', fnLC, fnLC.indexOf(fnOrTelLC));
                    // console.log('telLC: ', telLC, telLC.indexOf(fnOrTelLC));
                    // console.log('rtn: ', rtn);
                }
                return rtn;
            });
        }
        //.end

        // Return
        return dataList;
    }

    findOne(_opts = {})
    {
        // Fetch data
        let dataList = this.dataList(_opts);

        // Filters
        return dataList[0] || null;
    }

    /**
     * 
     */
    create(data = {})
    {
        // Validate data?!
        if (!data.fullname) {
            throw new Error('Data `fullname` is required!');
        }
        // Init
        // +++
        if (!data.created_at) {
            data.created_at = new Date();
        }

        //
        let ent = new UserEntity(data);
        this._store.dispatch(userAdd(ent));
        return ent;
    }
}