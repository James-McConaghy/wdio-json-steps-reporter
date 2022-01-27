(this["webpackJsonpwdio-json-steps-reporter-react"]=this["webpackJsonpwdio-json-steps-reporter-react"]||[]).push([[0],{119:function(e,t,s){},120:function(e,t,s){},122:function(e,t,s){},148:function(e,t,s){},149:function(e,t,s){},150:function(e,t,s){},151:function(e,t,s){},155:function(e,t,s){"use strict";s.r(t);var a,r=s(0),n=s.n(r),i=s(14),c=s.n(i),l=(s(119),s(16)),o=s(17),d=s(19),u=s(18),p=(s(120),s(20)),h=s(13),f=s.n(h),x=s(23),j=s(158),m=s(31),b=(s(122),s(3)),g=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={builds:[{selected:!0,disabled:!0,value:"Please select a build"}]},e}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=Object(x.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchData();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchData",value:function(){var e=Object(x.a)(f.a.mark((function e(){var t,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/builds");case 2:return t=e.sent,e.next=5,t.json();case 5:s=e.sent,this.setState({builds:[].concat(Object(p.a)(this.state.builds),Object(p.a)(s.builds))});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"selectBuild",value:function(e){this.props.selectedBuild(e.target.value)}},{key:"render",value:function(){var e=this;return Object(b.jsxs)(j.h,{id:"header",className:"header",children:[Object(b.jsx)(j.h.Group,{align:m.a.LEFT,children:Object(b.jsx)(j.h.Heading,{children:"Report"})}),Object(b.jsxs)(j.h.Group,{align:m.a.RIGHT,children:[Object(b.jsx)(j.e,{options:this.state.builds,onChange:function(t){return e.selectBuild(t)}}),Object(b.jsx)(j.h.Divider,{}),Object(b.jsx)(j.a,{className:"bp3-minimal",icon:"cog"})]})]})}}]),s}(r.Component),v=(s(148),s(45)),O=(s(149),s(2)),y=(s(150),function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).props={data:void 0,showZeroValues:!1},e.state={data:void 0},e}return Object(o.a)(s,[{key:"render",value:function(){var e,t=this,s=[];return null===(e=this.state.data)||void 0===e||e.forEach((function(e){if(0!==e.value||t.props.showZeroValues){var a=t.createSegment(e);s.push(a)}})),Object(b.jsx)("div",{className:"flex small-rounded",children:s})}},{key:"createSegment",value:function(e){return Object(b.jsx)("div",{className:"percentageBarSegment",style:{flexGrow:e.value,backgroundColor:e.colour},children:e.label})}},{key:"componentDidUpdate",value:function(){var e=Object(x.a)(f.a.mark((function e(t,s){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("percentage bar did update");case 1:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}()}],[{key:"getDerivedStateFromProps",value:function(e,t){return t.data!==e.data?{data:e.data}:null}}]),s}(n.a.Component));!function(e){e.green="#BECF6B",e.yellow="#FED478",e.red="#D57E7E"}(a||(a={}));var k={passed:a.green,skipped:a.yellow,failed:a.red,"failed skipped":a.yellow,"passed skipped":a.yellow},S=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).props={selectedBuild:void 0,selectedSpec:void 0},e.state={selectedBuild:void 0,data:void 0,treeNodeInfo:[],filter:"",percentageBarData:[{label:"",value:1,colour:a.green}]},e.handleNodeClick=function(t,s,a){var r=t.isSelected;a.shiftKey||e.forEachNode(e.state.treeNodeInfo,(function(e){return e.isSelected=!1})),t.isSelected=null==r||!r,e.setState(e.state),console.log(t.id),console.log(t.nodeData),e.props.selectedSpec(t.nodeData)},e.handleNodeCollapse=function(t){t.isExpanded=!1,e.setState(e.state)},e.handleNodeExpand=function(t){t.isExpanded=!0,e.setState(e.state)},e}return Object(o.a)(s,[{key:"render",value:function(){var e,t=this;return void 0!==this.state.treeNodeInfo&&(e=this.hasResults(),console.log("3")),0===this.state.treeNodeInfo.length&&(e=this.noSearchResults(),console.log("2")),void 0!==this.props.selectedBuild&&void 0!==this.state.data&&void 0!==this.state.treeNodeInfo||(e=this.noBuildSelected(),console.log("1")),Object(b.jsxs)("div",{id:"specTree",className:"flex flex-column grid-gap",children:[Object(b.jsx)(y,{data:this.state.percentageBarData}),Object(b.jsx)(j.g,{type:"text",leftIcon:"search",placeholder:"Filter..",onChange:function(e){return t.setState({filter:e.target.value})},rightElement:Object(b.jsx)(j.a,{icon:"chevron-right",minimal:!0})}),e]})}},{key:"forEachNode",value:function(e,t){if(null!=e){var s,a=Object(v.a)(e);try{for(a.s();!(s=a.n()).done;){var r=s.value;t(r),r.childNodes&&this.forEachNode(r.childNodes,t)}}catch(n){a.e(n)}finally{a.f()}}}},{key:"noBuildSelected",value:function(){return Object(b.jsx)(j.i,{className:"flex-grow",icon:"help",title:"Select a build",description:"Select a build from the dropdown to start viewing reports"})}},{key:"noSearchResults",value:function(){return Object(b.jsx)(j.i,{className:"flex-grow",icon:"search",title:"No specs found",description:"Please update your filters"})}},{key:"hasResults",value:function(){return Object(b.jsx)(j.l,{contents:this.state.treeNodeInfo,onNodeClick:this.handleNodeClick,onNodeCollapse:this.handleNodeCollapse,onNodeExpand:this.handleNodeExpand,className:O.a.ELEVATION_0})}},{key:"fetchData",value:function(){var e=Object(x.a)(f.a.mark((function e(t){var s,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/builds/".concat(t));case 2:return s=e.sent,e.next=5,s.json();case 5:a=e.sent,this.setState({data:a});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var e=Object(x.a)(f.a.mark((function e(t,s){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("did update"),this.state.selectedBuild===s.selectedBuild){e.next=4;break}return e.next=4,this.fetchData(this.props.selectedBuild);case 4:if(this.state.data===s.data&&(this.state.filter===s.filter||void 0===this.state.data)){e.next=9;break}return e.next=7,this.buildTreeNodeInfo();case 7:return e.next=9,this.createPercentageBarData();case 9:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()},{key:"createPercentageBarData",value:function(){var e=Object(x.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=[{label:this.state.data.passed,value:this.state.data.passed,colour:a.green},{label:this.state.data.skipped,value:this.state.data.skipped,colour:a.yellow},{label:this.state.data.failed,value:this.state.data.failed,colour:a.red}],this.setState({percentageBarData:t});case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"buildTreeNodeInfo",value:function(){var e=Object(x.a)(f.a.mark((function e(){var t,s,a,r,n,i,c,l,o,d;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("build tree"),t=this.state.data.testDir,s=[],a=this.state.data.results,r=Object(v.a)(a);try{for(r.s();!(n=r.n()).done;)i=n.value,c=i.capabilities.sessionId,l=i.specs[0].substring(i.specs[0].lastIndexOf(t)+t.length),o=l.split("/"),d=o.pop(),l.includes(this.state.filter)&&this.createTreeNodeInfo(c,o,d,i,s)}catch(u){r.e(u)}finally{r.f()}this.setState({treeNodeInfo:s});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createTreeNodeInfo",value:function(e,t,s,a,r){var n=this;t.forEach((function(e,t){var s=r.find((function(t){return t.label===e}));s||(s=n.appendTreeNodeInfo(r,"FOLDER",t,e,void 0));r=s.childNodes})),this.appendTreeNodeInfo(r,"SPEC",e,s,a)}},{key:"appendTreeNodeInfo",value:function(e,t,s,a,r){var n;switch(t){case"FOLDER":n={id:"".concat(s,"-").concat(a),icon:"folder-close",label:a,childNodes:[]};break;case"SPEC":n={id:s,icon:"document",label:a,secondaryLabel:this.renderTestDots(r.state.state),nodeData:r}}return e.push(n),e.sort(this.sortTreeNodeInfo()),n}},{key:"renderTestDots",value:function(e){return Object(b.jsxs)("div",{children:[" ",e.map((function(e){return Object(b.jsx)(j.f,{icon:"dot",color:k[e],style:{marginTop:"auto",marginBottom:"auto"}})}))]})}},{key:"sortTreeNodeInfo",value:function(){return function(e,t){return e.icon===t.icon?t.label<e.label?1:0:e.icon>t.icon?0:e.icon<t.icon?1:0}}}],[{key:"getDerivedStateFromProps",value:function(e,t){return t.selectedBuild!==e.selectedBuild?{selectedBuild:e.selectedBuild}:null}}]),s}(r.Component),N=(s(151),s(11)),w=s(66),T=s(21),D=s(67),B={chrome:T.b,edge:T.c,firefox:T.d,opera:T.f,safari:T.g},E={linux:T.e,"mac os x":T.a,windows:T.h},I=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).props={selectedSpec:void 0},e.state={overlayDisplayed:!1},e}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsx)("div",{id:"specView",className:"flex flex-grow flex-column",children:this.displayDetails()})}},{key:"displayDetails",value:function(){return void 0===this.props.selectedSpec?this.noSpecSelected():Object(b.jsxs)("div",{className:"flex flex-column",children:[this.renderDetail(j.c,this.props.selectedSpec.specs[0].split("/").pop(),{text:""}),Object(b.jsxs)("div",{className:"flex flex-row grid-gap",children:[Object(b.jsxs)("div",{className:"flex flex-column flex-grow",style:{flexBasis:"30rem"},children:[this.renderTags(),Object(b.jsxs)("div",{className:"flex flex-row grid-gap",children:[this.renderDetail(j.d,"Platform",{text:this.props.selectedSpec.capabilities.platformName},this.determineIcon(E,this.props.selectedSpec.capabilities.platformName,T.e)),this.renderDetail(j.d,"Browser",{text:this.props.selectedSpec.capabilities.browserName},this.determineIcon(B,this.props.selectedSpec.capabilities.browserName,T.b))]}),this.renderDetail(j.d,"Start Time",{text:this.props.selectedSpec.start}),this.renderDetail(j.d,"End Time",{text:this.props.selectedSpec.end}),this.renderDetail(j.d,"Total Time",{text:this.calculateTotalTime()}),this.renderDetail(j.d,"Session",{text:this.props.selectedSpec.capabilities.sessionId}),this.renderDetail(j.d,"Filepath",{text:this.props.selectedSpec.specs[0]})]}),Object(b.jsxs)("div",{className:"flex flex-column grid-gap",style:{flexBasis:"30rem",textAlign:"center"},children:[Object(b.jsx)(D.PieChart,{radius:50,animate:!0,lineWidth:25,style:{textAlign:"center",height:"15rem"},data:[{title:"Passed",value:parseInt(this.props.selectedSpec.state.passed),color:a.green},{title:"Skipped",value:parseInt(this.props.selectedSpec.state.skipped),color:a.yellow},{title:"Failed",value:parseInt(this.props.selectedSpec.state.failed),color:a.red}],label:function(e){var t=e.dataEntry;if("Passed"===t.title)return Math.round(t.percentage)+"%"},labelPosition:0}),Object(b.jsxs)("div",{className:"flex flex-row grid-gap",style:{justifyContent:"space-evenly"},children:[this.renderDetail(j.d,"Passed",{text:this.props.selectedSpec.state.passed,style:{marginLeft:"auto",marginRight:"auto"}}),this.renderDetail(j.d,"Skipped",{text:this.props.selectedSpec.state.skipped,style:{marginLeft:"auto",marginRight:"auto"}}),this.renderDetail(j.d,"Failed",{text:this.props.selectedSpec.state.failed,style:{marginLeft:"auto",marginRight:"auto"}})]})]})]}),(this.props.selectedSpec.description||this.props.selectedSpec.acceptanceCriteria)&&Object(b.jsxs)("div",{className:"flex flex-column grid-gap",children:[Object(b.jsx)(j.b,{}),this.props.selectedSpec.description&&this.renderDetail(j.c,"Description",{text:this.props.selectedSpec.description}),this.props.selectedSpec.acceptanceCriteria&&this.renderDetail(j.c,"Acceptance Criteria",{text:this.props.selectedSpec.acceptanceCriteria})]}),Object(b.jsxs)("div",{className:"flex flex-column",children:[Object(b.jsx)(j.b,{}),this.renderDetail(j.c,"Steps",{text:""}),this.renderSteps(this.props.selectedSpec.suites,0)]})]})}},{key:"determineIcon",value:function(e,t,s){return e[t]||s}},{key:"renderTags",value:function(){if(this.props.selectedSpec.tags)return Object(b.jsx)("div",{className:"flex flex-row grid-gap-half",style:{marginBottom:"1rem"},children:this.props.selectedSpec.tags.map((function(e){return Object(b.jsx)(j.k,{round:!0,children:e},e)}))})}},{key:"renderDetail",value:function(e,t,s,a){return Object(b.jsxs)("div",{className:"flex flex-column",children:[Object(b.jsx)(e,{children:t}),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[a&&Object(b.jsx)(w.a,{icon:a,size:"lg"}),Object(b.jsx)("p",{className:O.a.RUNNING_TEXT+" pre-wrap",style:s.style,children:s.text})]})]})}},{key:"renderSteps",value:function(e,t){var s=this;return console.log("recursive loop"),e.map((function(e){var a=[],r=[],n=[],i=[];return e.hooks&&e.hooks.length>0&&(n=s.filterAndReturnHookElements("before all",e.hooks,e,t+1),i=[].concat(Object(p.a)(i),Object(p.a)(n))),e.suites&&e.suites.length>0&&(r=s.renderSteps(e.suites,t+1),i=[].concat(Object(p.a)(i),Object(p.a)(r))),e.tests&&e.tests.length>0&&(a=e.tests.map((function(a){return[s.filterAndReturnHookElements("before each",e.hooks,a,t+1),s.generateTestElement(a,t+1),s.filterAndReturnHookElements("after each",e.hooks,a,t+1)]})),i=[].concat(Object(p.a)(i),Object(p.a)(a))),e.hooks&&e.hooks.length>0&&(n=s.filterAndReturnHookElements("after all",e.hooks,e,t+1),i=[].concat(Object(p.a)(i),Object(p.a)(n))),s.generateSuiteElement(e,i,t)}))}},{key:"filterAndReturnHookElements",value:function(e,t,s,a){var r=this;return t.filter((function(t){return t.type==e&&("*"===t.associatedTest&&t.associatedSuite===s.name||t.associatedTest===s.name)})).map((function(e){var t=e.steps.map((function(e){return r.generateStepElement(e,a+1)}));return r.generateHookElement(e,t,a)}))}},{key:"generateSuiteElement",value:function(e,t,s){return Object(b.jsxs)("div",{className:"flex flex-column suite",children:[this.renderDivider(e.state),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderTimeLine(e.state),this.renderIndents(s),Object(b.jsx)("span",{className:"heading-middle",style:{fontWeight:"bold"},children:e.name})]}),t,this.renderDivider(e.state)]})}},{key:"renderIcon",value:function(e){switch(e){case"passed":return Object(b.jsx)(j.f,{icon:"tick",color:k[e],style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"failed":return Object(b.jsx)(j.f,{icon:"cross",color:k[e],style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"skipped":return Object(b.jsx)(j.f,{icon:"double-chevron-right",color:k[e],style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"description":return Object(b.jsx)(j.f,{icon:"manually-entered-data",style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"expectation":return Object(b.jsx)(j.f,{icon:"search-template",style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"screenshot":return Object(b.jsx)(j.f,{icon:"media",style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"timer":return Object(b.jsx)(j.f,{icon:"stopwatch",style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});case"bug":return Object(b.jsx)(j.f,{icon:"console",color:k.failed,style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}});default:return Object(b.jsx)(j.f,{icon:"double-chevron-right",color:"#5c7080",style:{marginTop:"auto",marginBottom:"auto",paddingTop:"1px"}})}}},{key:"generateTestElement",value:function(e,t){var s=this,a=e.steps.map((function(e,a){return a>0?[s.renderNestedDivider(t+1),s.generateStepElement(e,t+1)]:s.generateStepElement(e,t+1)}));return Object(b.jsxs)("div",{className:"flex flex-column test",children:[this.renderDivider(e.state),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderTimeLine(e.state),this.renderIndents(t),this.renderIcon(e.state),Object(b.jsxs)("span",{style:{fontWeight:"bold"},className:"heading-middle flex flex-grow testname",children:[e.name," (",e.duration,"ms)"]})]}),a,this.renderDivider(e.state)]})}},{key:"generateStepElement",value:function(e,t){return Object(b.jsxs)("div",{className:"flex flex-column step",children:[this.renderDivider(e.state),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half step",children:[this.renderTimeLine(e.state),this.renderIndents(t),Object(b.jsxs)("div",{className:"flex flex-column flex-grow step",children:[Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderIcon("description"),Object(b.jsx)("span",{className:"heading-middle flex flex-grow",children:e.description})]}),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderIcon("expectation"),Object(b.jsx)("span",{className:"heading-middle flex flex-grow",children:e.expectation})]}),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderIcon(e.state),Object(b.jsx)("span",{className:"heading-middle flex flex-grow",children:e.actual})]})]}),e.error&&this.renderStackTrace(e.error),e.error&&Object(b.jsx)(j.b,{}),e.screenshotPath&&this.renderScreenshot(e.screenshotPath)]}),this.renderDivider(e.state)]})}},{key:"generateHookElement",value:function(e,t,s){return Object(b.jsxs)("div",{className:"flex flex-column hook",children:[this.renderDivider(e.state),Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[this.renderTimeLine(e.state),this.renderIndents(s),Object(b.jsx)("span",{className:"heading-middle",style:{fontWeight:"bold"},children:e.type})]}),t,this.renderDivider(e.state)]})}},{key:"renderIndents",value:function(e){return Array.from({length:e}).map((function(){return Object(b.jsx)("div",{className:"indent",style:{marginLeft:"1rem"}})}))}},{key:"renderTimeLine",value:function(e){var t=k[e]||a.green;return Object(b.jsx)("div",{style:{width:"0.3rem",height:"auto",backgroundColor:t}})}},{key:"renderDivider",value:function(e){var t=k[e]||a.green;return Object(b.jsx)("div",{style:{width:"0.3rem",height:"0.5rem",backgroundColor:t}})}},{key:"renderNestedDivider",value:function(e){return Object(b.jsxs)("div",{className:"flex flex-row grid-gap-half",children:[Object(b.jsx)("div",{style:{width:"3px",height:"auto"}}),this.renderIndents(e),Object(b.jsx)("div",{className:"flex-grow",style:{height:"1px",background:"rgba(16, 22, 26, 0.15)"}})]})}},{key:"renderStackTrace",value:function(e){return Object(b.jsx)(j.j,{className:"flex flex-row grid-gap-half step",position:N.a.LEFT,content:Object(b.jsxs)("div",{className:O.a.CARD+" pre-wrap flex flex-column",children:[Object(b.jsxs)(j.d,{children:["Error: ",e.name]}),Object(b.jsxs)("p",{children:["Message: ",e.message]}),Object(b.jsxs)("p",{children:["Expected: ",e.expected.toString()]}),Object(b.jsxs)("p",{children:["Actual: ",e.actual.toString()]}),Object(b.jsxs)("p",{children:["Operator: ",e.operator]}),Object(b.jsx)("p",{children:e.stack.toString()})]}),children:Object(b.jsx)(j.f,{icon:"console",className:"icon-calc-middle",color:k.failed,style:{paddingTop:"1px",cursor:"pointer"}})})}},{key:"renderScreenshot",value:function(e){return Object(b.jsx)("div",{className:"flex flex-row grid-gap-half step",onClick:function(){return window.open("http://localhost:8080/".concat(e),"_blank")},style:{cursor:"pointer"},children:this.renderIcon("screenshot")})}},{key:"noSpecSelected",value:function(){return Object(b.jsx)(j.i,{className:"tab",icon:"help",title:"Select a spec",description:"Select a spec from the menu to start viewing reports"})}},{key:"calculateTotalTime",value:function(){var e=Date.parse(this.props.selectedSpec.start),t=Date.parse(this.props.selectedSpec.end),s=parseInt(((t-e)/1e3).toFixed(0)),a=Math.floor(s/60),r=0;return a>59&&(a-=60*(r=Math.floor(a/60))),s=Math.floor(s%60),"".concat(r,"h ").concat(a,"m ").concat(s,"s")}}]),s}(r.Component),C=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={selectedSpec:void 0},e.selectedSpec=function(t){e.setState({selectedSpec:t})},e}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{id:"dashboard",className:"flex flex-grow flex-row",children:[Object(b.jsx)(S,{selectedBuild:this.props.selectedBuild,selectedSpec:this.selectedSpec}),Object(b.jsx)(I,{selectedSpec:this.state.selectedSpec})]})}}]),s}(n.a.Component),A=function(e){Object(d.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(l.a)(this,s);for(var a=arguments.length,r=new Array(a),n=0;n<a;n++)r[n]=arguments[n];return(e=t.call.apply(t,[this].concat(r))).state={selectedBuild:void 0},e.selectedBuild=function(t){e.setState({selectedBuild:t})},e}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{id:"app",className:"flex flex-column",children:[Object(b.jsx)(g,{selectedBuild:this.selectedBuild}),Object(b.jsx)(C,{selectedBuild:this.state.selectedBuild})]})}}]),s}(n.a.Component),P=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,159)).then((function(t){var s=t.getCLS,a=t.getFID,r=t.getFCP,n=t.getLCP,i=t.getTTFB;s(e),a(e),r(e),n(e),i(e)}))};s(154);c.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(A,{})}),document.getElementById("root")),P()}},[[155,1,2]]]);
//# sourceMappingURL=main.8f38e680.chunk.js.map