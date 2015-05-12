/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/theming/Parameters'],
	function (jQuery, Parameters) {
        "use strict";

        var TableRenderer = {};

        TableRenderer.render = function (rm, oTable) {
   /*         var aCols = oTable.getColumns(),
                iColumnCount = aCols.length,
                i,
                j,
                oColumn,
                aRows,
                oRow,
                aCells;

            //Create rows aggregation at oTable first
     //       oTable._createRows();

            rm.write('<div><table');
            rm.addClass('uteTable');
            rm.writeClasses();
            rm.write('>');

            //Render column first
            rm.write('<tr');
            rm.addClass('uteTable-rowHeader');
            rm.writeClasses();
            rm.write('>');
            for (i = 0; i < iColumnCount; i = i + 1) {
                oColumn = aCols[i];
                rm.write('<th');
                rm.addStyle('width', oColumn.getWidth());
                rm.writeStyles();
                rm.write('>');
                rm.renderControl(oColumn.getLabel());
            }
            rm.write('</tr>');
            //End rendering column

            //Render rows
            aRows = oTable.getRows();
            for (i = 0; i < aRows.length; i = i + 1) {
                oRow = aRows[i];
                rm.write('<tr');    //Need to add class after this
                //rm.addClass
                //rm.addStylr
                rm.write('>');

                //Write cells of current row
                aCells = oRow.getCells();
                for (j = 0; j < aCells.length; j = j + 1) {
                    rm.write('<td');
                    //rm.addClass
                    //rm.addStylr
                    rm.write('>');
                    rm.renderControl(aCells[j]);
                    rm.write('</td>');
                }
                rm.write('</td>');
            }
            rm.write('</table></div>');*/

        };

        return TableRenderer;

    }, true);
