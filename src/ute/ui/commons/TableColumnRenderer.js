/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableColumnRenderer = {};

        TableColumnRenderer.render = function (oRm, oTableColumn) {
            oRm.write('<tr');
            oRm.writeControlData(oTableColumn);
            oRm.write('>');

            //Render columns aggregation
            oTableColumn.getCells().forEach(function (oCell) {
                oRm.write('<th>');
                oRm.renderControl(oCell);
                oRm.write('</th>');
            });

            oRm.write('</tr>');
        };

        return TableColumnRenderer;

    }, true);
