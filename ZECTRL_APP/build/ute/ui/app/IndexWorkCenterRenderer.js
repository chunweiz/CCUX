sap.ui.define([],function(){"use strict";var a={};return a.render=function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("uteAppIdxWC"),a.writeClasses(),a.write(">"),this._renderLeftContent(a,b),this._renderRightContent(a,b),a.write("</div>")},a._renderLeftContent=function(a,b){a.write("<div"),a.addClass("uteAppIdxWc-leftCnt"),a.writeClasses(),a.write(">"),b.getLeftContent().forEach(function(b){a.renderControl(b)},this),a.write("</div>")},a._renderRightContent=function(a,b){a.write("<div"),a.addClass("uteAppIdxWc-rightCnt"),a.writeClasses(),a.write(">"),b.getRightContent().forEach(function(b){a.renderControl(b)},this),a.write("</div>")},a},!0);