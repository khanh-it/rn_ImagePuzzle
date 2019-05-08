/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    footer: {
        padding: '1%',
        flexDirection: 'row'
    },
    footerL: {
        width: '50%'
    },
    footerR: {
        width: '50%',
        alignItems: 'flex-end'
    }
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
