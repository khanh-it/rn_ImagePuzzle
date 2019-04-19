/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    root: Object.assign({
        // flex: 1
    }, ESS.value('$body')),
    headerWrap: {
        width: '100%',
        backgroundColor: 'white'
    },
    bodyWrap: {
        flex: 1
    },
    bodyOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        opacity: 0.3
    },
};
const css = {
    // theme 'light'
    light : dfStyles,
    //.end

    // theme 'dark'
    dark : Object.assign({}, dfStyles, {
        // ...
    }),
    //.end
};
const styles = ESS.create(css[theme] || dfStyles);
export default styles;
