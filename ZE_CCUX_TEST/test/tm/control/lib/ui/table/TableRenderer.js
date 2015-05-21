/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oControl._createRows();

            oRm.write('<table');
            oRm.writeControlData(oControl);
            oRm.write('>');

            if (oControl.getColumns()) {
                oRm.write('<thead><tr>');

                oControl.getColumns().forEach(function (oColumn) {
                    oRm.write('<th>');
                    oRm.renderControl(oColumn.getLabel());
                    oRm.write('</th>');
                });

                oRm.write('</tr></thead>');
            }

            if (oControl.getRows()) {
                oRm.write('<tbody>');

                oControl.getRows().forEach(function (oRow) {
                    oRm.write('<tr>');

                    oRow.getCells().forEach(function (oCell) {
                        oRm.write('<td>');
                        oRm.renderControl(oCell);
                        oRm.write('</td>');
                    });

                    oRm.write('</tr>');
                });

                oRm.write('</tbody>');
            }

            oRm.write('</table>');
        };

        return Renderer;
    },

    true
);
