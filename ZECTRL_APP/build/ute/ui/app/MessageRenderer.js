sap.ui.define(["sap/ui/core/Icon"],function(){"use strict";var a={};return a.render=function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("uteAppMsg"),b.getDesign()!==ute.ui.app.MessageDesign.None&&a.addClass("uteAppMsg-design-"+b.getDesign().toLowerCase()),a.writeClasses(),a.write(">"),this._renderText(a,b),a.write("</div>")},a._renderIcon=function(a,b){a.write("<span"),a.addClass("uteAppMsg-icon"),a.writeClasses(),a.write(">"),a.writeIcon(b.getIcon()),a.write("</span>")},a._renderText=function(a,b){a.write("<span"),a.addClass("uteAppMsg-text"),a.writeClasses(),a.write(">"),b.getText()&&a.writeEscaped(b.getText()),a.write("</span>")},a},!0);