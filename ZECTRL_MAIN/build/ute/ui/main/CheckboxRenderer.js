sap.ui.define([],function(){"use strict";var a={};return a.render=function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("uteMChkBox"),b.getDesign()!==ute.ui.main.CheckboxDesign.None&&a.addClass("uteMChkBox-design-"+b.getDesign().toLowerCase()),a.writeClasses(),a.write(">"),a.write('<input type="checkbox"'),a.writeAttribute("id",b.getId()+"-intChk"),b.getChecked()&&a.writeAttribute("checked","checked"),b.getEnabled()||a.writeAttribute("disabled","disabled"),a.addClass("uteMChkBox-intChk"),a.writeClasses(),a.write("/>"),a.write("<label"),a.writeAttribute("id",b.getId()+"-extChk"),a.writeAttribute("for",b.getId()+"-intChk"),a.addClass("uteMChkBox-chk"),a.writeClasses(),a.write(">"),a.write("</label>"),a.write("</div>")},a},!0);