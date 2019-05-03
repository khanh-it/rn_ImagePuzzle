/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    header: {
        // $outline: 1,
        flexDirection: 'row',
        height: '10%'
    },
    headerL: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTxt001: {
        fontSize: '1.5rem'
    },
    headerTxt002: {
        fontSize: '0.8rem'
    },
    headerR: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTxt101: {
        fontSize: '3rem'
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
