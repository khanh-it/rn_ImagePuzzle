/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
const zIndexRoot = 9990;

//
const styles = ESS.create({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: $g.dimensions.screen.width,
        zIndex: zIndexRoot,
        // borderWidth: 2, borderColor: 'green',
    },
    rootVisible: {
        left: 0,
    },
    wv: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: $g.dimensions.screen.width,
        zIndex: zIndexRoot + 1,
        // borderWidth: 1, borderColor: 'red',
    },
    wvVisible: {
        left: 0
    },
    head: {
        height: 50,
        backgroundColor: '$primaryBlue',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    headLR: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headBtn: {
        fontSize: 28,
        width: 30,
        textAlign: 'center',
        // borderWidth: 1, borderColor: 'silver',
        // backgroundColor: 'white',
    },
    headTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTxt: {
        color: 'white',
        fontSize: 16
    },
    headMenu: {
        position: 'absolute',
        top: 42,
        right: -$g.dimensions.screen.width,
        zIndex: zIndexRoot + 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'silver',
        padding: 10,
    },
    headMenuItem: {
        flexDirection: 'row',
    },
    headMenuTouch: {
        marginRight: 5,
        marginLeft: 5,
        paddingRight: 5,
        paddingLeft: 5,
        // borderWidth: 1, borderColor: 'red'
    },
    headMenuLink: {

    },
    headBtnTxt: {
        fontSize: 18,
        paddingTop: 6,
        paddingBottom: 6,
    },
    headBtnIcon: {
        fontSize: 18,
    },
    // webview
    webview: {
        flex: 1,
        backgroundColor: 'white',
        // borderWidth: 2, borderColor: 'blue'
    },
    webviewWV: {
        // minHeight: '45%'
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0, left: 0,
        zIndex: zIndexRoot + 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
    //.end
});
export default styles;