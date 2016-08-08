sap.ui.define(["jquery.sap.global"],function(){"use strict";var a={};return a.render=function(a,b){var c,d,e,f,g=ute.ui.commons.Dialog._isSizeSet(b.getHeight()),h=ute.ui.commons.Dialog._isSizeSet(b.getWidth()),i=sap.ui.getCore().getLibraryResourceBundle("ute.ui.commons"),j=b.getButtons();for(a.write("<div"),a.writeControlData(b),a.addClass("uteDialog"),a.addStyle("width",b.getWidth()),a.addStyle("height",b.getHeight()),a.addStyle("min-width",b.getMinWidth()),a.addStyle("min-height",b.getMinHeight()),a.addStyle("max-width",b.getMaxWidth()),a.addStyle("max-height",b.getMaxHeight()),a.addStyle("display","none"),g||a.addClass("sapUiDlgFlexHeight"),h||a.addClass("sapUiDlgFlexWidth"),0===c&&a.addClass("sapUiDlgNoButtons"),b.getApplyContentPadding()||a.addClass("sapUiDlgNoPad"),a.writeClasses(),a.writeStyles(),a.writeAttribute("aria-labelledby",b.getId()+"-lbl "+b.getId()+"-acc"),a.writeAttribute("role",b.getAccessibleRole().toLowerCase()),a.writeAttribute("tabindex","-1"),a.write("><span style='display:none;' id='",b.getId(),"-acc'>",i.getText("To close dialog, press ESC"),"</span>"),a.write("<span id='"+b.getId()+"-fhfe' tabIndex='0'></span><div id='"+b.getId()+"-hdr' class='sapUiDlgHdr uteDialogHdr'>"),a.write("<span class='sapUiDlgHdrLeft uteDialogHdrLeft' id='"+b.getId()+"-hdrL'>"),e=b.getTitle(),a.write("<span id='"+b.getId()+"-lbl' class='sapUiDlgLabel'"),a.writeAttribute("role","heading"),a.writeAttribute("aria-level","1"),e&&a.writeAttributeEscaped("title",e),a.write(">"),e?a.writeEscaped(e):a.write("&nbsp;"),a.write("</span></span>"),a.write("<span id='",b.getId(),"-hdrR' class='sapUiDlgHdrBtns uteUiDlgHdrBtn'>"),b.getShowCloseButton()&&(a.write("<a id='",b.getId(),"-close' class='sapUiDlgCloseBtn' href='javascript:void(0)'"),a.write(" tabIndex='-1'"),a.writeAttribute("role","button"),a.writeAttributeEscaped("aria-label",i.getText("To close dialog, press ESC")),a.writeAttributeEscaped("title",i.getText("Close")),a.write(">X</a>")),a.write("</span></div>"),a.write('<div class="uteUiDlgHdrSep sapUiDlgHdrSep"></div>'),a.write("<div class='sapUiDlgCont uteUiDlgCont' id='",b.getId(),'-cont\' tabindex="-1">'),f=b.getContent(),d=0;d<f.length;d+=1)a.renderControl(f[d]);for(a.write("</div>"),a.write("<div id='"),a.write(b.getId()),a.write("-footer' class='sapUiDlgFooter uteUiDlgFooter'>"),a.write("<div class='sapUiDlgBtns'>"),d=0;c>d;d+=1)a.renderControl(j[d]);a.write("</div><div class='sapUiDlgWave'></div></div>"),b.getResizable()&&(a.write("<span id='"),a.write(b.getId()),a.write("-grip' class='sapUiDlgGrip'>&#916;</span>"))},a},!0);