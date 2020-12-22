import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview'
const webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview'
const webviewMSLSIdentifier = 'merge-similarlayerstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

function MergeLayerStyles(styleToMerge, styleToKeep, basePercent, totalToMerge, webContents) {

  Helpers.clog("-- Starting Merge Layer Styles (" + styleToMerge.duplicates.length + ")");

  var stylesToRemove = [];
  var styleToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var stylesRemoved = 0;
  var idsMap = new Map();

  Helpers.clog("---- Processing styles to remove");
  styleToApply = styleToMerge.duplicates[styleToKeep].layerStyle;

  if (styleToMerge.duplicates[styleToKeep].isForeign) {
    var alreadyInDoc = (Helpers.document.sharedLayerStyles.filter(ls => ls.id == styleToMerge.duplicates[styleToKeep].layerStyle.id)).length > 0;
    if (!alreadyInDoc)
      styleToApply = Helpers.importLayerStyleFromLibrary(styleToMerge.duplicates[styleToKeep]);
  }

  var tasksToPerform = 0, tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0, overridesToChange = 0;
  var instOverMap = new Map();


  Helpers.clog("---- Getting all related styles instances and overrides");

  for (var i = 0; i < styleToMerge.duplicates.length; i++) {
    if (i != styleToKeep) {
      idsMap.set(styleToMerge.duplicates[i].layerStyle.id)
      stylesToRemove.push(styleToMerge.duplicates[i].layerStyle);

      var instancesOfStyle = Helpers.getLayerStyleInstances(styleToMerge.duplicates[i].layerStyle);
      var styleOverrides = Helpers.getLayerStyleOverrides(styleToMerge.duplicates[i].layerStyle, idsMap);

      instOverMap.set(styleToMerge.duplicates[i], {
        "instancesOfStyle": instancesOfStyle,
        "styleOverrides": styleOverrides
      });

      instancesToChange += instancesOfStyle.length;
      overridesToChange += styleOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;

  Helpers.ctime("Merging layer style:" + styleToMerge.name);
  webContents.executeJavaScript(`ShowMergeProgress()`).catch(console.error);

  for (var i = 0; i < styleToMerge.duplicates.length; i++) {
    if (i != styleToKeep) {
      if (!styleToMerge.duplicates[i].isForeign)
        stylesRemoved++;

      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfStyle = instOverMap.get(styleToMerge.duplicates[i]).instancesOfStyle;
      var styleOverrides = instOverMap.get(styleToMerge.duplicates[i]).styleOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");


      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");
      if (styleToMerge.duplicates[i].isForeign && (styleToMerge.duplicates[i].externalLibrary == null)) {
        styleToMerge.duplicates[i].layerStyle.unlinkFromLibrary();
      }
      Helpers.ctimeEnd("-- Unlinking from library");


      var message = "Merging " + styleToMerge.name;

      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + styleOverrides.length + ")");
      styleOverrides.forEach(function (override) {
        try {
          Helpers.clog("------ Updating override for " + override.instance.name);
          override.instance.setOverrideValue(override.override, styleToApply.id.toString());
          overridesChanged++;
          tasksExecuted++;
          progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.clog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");


      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfStyle.length + ")");
      instancesOfStyle.forEach(function (instance) {
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        }
        catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }

        instance.sharedStyle = styleToApply;
        instance.style.syncWithSharedStyle(styleToApply);

        tasksExecuted++;
        instancesChanged++;
        progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
      });

      Helpers.ctimeEnd("-- Updating instances");

    }
  }

  Helpers.ctimeEnd("Merging layer style:" + styleToMerge.name);
  Helpers.clog("---- Finalized instance and override replacement.");

  var sharedStylesToRemove = Helpers.document.sharedLayerStyles.filter(sharedStyle => isMarkedForRemove(sharedStyle, stylesToRemove));

  Helpers.clog("---- Removing discarded layer styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, "Removing discarded layer styles")`).catch(console.error);


  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(sharedStyleToRemove => {
    Helpers.clog("------ Removing " + sharedStyleToRemove.name + " (" + sharedStyleToRemove.id + ") from sharedLayerStyles.");
    sharedStyleToRemove.unlinkFromLibrary();
    Helpers.clog("-------- Unlinked from library.");
    var styleIndex = Helpers.document.sharedLayerStyles.findIndex(sL => sL.id == sharedStyleToRemove.id);
    Helpers.clog("-------- Located in sharedLayerStyles (" + styleIndex + ").");
    Helpers.document.sharedLayerStyles.splice(styleIndex, 1);
    Helpers.clog("-------- Removed from sharedLayerStyles.");
  });
  Helpers.ctimeEnd("Removing discarded styles");

  Helpers.clog("---- Merge completed.");

  return [stylesRemoved, instancesChanged, overridesChanged];

}

function isMarkedForRemove(sharedLayerStyle, stylesToRemove) {
  var redId1 = sharedLayerStyle.style.id;
  var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
  return (stylesToRemove.filter(str => (str.id == sharedLayerStyle.id) || (str.id == redId1) || (str.id == redId2)).length > 0);
}


export function MergeSimilarLayerStyles(context) {

  Helpers.clog("----- Merge similar layer styles -----");

  const options = {
    identifier: webviewMSLSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var stylesWithSimilarStyles;
  Helpers.clog("Loading webview");
  browserWindow.loadURL(require('../resources/mergesimilarlayerstyles.html'));


  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`UpdateSettings(${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMSLSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedStylesWithSimilarStyles) => {
    Helpers.clog("Execute merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];
    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        currentSelectedStyles = [];
        for (var j = 0; j < editedStylesWithSimilarStyles[i].similarStyles.length; j++) {
          currentSelectedStyles.push(stylesWithSimilarStyles[i].similarStyles[j]);
          mergedStyles++;
        }

        var results = MergeLayerStyles(context, editedStylesWithSimilarStyles[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSLSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    }

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread) => {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread);
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

}

export function MergeDuplicateLayerStyles(context) {

  Helpers.clog("----- Merge duplicate layer styles -----");

  const options = {
    identifier: webviewMDLSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var onlyDuplicatedLayerStyles, layerStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();

  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedLayerStyles.length > 0) {
    browserWindow.loadURL(require('../resources/mergeduplicatelayerstyles.html'));
  }
  else {
    UI.message("Looks like there are no layer styles with the same name.");
    onShutdown(webviewMDLSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate layer styles. Including libraries:" + includeLibraries);
    onlyDuplicatedLayerStyles = Helpers.getAllDuplicateLayerStylesByName(context, includeLibraries);

    layerStylesMap = Helpers.getLayerStylesMap(context, onlyDuplicatedLayerStyles);

    if (onlyDuplicatedLayerStyles.length > 0) {
      Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[0], layerStylesMap);
      mergeSession = [];
      onlyDuplicatedLayerStyles.forEach(duplicate => {
        var reducedStyle = Helpers.getReducedLayerStyleData(duplicate);
        mergeSessionMap.set(reducedStyle, duplicate);
        mergeSession.push({
          "layerStyleWithDuplicates": reducedStyle,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": (mergeSession.length == 0)
        });
      });
    }
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)}, ${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMDLSIdentifier);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[index], layerStylesMap);
    var stringify = JSON.stringify(Helpers.getReducedLayerStyleData(onlyDuplicatedLayerStyles[index]))
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");

    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var mergeResults = [0, 0, 0];


    var totalToMerge = editedMergeSession.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        Helpers.clog("-- Merging " + mergeSession[i].layerStyleWithDuplicates.name);
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        var mergeobject = mergeSessionMap.get(mergeSession[i].layerStyleWithDuplicates);
        var basePercent = (duplicatesSolved * 100 / editedMergeSession.length);

        var localMergeResults = MergeLayerStyles(mergeobject, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        // webContents.executeJavaScript(`ShowMergeProgress()`).catch(console.error);
        // webContents.executeJavaScript(`UpdateMergeProgress(${basePercent}, "Woooo", "Wuuuuu")`).catch(console.error);

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDLSIdentifier);
    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2])
        replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
      else if (mergeResults[1] > 0)
        replacedStuff = " and replaced " + mergeResults[1] + " instances.";
      else if (mergeResults[2] > 0)
        replacedStuff = " and updated " + mergeResults[2] + " overrides.";
      else
        replacedStuff = ".";


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }

  });
};

export function MergeSelectedLayerStyles(context) {

  Helpers.clog("----- Merge selected text styles -----");

  const options = {
    identifier: webviewMLSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var allLayerStyles;
  var styleCounter = 0;

  Helpers.clog("Get layer styles list. Libraries included:" + Helpers.getLibrariesEnabled());
  allLayerStyles = Helpers.getAllLayerStyles(Helpers.getLibrariesEnabled());
  styleCounter = allLayerStyles.length;
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();


  if (styleCounter > 1) {
    browserWindow.loadURL(require('../resources/mergelayerstylesfromlist.html'));
  }
  else {
    if (styleCounter == 1)
      UI.message("There's only 1 layer style. No need to merge.");
    else
      UI.message("Looks like there are no layer styles.");

    onShutdown(webviewMLSFLIdentifier);
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  console.log("allLayerStyles.length:" + styleCounter)

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allLayerStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetStylesList', (librariesEnabled) => {
    Helpers.clog("Get local styles list");
    if (allLayerStyles == null)
      allLayerStyles = Helpers.getAllLayerStyles(librariesEnabled);

    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allLayerStyles)})`).catch(console.error);
  });


  webContents.on('Cancel', () => {
    onShutdown(webviewMLSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalLayerStyles) => {
    Helpers.clog("Executing Merge");
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;
    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedLayerStyles.length; i++) {
        definedLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedLayerStyles[i]);
          counter++;
        }
      }
    }
    else {
      for (var i = 0; i < definedAllLayerStyles.length; i++) {
        definedAllLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedAllLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllLayerStyles[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeLayerStyles(context, selectedIndex);

    Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");

    onShutdown(webviewMLSFLIdentifier);
  });
};

