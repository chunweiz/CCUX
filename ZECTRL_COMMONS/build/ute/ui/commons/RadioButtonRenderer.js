sap.ui.define(["jquery.sap.global","sap/ui/core/ValueStateSupport"],function(){"use strict";var a={};return a.render=function(a,b){a.write("<span"),a.addClass("uteRadioBtn"),a.writeClasses(),a.write(">"),a.write('<Input type="radio" name="'+b.getGroupName()+'"'),a.writeControlData(b),a.writeAttribute("id",b.getId()),a.addClass(b.getBRegular()?"uteRadioBtn-regular":"uteRadioBtn-solid"),a.writeClasses(),a.write(">"),a.write("<label"),a.writeAttribute("for",b.getId()),a.write(">"),a.write("</label>"),b.getText()&&a.write("<text>"+b.getText()+"</text>"),a.write("</span>")},a.setSelected=function(){},a},!0);