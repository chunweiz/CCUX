/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableRowRenderer = {};

        TableRowRenderer.render = function (oRm, oTableRow) {
            oRm.write('<tr');
            oRm.writeControlData(oTableRow);
            switch (oTableRow.getParent().getTableType()) {
            case 'InvoiceTable':
                oRm.addClass('uteTb-row-invoice');
                break;
            case 'DppTable':
                oRm.addClass('uteTb-row-dpp');
                break;
            case 'DppDeniedTable':
                break;
            case 'CampaignTable':
                break;
            }
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
