!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){!function(){e.exports=this.React}()},function(e,t,n){var o=n(16);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}},function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},function(e,t,n){var o=n(17),r=n(8);e.exports=function(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?r(e):t}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.exports=function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t,n){var o=n(20),r=n(19),a=n(18);e.exports=function(e){return o(e)||r(e)||a()}},function(e,t){!function(){e.exports=this.wp.editor}()},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},n.apply(this,arguments)}e.exports=n},function(e,t,n){"use strict";n.r(t);var o=n(11),r=n.n(o),a=n(2),i=n.n(a),l=n(0),s=n(9),c=n.n(s),u=n(7),g=n.n(u),p=n(6),h=n.n(p),b=n(5),d=n.n(b),m=n(4),f=n.n(m),_=n(3),y=n(8),k=n.n(y),v=function(e){function t(e){var n;return i()(this,t),(n=h()(this,d()(t).call(this,e))).state={detach:!1},n.detach=n.detach.bind(k()(n)),n}return f()(t,e),g()(t,[{key:"detach",value:function(){this.setState({detach:!this.state.detach})}},{key:"render",value:function(){return Object(l.createElement)("div",{className:"Preview "+(this.props.isSelected&&this.state.detach?"FloatingPreview":"")},this.props.showBar?Object(l.createElement)("div",{className:"PreviewBar"},"Preview",Object(l.createElement)("button",{className:"DetachPreview",onClick:this.detach},this.state.detach?"Reattach":"Detach")):null,Object(l.createElement)("div",{className:"PreviewContainer"},this.props.children))}}]),t}(_.Component),w=n(1),C=function(e){function t(e){var n;return i()(this,t),(n=h()(this,d()(t).call(this,e))).state={selectedOption:e.selectedOption},n.setSelected=n.setSelected.bind(k()(n)),n}return f()(t,e),g()(t,[{key:"setSelected",value:function(e){this.setState({selectedOption:e}),this.props.onSelectedLayoutChange(e)}},{key:"render",value:function(){var e=this;return Object(l.createElement)("div",{className:"LayoutSelector"},this.props.options.map(function(t,n){return Object(l.createElement)("label",{className:"LayoutOption",key:n},Object(l.createElement)("div",{style:{display:"flex"}},Object(l.createElement)(w.RadioControl,{name:"layoutOption",selected:e.state.selectedOption,options:[{value:t.value}],onChange:e.setSelected}),t.label),t.image?Object(l.createElement)("img",{src:t.image}):null,t.help?Object(l.createElement)("p",{className:"help",dangerouslySetInnerHTML:{__html:t.help}}):null)}))}}]),t}(_.Component),O=function(e){function t(){return i()(this,t),h()(this,d()(t).apply(this,arguments))}return f()(t,e),g()(t,[{key:"render",value:function(){return Object(l.createElement)("div",{className:"FormSectionTitle"},this.props.children)}}]),t}(_.Component),E=function(e){function t(){return i()(this,t),h()(this,d()(t).apply(this,arguments))}return f()(t,e),g()(t,[{key:"render",value:function(){return Object(l.createElement)("div",{className:"FormHelp"},this.props.children)}}]),t}(_.Component),j=function(e){function t(){return i()(this,t),h()(this,d()(t).apply(this,arguments))}return f()(t,e),g()(t,[{key:"render",value:function(){return Object(l.createElement)("div",{className:"InlineFormFeedback"},this.props.children)}}]),t}(_.Component),x=n(10),T=function(e){function t(e){return i()(this,t),h()(this,d()(t).call(this,e))}return f()(t,e),g()(t,[{key:"render",value:function(){return Object(l.createElement)("div",{className:"ValidationMessage"},Object(l.createElement)("ul",null,this.props.message.map(function(e,t){return Object(l.createElement)("li",{key:t}," ",e," ")})))}}]),t}(_.Component),S=wp.i18n.__,N=function(e){function t(e){return i()(this,t),h()(this,d()(t).call(this,e))}return f()(t,e),g()(t,[{key:"renderEdit",value:function(){var e,t=(0,wp.data.select("core/editor").getCurrentPostType)(),n=[];for(var o in window.p4en_vars.pages){var r;e=window.p4en_vars.pages[o].map(function(e){return{label:e.name,value:e.id}}),n=(r=n).concat.apply(r,[{label:"-- "+o,value:o}].concat(c()(e)))}var a=window.p4en_vars.forms.map(function(e){return{label:e.post_title,value:e.ID}});return Object(l.createElement)("div",null,Object(l.createElement)("div",null,Object(l.createElement)(O,null,S("EN Form options","planet4-gutenberg-engagingnetworks")),Object(l.createElement)(E,null,S("Display options for   EN Forms","planet4-gutenberg-engagingnetworks")),Object(l.createElement)(w.SelectControl,{label:S("Engaging Network Live Pages","planet4-gutenberg-engagingnetworks"),value:this.props.en_page_id,options:[{label:"No pages",value:0}].concat(c()(n)),disabled:!n.length,onChange:this.props.onPageChange}),n.length?Object(l.createElement)(E,null,S("Select the Live EN page that this form will be submitted to.","planet4-gutenberg-engagingnetworks")):Object(l.createElement)(j,null,S("Check your EngagingNetworks settings!","planet4-gutenberg-engagingnetworks")),Object(l.createElement)(w.SelectControl,{label:S("- Select Goal -","planet4-gutenberg-engagingnetworks"),value:this.props.enform_goal,options:[{label:"Petition Signup",value:"Petition Signup"},{label:"Action Alert",value:"Action Alert"},{label:"Contact Form",value:"Contact Form"},{label:"Other",value:"Other"}],onChange:this.props.onGoalChange}),Object(l.createElement)("div",null,Object(l.createElement)(C,{selectedOption:this.props.en_form_style,onSelectedLayoutChange:this.props.onSelectedLayoutChange,options:[{label:S("Page body / text size width. No background.","planet4-gutenberg-engagingnetworks"),image:window.p4en_vars.home+"images/enfullwidth.png",value:"full-width-bg",help:S("Use: on long pages (more than 5 screens) when list items are long (+ 10 words)<br>No max items<br>recommended.","planet4-gutenberg-engagingnetworks")},{label:S("Full page width. With background image.","planet4-gutenberg-engagingnetworks"),image:window.p4en_vars.home+"images/enfullwidthbg.png",value:"full-width",help:S('This form has a background image that expands the full width of the browser (aka "Happy Point").',"planet4-gutenberg-engagingnetworks")},{label:S("Form on the side.","planet4-gutenberg-engagingnetworks"),image:window.p4en_vars.home+"images/submenu-sidebar.jpg",value:"side-style",help:S("Form will be added to the top of the page, on the right side for most languages and on the left side for Right-to-left(RTL) languages.","planet4-gutenberg-engagingnetworks")}]})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Form Title","planet4-gutenberg-engagingnetworks"),placeholder:S("Enter title","planet4-gutenberg-engagingnetworks"),value:this.props.title,onChange:this.props.onTitleChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Form Description","planet4-gutenberg-engagingnetworks"),placeholder:S("Enter description","planet4-gutenberg-engagingnetworks"),value:this.props.description,onChange:this.props.onDescriptionChange})),"side-style"===this.props.en_form_style&&Object(l.createElement)("div",null,"campaign"===t&&Object(l.createElement)("div",null,Object(l.createElement)(w.ToggleControl,{label:S("Use Campaign Logo?","p4ge"),value:this.props.campaign_logo,checked:this.props.campaign_logo,onChange:this.props.onCampaignLogoChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Content Title","planet4-gutenberg-engagingnetworks"),placeholder:S("Enter content title","planet4-gutenberg-engagingnetworks"),value:this.props.content_title,onChange:this.props.onContentTitleChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.SelectControl,{label:S("Content Title text size","planet4-gutenberg-engagingnetworks"),value:this.props.content_title_size,options:[{label:S("Select title size","planet4-gutenberg-engagingnetworks"),value:""},{label:"h1",value:"h1"},{label:"h2",value:"h2"},{label:"h3",value:"h3"}],onChange:this.props.onContentTitleSizeChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextareaControl,{label:S("Content Description","planet4-gutenberg-engagingnetworks"),placeholder:S("Enter content description","planet4-gutenberg-engagingnetworks"),value:this.props.content_description,onChange:this.props.onContentDescriptionChange}))),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S('Call to Action button (e.g. "Sign up now!")',"planet4-gutenberg-engagingnetworks"),placeholder:S('Enter the "Call to Action" button text',"planet4-gutenberg-engagingnetworks"),value:this.props.button_text,onChange:this.props.onCTAButtonTextChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextareaControl,{label:S("Text below Call to Action button","planet4-gutenberg-engagingnetworks"),placeholder:S("Enter text to go below the button","planet4-gutenberg-engagingnetworks"),value:this.props.text_below_button,onChange:this.props.onCTATextBelowButtonChange})),Object(l.createElement)(O,null,S('"Thank You" message settings',"planet4-gutenberg-engagingnetworks")),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Main text / Title","planet4-gutenberg-engagingnetworks"),placeholder:S('e.g. "Thank you for signing!"',"planet4-gutenberg-engagingnetworks"),value:this.props.thankyou_title,onChange:this.props.onMainThankYouTextChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Secondary message / Subtitle","planet4-gutenberg-engagingnetworks"),placeholder:S('e.g. "Your support means world"',"planet4-gutenberg-engagingnetworks"),value:this.props.thankyou_subtitle,onChange:this.props.onSecondaryThankYouMessageChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Social media message","planet4-gutenberg-engagingnetworks"),placeholder:S('e.g. "Can you share it with your family and friends?"',"planet4-gutenberg-engagingnetworks"),value:this.props.thankyou_social_media_message,onChange:this.props.onThankYouTakeActionMessageChange})),Object(l.createElement)(w.ToggleControl,{label:S('Hide "Thank You" donate button',"p4ge"),value:this.props.donate_button_checkbox,checked:this.props.donate_button_checkbox,onChange:this.props.onDonateButtonCheckboxChange}),!0!==this.props.donate_button_checkbox&&Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("Donate message","planet4-gutenberg-engagingnetworks"),placeholder:S('e.g. "or make a donation"',"planet4-gutenberg-engagingnetworks"),value:this.props.thankyou_donate_message,onChange:this.props.onThankYouDonateMessageChange})),Object(l.createElement)("div",null,Object(l.createElement)(w.TextControl,{label:S("URL (Title and Subtitle will not be shown)","planet4-gutenberg-engagingnetworks"),placeholder:S('Enter "Thank you page" url',"planet4-gutenberg-engagingnetworks"),value:this.props.thankyou_url,onChange:this.props.onThankYouURLChange})),"full-width-bg"!==this.props.en_form_style&&Object(l.createElement)("div",null,Object(l.createElement)(x.MediaPlaceholder,{labels:{title:S("Background","planet4-gutenberg-engagingnetworks"),instructions:S("Select an image.","planet4-gutenberg-engagingnetworks")},icon:"format-image",onSelect:this.props.onSelectImage,onError:this.props.onUploadError,accept:"image/*",allowedTypes:["image"]})),Object(l.createElement)("div",null,Object(l.createElement)(w.SelectControl,{label:S("Planet 4 Engaging Networks form","planet4-gutenberg-engagingnetworks"),value:this.props.en_form_id,options:[{label:"No forms",value:0}].concat(c()(a)),onChange:this.props.onFormChange}),Object(l.createElement)(E,null,this.props.forms?S("Select the P4EN Form that will be displayed.","planet4-gutenberg-engagingnetworks"):S("Create an EN Form","planet4-gutenberg-engagingnetworks")))))}},{key:"render",value:function(){var e=[];return!1===this.props.isSelected&&(void 0!==this.props.en_page_id&&0!==this.props.en_page_id||e.push(S('"Engaging Network Live Pages" field is required!',"planet4-gutenberg-engagingnetworks")),void 0!==this.props.button_text&&""!==this.props.button_text||e.push(S('"Call to Action button" field is required!',"planet4-gutenberg-engagingnetworks")),void 0!==this.props.en_form_id&&0!==this.props.en_form_id||e.push(S('"Planet 4 Engaging Networks form" field is required!',"planet4-gutenberg-engagingnetworks"))),Object(l.createElement)("div",null,this.props.isSelected?this.renderEdit():null,Object(l.createElement)(v,{showBar:this.props.isSelected,isSelected:this.props.isSelected},e.length?Object(l.createElement)(T,{message:e}):Object(l.createElement)(w.ServerSideRender,{block:"planet4-blocks/enform",attributes:{en_page_id:this.props.en_page_id,en_form_id:this.props.en_form_id,en_form_style:this.props.en_form_style,title:this.props.title,description:this.props.description,campaign_logo:this.props.campaign_logo,content_title:this.props.content_title,content_title_size:this.props.content_title_size,content_description:this.props.content_description,button_text:this.props.button_text,thankyou_title:this.props.thankyou_title,thankyou_subtitle:this.props.thankyou_subtitle,thankyou_donate_message:this.props.thankyou_donate_message,thankyou_social_media_message:this.props.thankyou_social_media_message,donate_button_checkbox:this.props.donate_button_checkbox,thankyou_url:this.props.thankyou_url,background:this.props.background}})))}}]),t}(_.Component);new function e(){i()(this,e),(0,wp.blocks.registerBlockType)("planet4-blocks/enform",{title:"EN Form",icon:"feedback",category:"planet4-blocks",transforms:{from:[{type:"shortcode",tag:"shortcake_enblock",attributes:{en_page_id:{type:"integer",shortcode:function(e){return Number(e.named.en_page_id)}},enform_goal:{type:"string",shortcode:function(e){return e.named.enform_goal}},en_form_style:{type:"string",shortcode:function(e){return e.named.en_form_style}},title:{type:"string",shortcode:function(e){return e.named.title}},description:{type:"string",shortcode:function(e){return e.named.description}},campaign_logo:{type:"boolean",shortcode:function(e){return boolean(e.named.campaign_logo)}},content_title:{type:"string",shortcode:function(e){return e.named.content_title}},content_title_size:{type:"string",shortcode:function(e){return e.named.content_title_size}},content_description:{type:"string",shortcode:function(e){return e.named.content_description}},button_text:{type:"string",shortcode:function(e){return e.named.button_text}},text_below_button:{type:"string",shortcode:function(e){return e.named.text_below_button}},thankyou_title:{type:"string",shortcode:function(e){return e.named.thankyou_title}},thankyou_subtitle:{type:"string",shortcode:function(e){return e.named.thankyou_subtitle}},thankyou_donate_message:{type:"string",shortcode:function(e){return e.named.thankyou_donate_message}},thankyou_social_media_message:{type:"string",shortcode:function(e){return e.named.thankyou_social_media_message}},donate_button_checkbox:{type:"boolean",shortcode:function(e){return boolean(e.named.donate_button_checkbox)}},thankyou_url:{type:"string",shortcode:function(e){return e.named.thankyou_url}},background:{type:"integer",shortcode:function(e){return e.named.background}},en_form_id:{type:"integer",shortcode:function(e){return Number(e.named.en_form_id)}}}}]},attributes:{en_page_id:{type:"integer"},enform_goal:{type:"string"},en_form_style:{type:"string"},title:{type:"string"},description:{type:"string"},campaign_logo:{type:"boolean"},content_title:{type:"string"},content_title_size:{type:"string"},content_description:{type:"string"},button_text:{type:"string"},text_below_button:{type:"string"},thankyou_title:{type:"string"},thankyou_subtitle:{type:"string"},thankyou_donate_message:{type:"string"},thankyou_social_media_message:{type:"string"},donate_button_checkbox:{type:"boolean"},thankyou_url:{type:"string"},background:{type:"integer"},en_form_id:{type:"integer"}},edit:function(e){var t=e.attributes,n=e.isSelected,o=e.setAttributes;return Object(l.createElement)(N,r()({},t,{isSelected:n,onPageChange:function(e){o({en_page_id:parseInt(e)})},onGoalChange:function(e){o({enform_goal:e})},onTitleChange:function(e){o({title:e})},onDescriptionChange:function(e){o({description:e})},onCampaignLogoChange:function(e){o({campaign_logo:e})},onContentTitleChange:function(e){o({content_title:e})},onContentTitleSizeChange:function(e){o({content_title_size:e})},onContentDescriptionChange:function(e){o({content_description:e})},onCTAButtonTextChange:function(e){o({button_text:e})},onCTATextBelowButtonChange:function(e){o({text_below_button:e})},onSelectedLayoutChange:function(e){o({en_form_style:e})},onSelectImage:function(e){o({background:Number(e.id)})},onSelectURL:function(e){e.url,o({id:null})},onMainThankYouTextChange:function(e){o({thankyou_title:e})},onSecondaryThankYouMessageChange:function(e){o({thankyou_subtitle:e})},onThankYouTakeActionMessageChange:function(e){o({thankyou_social_media_message:e})},onDonateButtonCheckboxChange:function(e){o({donate_button_checkbox:e})},onThankYouURLChange:function(e){o({thankyou_url:e})},onThankYouDonateMessageChange:function(e){o({thankyou_donate_message:e})},onFormChange:function(e){o({en_form_id:Number(e)})},onUploadError:function(e){var t=e.message;console.log(t)}}))},save:function(){return null}})}},,,,function(e,t){function n(t,o){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,o)}e.exports=n},function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(t){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?e.exports=o=function(e){return n(e)}:e.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":n(e)},o(t)}e.exports=o},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}}]);