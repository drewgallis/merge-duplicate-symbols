var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){e.exports={documentation:function(){NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.mergeduplicates.com/"))},report_issue:function(){NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://github.com/oodesign/merge-duplicate-symbols/issues"))}}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(o){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw o;process.emit("uncaughtException",o,"uncaughtException")}}globalThis.documentation=__skpm_run.bind(this,"documentation"),globalThis.onShutdown=__skpm_run.bind(this,"onShutdown"),globalThis.onRun=__skpm_run.bind(this,"default"),globalThis.report_issue=__skpm_run.bind(this,"report_issue"),globalThis.onShutdown=__skpm_run.bind(this,"onShutdown");