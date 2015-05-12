/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableRowRenderer = {};

        TableRowRenderer.render = function (oRm, oTableRow) {
            oRm.write('<tr');
            oRm.writeControlData(oTableRow);
            oRm.write('>');

            //Render columns aggregation
            oTableRow.getCells().forEach(function (oCell) {
                oRm.write('<th>');
                oRm.renderControl(oCell);
                oRm.write('</th>');
            });

            oRm.write('</tr>');
        };

        return TableRowRenderer;

    }, true);
