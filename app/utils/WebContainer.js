// import React from 'react';
// import { WebView, Dimensions, Text, View } from 'react-native';

// const BODY_TAG_PATTERN = /\<\/ *body\>/;

// // Do not add any comments to this! It will break line breaks will removed for
// // some weird reason.
// var script = `
// ;(function() {
//     var wrapper = document.createElement("div");
//     wrapper.id = "height-wrapper";
//     while (document.body.firstChild) {
//         wrapper.appendChild(document.body.firstChild);
//     }
//     document.body.appendChild(wrapper);
//     var i = 0;
//     function updateHeight() {
//         document.title = wrapper.clientHeight;
//         window.location.hash = ++i;
//     }
//     updateHeight();
//     window.addEventListener("load", function() {
//         updateHeight();
//         setTimeout(updateHeight, 1000);
//     });
//     window.addEventListener("resize", updateHeight);
// }());
// `;


// const style = `
// <style>
// body, html, #height-wrapper {
//     margin: 0;
//     padding: 1.5rem;
//     padding-top: 0;
//     font-size: .95rem;
//     line-height: 1.2rem;
// }
// #height-wrapper {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
// }
// </style>
// <script>
// ${script}
// </script>
// `;

// const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");

// class WebContainer extends React.Component {
//     constructor(props) {
//         super();
//         this.state = {
//             height: props.height || 120
//         };
//     }

//     onNavigationStateChange(navState) {
//         this.setState({
//             height: navState.title
//         });
//     }

//     render() {
//         let {
//             html,
//             style,
//             autoHeight,
//             scrollEnabled,
//             ...props
//         } = this.props;
//         if (!html) html = '';

//         let scrubbedHtml = codeInject(`<body>${html}</body>`);

//         return (
//             <WebView
//                 {...props}
//                 automaticallyAdjustContentInsets={false}
//                 style={[style, (autoHeight ? {height: Number(this.state.height)} : {})]}
//                 scrollEnabled={autoHeight ? false : scrollEnabled}
//                 javaScriptEnabled={true}
//                 source={{html: autoHeight ? scrubbedHtml : html}}
//                 onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
//         );
//     }
// }

// var WebContainer = React.createClass({
//     getInitialState: function () {
//         return {
//             webViewHeight: 100 // default height, can be anything
//         };
//     },
//     render: function () {
//         var {html} = this.props;
//         return (
//             <View style={{paddingTop: 20}}>
//                 <Text>This is above the WebView.</Text>
//                 <WebView
//                     source={{html: html}}
//                     javaScriptEnabled={true}
//                     injectedJavaScript="document.body.clientHeight;"
//                     scrollEnabled={false}
//                     onNavigationStateChange={this._updateWebViewHeight}
//                     automaticallyAdjustContentInsets={true}
//                     style={{width: Dimensions.get('window').width, height: this.state.webViewHeight}}/>
//                 <Text>This is below the WebView.</Text>
//             </View>
//         );
//     },
    
//     _updateWebViewHeight: function (event) {
//         console.log('WATCH', event.jsEvaluationValue);
//         this.setState({webViewHeight: parseInt(event.jsEvaluationValue)});
//     }
// });

// export default WebContainer;

// import React from 'react';
// import {WebView, View, Text} from "react-native";


// const BODY_TAG_PATTERN = /\<\/ *body\>/;

// // Do not add any comments to this! It will break because all line breaks will removed for
// // some weird reason when this script is injected.
// var script = `
// ;(function() {
// var wrapper = document.createElement("div");
// wrapper.id = "height-wrapper";
// while (document.body.firstChild) {
//     wrapper.appendChild(document.body.firstChild);
// }
// document.body.appendChild(wrapper);
// var i = 0;
// function updateHeight() {
//     alert(wrapper.clientHeight);
//     document.title = wrapper.clientHeight;
//     window.location.hash = ++i;
// }
// updateHeight();
// window.addEventListener("load", function() {
//     updateHeight();
//     setTimeout(updateHeight, 1000);
// });
// window.addEventListener("resize", updateHeight);
// }());
// `;


// const style = `
// <style>
// body, html, #height-wrapper {
//     margin: 0;
//     padding: 0;
// }
// #height-wrapper {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
// }
// </style>
// <script>
// ${script}
// </script>
// `;

// const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");


// /**
//  * Wrapped Webview which automatically sets the height according to the
//  * content. Scrolling is always disabled. Required when the Webview is embedded
//  * into a ScrollView with other components.
//  *
//  * Inspired by this SO answer http://stackoverflow.com/a/33012545
//  * */
// var WebViewAutoHeight = React.createClass({

//     propTypes: {
//         source: React.PropTypes.object.isRequired,
//         injectedJavaScript: React.PropTypes.string,
//         minHeight: React.PropTypes.number,
//         onNavigationStateChange: React.PropTypes.func,
//         style: WebView.propTypes.style,
//     },

//     getDefaultProps() {
//         return {minHeight: 200};
//     },

//     getInitialState() {
//         return {
//             realContentHeight: this.props.minHeight,
//         };
//     },

//     handleNavigationChange(navState) {
//         if (navState.title) {
//             const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
//             this.setState({realContentHeight});
//         }
//         if (typeof this.props.onNavigationStateChange === "function") {
//             this.props.onNavigationStateChange(navState);
//         }
//     },

//     render() {
//         const {html, style, minHeight, ...otherProps} = this.props;
//         let scrubbedHtml = codeInject(`<body>${html}</body>`);

//         return (
//             <View>
//                 <WebView
//                     {...otherProps}
//                     source={{html: scrubbedHtml}}
//                     scrollEnabled={false}
//                     style={[style, {height: Math.max(this.state.realContentHeight, minHeight)}]}
//                     javaScriptEnabled
//                     onNavigationStateChange={this.handleNavigationChange}
//                 />
//                 {process.env.NODE_ENV !== "production" &&
//                 <Text>Web content height: {this.state.realContentHeight}</Text>}
//             </View>
//         );
//     },

// });


// export default WebViewAutoHeight;

import React from 'react';
import Web from 'react-native-webview2';

class WebView extends React.Component {
    render() {
        return (
            <Web
                ref={(c) => {this.web = c}}
                evalReturn={((r) => {eval(r)}).bind(this)}
                source={{html: this.props.html}}
                style={[{minHeight: 300}]}
            />
        );
    }
}

export default WebView;