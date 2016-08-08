/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oRm.write('<table');
            oRm.writeControlData(oControl);
            oRm.write('>');

            oControl.getColumns().forEach(function (oColumn) {
                oRm.renderControl(oColumn);
            });

            oControl.getRows().forEach(function (oRow) {
                oRm.renderControl(oRow);
            });

            oRm.write('</table>');
        };

        return Renderer;
    },

    true
);
