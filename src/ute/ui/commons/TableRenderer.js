/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/theming/Parameters'],
	function (jQuery, Parameters) {
        "use strict";

        var TableRenderer = {};

        TableRenderer.render = function (oRm, oTable) {
            oRm.write('<table');
            oRm.writeControlData(oTable);
            oRm.write('>');

            //Render columns aggregation
            oTable.getColumns().forEach(function (oColumn) {
                oRm.renderControl(oColumn);
            });

            //Render rows aggregation
            oTable.getRows().forEach(function (oRow) {
                oRm.renderControl(oRow);
            });

            oRm.write('</table>');

        };

        return TableRenderer;

    }, true);
