/**
 * 
 */
//
import {
    Toast
} from 'native-base';

// 
let ToastShowDfOpts = {
    buttonText: 'x',
    duration: 3000
}; 

/**
 * 
 */
Object.assign(Toast, {
    /**
     * 
     */
    showDanger: function showDanger(text, onClose, ...opts) {
        return Toast.show(Object.assign({}, ToastShowDfOpts, {
            text, onClose, type: 'danger'
        }, opts));
    },
    /**
     * 
     */
    showWarning: function showWarning(text, onClose, ...opts) {
        return Toast.show(Object.assign({}, ToastShowDfOpts, {
            text, onClose, type: 'warning'
        }, opts));
    },
    /**
     * 
     */
    showSuccess: function showSuccess(text, onClose, ...opts) {
        return Toast.show(Object.assign({}, ToastShowDfOpts, {
            text, onClose, type: 'success'
        }, opts));
    }
});
