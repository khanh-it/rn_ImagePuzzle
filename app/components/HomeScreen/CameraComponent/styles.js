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
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    pendingView: {
        flex: 1,
        backgroundColor: 'pink',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    toolBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    toolBoxItem: {
        flex: 1,
        flexDirection: 'row',
    },
    toolBoxL: {},
    toolBoxC: {
        justifyContent: 'center'
    },
    toolBoxR: {
        justifyContent: 'flex-end'
    },
    toolBoxIco: {
        padding: '0.3rem'
    },
    toolBoxIcoL: {},
    toolBoxIcoC: {},
    toolBoxIcoR: {},
    toolBoxIcoClose: {
        backgroundColor: 'red'
    },
    toolBoxIcoAperture: {
        backgroundColor: 'green'
    },
    toolBoxIcoSync: {
        backgroundColor: 'yellow'
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
