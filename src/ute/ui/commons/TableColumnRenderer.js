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
                oRm.addStyle('width', oTableColumn.getWidth());
                oRm.writeStyles();
                oRm.write('>');
                oCell.setWidth('');
                oRm.renderControl(oCell);
                if (oTableColumn.getSortable()) {
                    oRm.write('<span');
                    oRm.writeControlData(oTableColumn);
                    if (oTableColumn.getSortDescend()) {
                        oRm.addClass('uteTb-column-sortingArrowDown');
                    } else {
                        oRm.addClass('uteTb-column-sortingArrowUp');
                    }
                    oRm.writeClasses();
                    oRm.write('></span>');
                }
                oRm.write('</th>');
            });
        };




        return TableColumnRenderer;

    }, true);
