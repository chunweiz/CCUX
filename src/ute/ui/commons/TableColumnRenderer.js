/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var TableColumnRenderer = {};

        TableColumnRenderer.render = function (oRm, oTableColumn) {


            /*oRm.write('<tr');
            */

            //Render columns aggregation
            oTableColumn.getCells().forEach(function (oCell) {
                oRm.write('<th');
                oRm.writeControlData(oTableColumn);
                oRm.addStyle('width', oCell.getWidth());
                oRm.writeStyles();
                oRm.write('>');
                oCell.setWidth('');
                oRm.renderControl(oCell);
                oRm.write('</th>');
            });


        };




        return TableColumnRenderer;

    }, true);
