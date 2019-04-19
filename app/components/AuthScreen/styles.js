/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    signIn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    },
    signIn_text: {
        fontSize: '2rem'
    },
    signIn_textInput: {
        $outline: 2,
        borderColor: 'red',
        fontSize: '2rem',
        width: '100%'
    },
    signIn_textInputPhTxtColor: 'silver'
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
