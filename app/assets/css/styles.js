/**
 * Project's global styles
 * @see https://github.com/vitalets/react-native-extended-stylesheet
 */
import ESS from 'react-native-extended-stylesheet';

// global styles
const css = {
    html: { flex: 1 },
    body: { flex: 1, backgroundColor: 'white' }
};
// global variables
// +++ define theme
const theme = 'light'; // light | dark
// +++ 
let ESSVars = {
    $rem: 16
};
// +++ --> theme default
const dfStyles = {
    $theme: theme,
    //
    $rem: ESSVars.$rem,
    //
    $floating: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    $hidden: {
        height: 0,
        width: 0,
        opacity: 0,
    },
    $unhidden: {
        height: null,
        width: null,
        opacity: null,
    },
    // +++
    $textColor: '#000000', // main app's text color...
    $primaryBlue: '#3498db',
    // +++
    $textCenter: {
        textAlign: 'center'
    },
    // +++
    $p0: { padding: 0 },
    $p5: { padding: 5 },
    $p10: { padding: 10 },
    $p15: { padding: 15 },
    $p20: { padding: 20 },
    $p25: { padding: 25 },
    $p30: { padding: 30 },
    $p35: { padding: 35 },
    $p40: { padding: 40 },
    // +++
    $m5: { margin: 5 },
    $m10: { margin: 10 },
    $m15: { margin: 15 },
    $m20: { margin: 20 },
    //
    $document: css['document'],
    $body: css['body'],
};
// +++
const vars = ({
    // theme 'light'
    light : dfStyles,
    //.end

    // theme 'dark'
    dark : Object.assign({}, dfStyles, {
        
    })
})[theme];

// Export
const styles = ESS.create(css);
export default styles;

// always call ESS.build() even if you don't use global variables!
ESS.build(vars);
