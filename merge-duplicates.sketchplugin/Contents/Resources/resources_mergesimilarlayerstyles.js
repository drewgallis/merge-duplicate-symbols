!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var l=0,a=2;window.DrawResultsList=function(e){if(window.postMessage("nativeLog","WV - Drawing results list"),n=e,a>0?(document.getElementById("filtersAppliedNum").innerHTML=a,document.getElementById("filterCounter").className="filterCounter"):document.getElementById("filterCounter").className="notDisplayed",n.length>0){for(var t=document.getElementById("lstResultingStyles"),i=document.getElementById("btnMerge"),c="",o=0,s=0;s<n.length;s++){var d=n[s].selectedIndex>=0,r=d?'for="resultStyleCheck'.concat(s,'"'):"",m=d&&!n[s].isUnchecked?"checked":"",u=d?'onclick="onSelectedStyleCheckChanged('.concat(s,')"'):"",y=s==l?"selected":"";d&&!n[s].isUnchecked&&o++;var g='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(m,' id="resultStyleCheck').concat(s,'" ').concat(u,"/>\n      <label ").concat(r,"></label>\n      <span>").concat(n[s].referenceStyle.name,"</span>\n    </div>");c+='<div id="resultStyle'.concat(s,'" onclick="onSelectedStyleChanged(').concat(s,')" class="leftPanelListItem alignVerticalCenter ').concat(y,'">').concat(g," </div>")}document.getElementById("resultsPanel").className="colAuto leftPanel",window.postMessage("nativeLog","WV - Drawing left panel style list"),t.innerHTML=c,i.disabled=0==o,document.getElementById("lblIncludeLibraries").innerHTML=0!=o?"Include all enabled libraries layer styles (you may lose the current selection)":"Include all enabled libraries layer styles",DrawStyleList(l)}else window.postMessage("nativeLog","WV - No similar styles. Drawing empty state."),document.getElementById("resultsPanel").className="colAuto leftPanel collapsed",document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState workZone movingYFadeOut",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",document.getElementById("emptyStateMessage").innerHTML="We couldn't find any styles that share the selected set of attributes.",document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("resultsTitle").innerHTML="",document.getElementById("resultsDescription").innerHTML=""},window.onSelectedStyleCheckChanged=function(e){window.postMessage("nativeLog","WV - Include style changed"),n[e].isUnchecked=!n[e].isUnchecked,DrawStylesList(n),DrawStyleList(l)},window.onSelectedStyleChanged=function(e){window.postMessage("nativeLog","WV - Left panel list selected style changed.");for(var t=0;t<n.length;t++){document.getElementById("resultStyle"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("resultStyle"+e).className="leftPanelListItem alignVerticalCenter selected",DrawStyleList(e)},window.onStyleClicked=function(e,t){window.postMessage("nativeLog","WV - Style clicked. Updating selection status.");for(var l=0;l<n[t].similarStyles.length;l++){document.getElementById("duplicateItemCheck"+l).checked=!1,document.getElementById("duplicateItem"+l).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].selectedIndex=e,DrawResultsList(n)},window.DrawStyleList=function(e){window.postMessage("nativeLog","WV - Drawing styles"),l=e;for(var t="",a=0;a<n[e].similarStyles.length;a++){window.postMessage("nativeLog","WV --- Drawing style: "+n[e].similarStyles[a].name);var i=n[e].selectedIndex==a,c=i?"selected":"",o='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(i?"checked":"",' id="duplicateItemCheck').concat(a,'"/>\n      <label></label>\n    </div>'),s=n[e].similarStyles[a].contrastMode?"bgContrastMode":"";t+='<div id="duplicateItem'.concat(a,'" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ').concat(c,'" onclick="onStyleClicked(').concat(a,", ").concat(e,')">\n                ').concat(o,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(a,'" >\n                  <div class="rowAvailable padded ').concat(s,'"><div class="thumbnail" style=\'background-image:url("').concat(n[e].similarStyles[a].thumbnail,'")\'></div></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[a].name," (").concat(n[e].similarStyles[a].libraryName,')</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[a].description,"</span></div>\n                </div>\n              </div>")}var d=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");d.innerHTML=n[e].referenceStyle.name,r.innerHTML="There are "+n[e].similarStyles.length+" styles with this same attributes. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.",document.getElementById("emptyState").className="emptyState fadeOut",document.getElementById("listOfStyles").innerHTML=t,document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn",document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState workZone movingYFadeIn",window.postMessage("nativeLog","WV - Completed drawing styles")},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Cancel"),cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Execute merge"),window.postMessage("ExecuteMerge",n)})),document.getElementById("filterHeader").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Show/hide filters"),onFilterExpanderClicked()})),document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Include libraries check changed"),onFilterChanged()})),document.getElementById("btnFindMatchingStyles").addEventListener("click",(function(){onFilterChanged()})),document.getElementById("btnEmptyState").addEventListener("click",(function(){onFilterChanged()})),window.onFilterChanged=function(){window.postMessage("nativeLog","WV - Find matching styles");var e=document.getElementById("chkIncludeLibraries").checked,t=document.getElementById("checkSameFillColor").checked,n=document.getElementById("checkSameBorderColor").checked,l=document.getElementById("checkSameBorderThickness").checked,i=document.getElementById("checkSameShadowColor").checked,c=document.getElementById("checkSameShadowXYBlurSpread").checked;window.postMessage("RecalculateStyles",e,t,n,l,i,c),a=0,a+=t?1:0,a+=n?1:0,a+=l?1:0,a+=i?1:0,a+=c?1:0},window.onFilterExpanderClicked=function(){var e=document.getElementById("filterArea");e.className.toString().indexOf("collapsed")>=0?e.className="colAuto filterArea verticalLayout":e.className="colAuto filterArea verticalLayout collapsed"}}]);