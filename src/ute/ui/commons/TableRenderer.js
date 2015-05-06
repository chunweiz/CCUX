/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/theming/Parameters'],
	function (jQuery, Parameters) {
        "use strict";

        var TableRenderer = {};

        TableRenderer.render = function (rm, oTable) {
            var aCols = oTable.getColumns(),
                iColumnCount = aCols.length,
                i;


            oTable._createRows();

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

            }

            rm.write('</tr>');
            //End rendering column



            rm.write('</table></div>');

        };

    }, true);
