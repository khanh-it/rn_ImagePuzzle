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
        '$outline': 1,
        backgroundColor: 'silver'
    },
    toolBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    toolBoxIco: {
        padding: '0.3rem'
    },
    toolBoxL: {
        flex: 1,
        flexDirection: 'row',
    },
    toolBoxIcoL: {
        
    },
    toolBoxLIcoTakePhoto: {

    },
    toolBoxR: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    toolBoxIcoR: {
        
    },
    toolBoxRIcoClose: {
        backgroundColor: 'red'
    },
    // ---
    photos: {
        flex: 1,
    },
    photosSV: {
        // flexDirection: 'row',
    },
    photosSVC: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    photosImg: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: 'green',
        margin: 5,
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
