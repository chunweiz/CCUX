/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableRowRenderer = {};

        TableRowRenderer.render = function (oRm, oTableRow) {
            oRm.write('<tr');
            oRm.writeControlData(oTableRow);
            oRm.addClass('uteTb-row-invoice');
            oRm.writeClasses();
            oRm.write('>');

            //Render columns aggregation
            oTableRow.getCells().forEach(function (oCell) {
                oRm.write('<td>');
                oRm.renderControl(oCell);
                oRm.write('</td>');
            });

            oRm.write('</tr>');
        };

        return TableRowRenderer;

    }, true);
