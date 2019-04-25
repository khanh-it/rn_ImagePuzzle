/**
 * 
 */
// import crypto from 'crypto';

/**
 * Is string?
 * @return {bool|mixed}
 */
export function isString(data, rtnData) {
    let rs = ('[object String]' === Object.prototype.toString.call(data));
    return (undefined !== rtnData) ? (rs ? data : rtnData) : rs;
}

/**
 * Is plain object?
 * @return {bool|mixed}
 */
export function isPlainObject(data, rtnData) {
    return ('[object Object]' === Object.prototype.toString.call(data));
    return (undefined !== rtnData) ? (rs ? data : rtnData) : rs;
}

/**
 * Is boolean?
 * @return {bool|mixed}
 */
export function isBoolean(data, rtnData) {
    return ('[object Boolean]' === Object.prototype.toString.call(data));
    return (undefined !== rtnData) ? (rs ? data : rtnData) : rs;
}
export function isBool(data, rtnData) {
    return isBoolean(data, rtnData);
}

/**
 * 
 * @return {String}
 */
export function uniqueID() {
    return new String(new Date().getTime() + Math.random()).toString();
}

/**
 * 
 * @return {String}
 */
/* export function encryptPassword(password) {
    const hash = crypto.createHmac('sha256', encryptPassword.salt)
      .update(password)
      .digest('hex')
    ;
    return hash;
}
encryptPassword.salt = '123-456-789';
*/

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}