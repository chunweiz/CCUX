sap.ui.define(["jquery.sap.global"],function(){"use strict";var a={},b=!1;return a.render=function(a,c){switch(a.write("<tr"),a.writeControlData(c),c.getParent().getTableType()){case"InvoiceTable":a.addClass("uteTb-row-invoice");break;case"DppTable":a.addClass("uteTb-row-dpp");break;case"DppDeniedTable":a.addClass("uteTb-row-dpp"),a.addClass("uteTb-row-dpp-denied");break;case"CampaignTable":a.addClass("uteTb-row-campaign"),b=!1}a.writeClasses(),a.write(">"),c.getCells().forEach(function(b){a.write("<td>"),a.renderControl(b),a.write("</td>")}),a.write("</tr>"),b&&(a.write("<tr"),a.addClass("uteTb-row-campaign"),a.writeClasses(),a.write(">"),c.getCells().forEach(function(){a.write("<td>"),a.write("</td>")}),a.write("</tr>"))},a},!0);