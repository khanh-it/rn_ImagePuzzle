/**
 * Created by Guy Blank on 3/9/17.
 *
 *  This is a sample provides an API to send & receive messages to and from the React-Native WebView (using postMessage/onMessage WebView API).
 *  A sample project that uses the bridge is available here https://github.com/blankg/rn-webview-bridge-sample
 *
 *  webViewBridgevt.send('functionToInvoke', {mydata: 'test'}, function(){dLog('success')},function(){dLog('error')});
 *
 *  The API is designed to be similar to the Cordova exec API so migration to it should be almost seamless.
 *  The API also provides solution to a React-Native WebView bug in iOS which causes sending consecutive postMessage calls to override each other.
 *
 *  Handling message on the React-Native side:
 *   <WebView
 *       ref={webview => { this.myWebView = webview; }}
 *       onMessage={this.onWebViewMessage}
 *  />
 *
 *  onWebViewMessage(event) {
 *      // post back reply as soon as possible to enable sending the next message
 *      this.myWebView.postMessage(event.nativeEvent.data);
 *
 *      let msgData;
 *      try {
 *          msgData = JSON.parse(event.nativeEvent.data);
 *      }
 *      catch(err) {
 *          consolevt.warn(err);
 *          return;
 *      }
 *
 *      // invoke target function
 *      const response = this[msgData.targetFunc].apply(this, [msgData]);
 *      // trigger success callback
 *      msgData.isSuccessfull = true;
 *      msgData.args = [response];
 *      this.myWebView.postMessage(JSON.stringify(msgData))
 *  }
 *
 */
//
function dLogDiv() {
    var id = 'wvb-debug-div';
    var e = document.getElementById(id);
    if (!e) {
        (e = document.createElement('div')).id = id;
        var st = e.style;
        st.position = 'fixed';
        st.zIndex = 99999;
        st.left = 0; st.bottom = 0;
        st.width = '100%';
        st.minHeight = '4px';
        st.backgroundColor = 'yellow'
        st.color = 'black';
        st.fontSize = '90%';
        st.maxHeight = '128px';
        st.overflow = 'scroll';
        document.body.appendChild(e);
    }
    return e;
}
//.end
//
function dLog(msg) {
    // Init
    var cls = (window.dLog = dLog);
    // @var {number} idx 
    cls.del = cls.del || function(idx) { cls.msgs.splice(idx, 1); dLog(); };
    // @var {Array}
    cls.msgs = cls.msgs || [];
    //.end
    //
    msg && cls.msgs.push(msg);
    var div = dLogDiv(), html = '<ol>', msgI = '';
    for (var i in cls.msgs) {
        msgI = cls.msgs[i];
        html += ('<li>' + (msgI + ' <a href="javascript:void(0);" onclick="dLog.del(' + i + ');">x</a>') + '</li>');
    }
    html += '</ol>';
    div.innerHTML = html;
}
//.end
/**
 * @class WebViewBridge
 */
function WebViewBridge() {
    // Init
    var cls = WebViewBridge;
    // Self assign;
    var self = this;
    self._callbacks = {};
    // @var {Object}
    //
    /* cls.s4 = cls.s4 || function() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }; */
    //    
    cls.guid = cls.guid || function() {
        // return cls.s4() + cls.s4() + "-" + cls.s4() + "-" + cls.s4() + "-" + cls.s4() + "-" + cls.s4() + cls.s4() + cls.s4();
        return ((new Date()).getTime() + Math.random()).toString();
    };
    /**
     * Send message to the React-Native WebView onMessage handler
     * @param {mixed} data Data to pass
     * @param {Function} callback
     */
    self.send = function(data, callback) {
        // Format input
        var msgObj = (data = ((typeof data === 'object') ? data : {}));
        msgObj._id = cls.guid();
        try {
            if (typeof callback === 'function') {
                self._callbacks[msgObj._id] = callback;
            }
            msgObj = (typeof msgObj === 'string') ? msgObj : JSON.stringify(msgObj);
            window.postMessage(msgObj);
            dLog('WVB sent: ' + msgObj);
        } catch (err) {
            dLog('WVB send failed: ' + err.message);
        }
    };
    /**
     * 
     */
    (self._bindEvents = function() {
        document.addEventListener('message', function(evt) {
            try {
                var msg = JSON.parse(evt.data);
                // trigger callback?
                var callback = self._callbacks[msg._id];
                if (callback) {
                    callback(msg.error, msg);
                    delete self._callbacks[msg._id];
                }
                dLog("msg from react-native: " + evt.data);
            } catch(err) {
                dLog("Failed to parse msg from react-native: " + err);
            }
        });
    })();
};
//
function WVComm() {
    var WVB = WVComm.WVB = (WVComm.WVB || new WebViewBridge());
    try {
        WVB.send({
            type: 'webpage_info',
            document: {
                title: document.title,
                cookie: document.cookie
            },
            location: location,
            navigator: {
                vendor: navigator.vendor,
                vendorSub: navigator.vendorSub,
                userAgent: navigator.userAgent
            }
        }, function(err, res){
            err && dLog('WVCommCB err: ' + JSON.stringify(err));
            !err && dLog('WVCommCB res: ' + JSON.stringify(res));
        });
        dLog('WVComm sent!');
    } catch (err) {
        dLog('WVComm err: ' + err.message);
    }
};
//
export default function injectedJS() {
    return `(function(){
    /* Debug tools */
    ${dLogDiv};
    ${dLog};
    /*.end*/
    /* WebViewBridge */
    ${WebViewBridge};
    ${WVComm};
    /*.end*/
    dLog('injectedJS is working..!');
})();`;
};
