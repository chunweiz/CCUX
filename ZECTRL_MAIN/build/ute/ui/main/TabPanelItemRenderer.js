sap.ui.define([],function(){"use strict";var a={};return a.render=function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("uteMTabPanelItem"),b.getDesign()!==ute.ui.main.TabPanelItem.None&&a.addClass("uteMTabPanelItem-design-"+b.getDesign().toLowerCase()),b.getHidden()&&a.addClass("uteMTabPanelItem-hidden"),a.writeClasses(),a.write(">"),this._renderContent(a,b),a.write("</div>")},a._renderContent=function(a,b){var c=b.getContent()||[];c.forEach(function(b){a.write("<div"),a.addClass("uteMTabPanelItem-content"),a.writeClasses(),a.write(">"),a.renderControl(b),a.write("</div>")})},a},!0);