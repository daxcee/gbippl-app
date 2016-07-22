import React from 'react';
import { WebView } from 'react-native';

const BODY_TAG_PATTERN = /\<\/ *body\>/;

// Do not add any comments to this! It will break line breaks will removed for
// some weird reason.
var script = `
;(function() {
    var wrapper = document.createElement("div");
    wrapper.id = "height-wrapper";
    while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
    }
    document.body.appendChild(wrapper);
    var i = 0;
    function updateHeight() {
        document.title = wrapper.clientHeight;
        window.location.hash = ++i;
    }
    updateHeight();
}());
`;


const style = `
<style>
body, html, #height-wrapper {
    margin: 0;
    padding: 1.5rem;
    padding-top: 0;
    font-size: .95rem;
    line-height: 1.2rem;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
<script>
${script}
</script>
`;

const codeInject = (html) => html.replace(BODY_TAG_PATTERN, style + "</body>");

class WebContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            height: props.height || 120
        };
    }

    onNavigationStateChange(navState) {
        console.log(navState);
        this.setState({
            height: navState.title
        });
    }

    render() {
        let {
            html,
            style,
            autoHeight,
            scrollEnabled,
            ...props
        } = this.props;

        let scrubbedHtml = codeInject(`<body>${html}</body>`);

        console.log(this.state.height);

        return (
            <WebView
                {...props}
                automaticallyAdjustContentInsets={false}
                style={[style, (autoHeight ? {height: Number(this.state.height)} : {})]}
                scrollEnabled={autoHeight ? false : scrollEnabled}
                javaScriptEnabled={true}
                source={{html: autoHeight ? scrubbedHtml : html}}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
        );
    }
}

export default WebContainer;