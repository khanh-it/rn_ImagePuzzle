/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    root: {
        $outline: 1,
        borderColor: 'red',
        position: 'relative',
        overflow: 'hidden'
    },
    rootCCS: {
        flex: 0
    },
    img: {
        position: 'absolute',
        // left: 0,
        // top: 0
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
