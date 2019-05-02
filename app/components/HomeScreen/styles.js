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
        paddingTop: '1%',
        paddingRight: '2%',
        paddingBottom: '1%',
        paddingLeft: '2%',
        $outline: 1
    }, ESS.value('$body')),
    box: {
        $outline: 1,
        flex: 1
    },
    header: {
        $outline: 1,
        height: '10%'
    },
    body: {
        $outline: 1,
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bodyBg: {},
    footer: {
        padding: '1%',
        $outline: 1,
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
