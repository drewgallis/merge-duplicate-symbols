!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var a=0,o=!1,s=0,l=0,i=1;window.LaunchMerge=function(e,t){s=e,l=t,"loading"==document.readyState?document.addEventListener("DOMContentLoaded",GetSymbols):GetSymbols()},window.GetSymbols=function(){window.postMessage("nativeLog","WV - Get symbols"),setTimeout((function(){var e="We're looking for duplicates...";s>100&&(e="We're looking for duplicates...<br/><br/>Wow, you have "+s+" symbols here (and "+l+" in linked libraries)! 🙈<br/> This may take a while... Wanna go get a coffee?"),window.ShowProgress(e),window.postMessage("RecalculateDuplicates",document.getElementById("chkIncludeLibraries").checked)}),200)},window.DrawDuplicateSymbols=function(e){window.postMessage("nativeLog","WV - Drawing duplicate symbols list"),window.HideProgress(),a>=(n=e).length&&(a=0);var t=document.getElementById("lstDuplicateSymbols"),o=document.getElementById("btnMerge"),s="",l=0;if(n.length>0){for(var i=0;i<n.length;i++){var c=n[i].selectedIndex>=0,d=c?'for="duplicatedSymbolCheck'.concat(i,'"'):"",r=c&&!n[i].isUnchecked?"checked":"",m=c?'onclick="onSelectedSymbolCheckChanged('.concat(i,')"'):"",u=i==a?"selected":"";c&&!n[i].isUnchecked&&l++;var g='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(r,' id="duplicatedSymbolCheck').concat(i,'" ').concat(m,"/>\n      <label ").concat(d,"></label>\n      <span>").concat(e[i].symbolWithDuplicates.name,"</span>\n    </div>");s+='<div id="duplicatedSymbol'.concat(i,'" onclick="onSelectedSymbolChanged(').concat(i,')" class="leftPanelListItem alignVerticalCenter ').concat(u,'">').concat(g," </div>")}window.postMessage("nativeLog","WV - Drawing left panel symbol list"),t.innerHTML=s,o.disabled=0==l,document.getElementById("lblIncludeLibraries").innerHTML=0!=l?"Include all enabled libraries symbols (you may lose the current selection)":"Include all enabled libraries symbols",DrawSymbolList(a),ShowLayout()}else HideLayout()},window.ShowLayout=function(e){window.postMessage("nativeLog","WV - Show layout"),document.getElementById("resultsPanel").className="colAuto leftPanel",document.getElementById("btnCancel").className="btnSecondary",document.getElementById("btnMerge").className="btnPrimary",document.getElementById("chkLibraries").className="roundCheckbox",document.getElementById("btnOK").className="notDisplayed"},window.HideLayout=function(e){window.postMessage("nativeLog","WV - Hide layout"),document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("resultsPanel").className="colAuto leftPanel collapsed",document.getElementById("btnCancel").className="notDisplayed",document.getElementById("btnMerge").className="notDisplayed",document.getElementById("chkLibraries").className="notDisplayed",document.getElementById("btnOK").className="btnPrimary"},window.onSelectedSymbolCheckChanged=function(e){window.postMessage("nativeLog","WV - Include symbol changed"),n[e].isUnchecked=!n[e].isUnchecked,DrawDuplicateSymbols(n),DrawSymbolList(a)},window.onSelectedSymbolChanged=function(e){if(window.postMessage("nativeLog","WV - Left panel list selected symbol changed"),!o){for(var t=0;t<n.length;t++){document.getElementById("duplicatedSymbol"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("duplicatedSymbol"+e).className="leftPanelListItem alignVerticalCenter selected",n[e].isProcessed?DrawSymbolList(e):(o=!0,window.postMessage("GetSelectedSymbolData",e),document.getElementById("listOfSymbols").className="movingYFadeInitialState workZone movingYFadeOut"+(0==i?" cardsView":""),document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",window.ShowProgress(""))}},window.ShowProgress=function(e){window.postMessage("nativeLog","WV - Show progress"),document.getElementById("progressLayer").className="progressCircle offDownCenter fadeIn",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfSymbols").className="movingYFadeInitialState movingYFadeOut"+(0==i?" cardsView":"")},window.HideProgress=function(){window.postMessage("nativeLog","WV - Hide progress"),document.getElementById("progressLayer").className="progressCircle offDownCenter fadeOut"},window.ReDrawAfterGettingData=function(e,t){window.postMessage("nativeLog","WV - Redraw after getting symbol data"),n[t].isProcessed=!0,o=!1;for(var a=0;a<n[t].symbolWithDuplicates.duplicates.length;a++)n[t].symbolWithDuplicates.duplicates[a].thumbnail=e.duplicates[a].thumbnail,n[t].symbolWithDuplicates.duplicates[a].symbolInstances=e.duplicates[a].symbolInstances,n[t].symbolWithDuplicates.duplicates[a].numInstances=e.duplicates[a].numInstances,n[t].symbolWithDuplicates.duplicates[a].symbolOverrides=e.duplicates[a].symbolOverrides,n[t].symbolWithDuplicates.duplicates[a].numOverrides=e.duplicates[a].numOverrides;window.HideProgress(100),DrawSymbolList(t),document.getElementById("listOfSymbols").className="movingYFadeInitialState workZone movingYFadeIn"+(0==i?" cardsView":""),document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn"},window.onSymbolClicked=function(e,t){window.postMessage("nativeLog","WV - Symbol clicked. Updating selection status.");for(var a=0;a<n[t].symbolWithDuplicates.duplicates.length;a++){document.getElementById("duplicateItemCheck"+a).checked=!1,document.getElementById("duplicateItem"+a).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].isUnchecked=!1,n[t].selectedIndex=e,DrawDuplicateSymbols(n)},window.DrawSymbolList=function(e){window.postMessage("nativeLog","WV - Drawing symbols"),a=e;for(var t="",o=0;o<n[e].symbolWithDuplicates.duplicates.length;o++){window.postMessage("nativeLog","WV --- Drawing symbol: "+n[e].symbolWithDuplicates.duplicates[o].name);var s=n[e].selectedIndex==o,l=s?"selected":"",c='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(s?"checked":"",' id="duplicateItemCheck').concat(o,'"/>\n      <label></label>\n    </div>');t+='<div id="duplicateItem'.concat(o,'" class="thumbnailContainer symbolPreview  alignVerticalCenter ').concat(l,'" onclick="onSymbolClicked(').concat(o,", ").concat(e,')">\n                ').concat(c,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(o,'" >\n                  <div class="rowAvailable thumbnail" style=\'background-image:url("').concat(n[e].symbolWithDuplicates.duplicates[o].thumbnail,'")\'></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].symbolWithDuplicates.duplicates[o].numInstances," instances - Used in ").concat(n[e].symbolWithDuplicates.duplicates[o].numOverrides,' overrides</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].symbolWithDuplicates.duplicates[o].libraryName,"</span></div>\n                </div>\n              </div>")}var d=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");d.innerHTML=n[e].symbolWithDuplicates.name,r.innerHTML="There are "+n[e].symbolWithDuplicates.duplicates.length+" symbols with this name. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.",document.getElementById("viewSelector").classList.remove("notDisplayed");var m=document.getElementById("listOfSymbols");m.innerHTML=t,m.className="movingYFadeInitialState workZone movingYFadeIn"+(0==i?" cardsView":""),window.postMessage("nativeLog","WV - Completed drawing symbols")},document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Include libraries check changed"),window.ShowProgress(""),window.postMessage("RecalculateDuplicates",document.getElementById("chkIncludeLibraries").checked)})),window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Cancel"),cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Execute merge"),window.postMessage("ExecuteMerge",n)})),document.getElementById("btnOK").addEventListener("click",(function(){window.postMessage("nativeLog","WV - OK-Close"),cancelAssignation()})),document.getElementById("btnCardView").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Changed to cards view"),i=0,document.getElementById("listOfSymbols").classList.add("cardsView"),document.getElementById("btnListView").classList.remove("selected"),document.getElementById("btnCardView").classList.add("selected")})),document.getElementById("btnListView").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Change to list view"),i=1,document.getElementById("listOfSymbols").classList.remove("cardsView"),document.getElementById("btnCardView").classList.remove("selected"),document.getElementById("btnListView").classList.add("selected")}))}]);