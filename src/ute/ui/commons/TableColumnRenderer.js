/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableColumnRenderer = {};

        TableColumnRenderer.render = function (oRm, oTableColumn) {
            oRm.write('<tr');
            oRm.writeControlData(oTableColumn);
            oRm.addStyle('width', oTableColumn.getWidth());
            oRm.addClass('uteTb-column');
            switch (oTableColumn.getParent().getTableType()) {
            case 'InvoiceTable':
                oRm.addClass('uteTb-column-invoice');
                break;
            case 'CheckbookTable':
                break;
            case 'DppTable':
                break;
            case 'DppDeniedTable':
                break;
            case 'CampaignTable':
                break;
            }
            oRm.writeStyles();
            oRm.writeClasses();
            oRm.write('>');

            //Render columns aggregation
            oTableColumn.getCells().forEach(function (oCell) {
                oRm.write('<th');
                oRm.addStyle('width', oCell.getWidth());
                oRm.writeStyles();
                oRm.write('>');
                oCell.setWidth('');
                oRm.renderControl(oCell);
                oRm.write('</th>');
            });

            oRm.write('</tr>');
            oRm.write('<div></div>');
        };




        return TableColumnRenderer;

    }, true);
