!function(e){var t={};function n(l){if(t[l])return t[l].exports;var c=t[l]={i:l,l:!1,exports:{}};return e[l].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(l,c,function(t){return e[t]}.bind(null,c));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n,l=0,c=2;window.DrawResultsList=function(e){if(n=e,c>0?(document.getElementById("filtersAppliedNum").innerHTML=c,document.getElementById("filterCounter").className="filterCounter"):document.getElementById("filterCounter").className="notDisplayed",n.length>0){for(var t=document.getElementById("lstResultingStyles"),a=document.getElementById("btnMerge"),i="",o=0,d=0;d<n.length;d++){var r=n[d].selectedIndex>=0,s=r?'for="resultStyleCheck'.concat(d,'"'):"",m=r&&!n[d].isUnchecked?"checked":"",u=r?'onclick="onSelectedStyleCheckChanged('.concat(d,')"'):"",y=d==l?"selected":"";r&&!n[d].isUnchecked&&o++;var g='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(m,' id="resultStyleCheck').concat(d,'" ').concat(u,"/>\n      <label ").concat(s,"></label>\n      <span>").concat(n[d].referenceStyle.name,"</span>\n    </div>");i+='<div id="resultStyle'.concat(d,'" onclick="onSelectedStyleChanged(').concat(d,')" class="leftPanelListItem alignVerticalCenter ').concat(y,'">').concat(g," </div>")}document.getElementById("resultsPanel").className="colAuto leftPanel",t.innerHTML=i,a.disabled=0==o,document.getElementById("lblIncludeLibraries").innerHTML=0!=o?"Include all enabled libraries text styles (you may lose the current selection)":"Include all enabled libraries text styles",DrawStyleList(l)}else document.getElementById("resultsPanel").className="colAuto leftPanel collapsed",document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState workZone movingYFadeOut",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",document.getElementById("emptyStateMessage").innerHTML="We couldn't find any styles that share the selected set of attributes.",document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("resultsTitle").innerHTML="",document.getElementById("resultsDescription").innerHTML=""},window.onSelectedStyleCheckChanged=function(e){n[e].isUnchecked=!n[e].isUnchecked,DrawStylesList(n),DrawStyleList(l)},window.onSelectedStyleChanged=function(e){for(var t=0;t<n.length;t++){document.getElementById("resultStyle"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("resultStyle"+e).className="leftPanelListItem alignVerticalCenter selected",DrawStyleList(e)},window.onStyleClicked=function(e,t){for(var l=0;l<n[t].similarStyles.length;l++){document.getElementById("duplicateItemCheck"+l).checked=!1,document.getElementById("duplicateItem"+l).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].selectedIndex=e,DrawResultsList(n)},window.DrawStyleList=function(e){l=e;for(var t="",c=0;c<n[e].similarStyles.length;c++){var a=n[e].selectedIndex==c,i=a?"selected":"",o='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(a?"checked":"",' id="duplicateItemCheck').concat(c,'"/>\n      <label></label>\n    </div>'),d=n[e].similarStyles[c].contrastMode?"bgContrastMode":"";t+='<div id="duplicateItem'.concat(c,'" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ').concat(i,'" onclick="onStyleClicked(').concat(c,", ").concat(e,')">\n                ').concat(o,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(c,'" >\n                  <div class="rowAvailable padded ').concat(d,'"><div class="thumbnail" style=\'background-image:url("').concat(n[e].similarStyles[c].thumbnail,'")\'></div></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[c].name," (").concat(n[e].similarStyles[c].libraryName,')</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[c].description,"</span></div>\n                </div>\n              </div>")}var r=document.getElementById("resultsTitle"),s=document.getElementById("resultsDescription");r.innerHTML=n[e].referenceStyle.name,s.innerHTML="There are "+n[e].similarStyles.length+" styles with this same attributes. The style you decide to keep will be applied to all text layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.",document.getElementById("emptyState").className="emptyState fadeOut",document.getElementById("listOfStyles").innerHTML=t,document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn",listOfStyles.className="scrollable movingYFadeInitialState workZone movingYFadeIn"},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("ExecuteMerge",n)})),document.getElementById("filterHeader").addEventListener("click",(function(){onFilterExpanderClicked()})),document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){onFilterChanged()})),document.getElementById("btnFindMatchingStyles").addEventListener("click",(function(){onFilterChanged()})),document.getElementById("btnEmptyState").addEventListener("click",(function(){onFilterChanged()})),window.onFilterChanged=function(){var e=document.getElementById("chkIncludeLibraries").checked,t=document.getElementById("checkSameFont").checked,n=document.getElementById("checkSameWeight").checked,l=document.getElementById("checkSameSize").checked,a=document.getElementById("checkSameColor").checked,i=document.getElementById("checkSameParagraphSpacing").checked,o=document.getElementById("checkSameLineHeight").checked,d=document.getElementById("checkSameAlignment").checked,r=document.getElementById("checkSameCharacterSpacing").checked;window.postMessage("RecalculateStyles",e,t,n,l,a,i,o,d,r),c=0,c+=t?1:0,c+=n?1:0,c+=l?1:0,c+=a?1:0,c+=i?1:0,c+=o?1:0,c+=d?1:0,c+=r?1:0},window.onFilterExpanderClicked=function(){var e=document.getElementById("filterArea");e.className.toString().indexOf("collapsed")>=0?e.className="colAuto filterArea verticalLayout":e.className="colAuto filterArea verticalLayout collapsed"}}]);