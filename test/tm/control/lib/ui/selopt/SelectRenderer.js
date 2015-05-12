/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oRm.write('<select');
            oRm.writeControlData(oControl);
            oRm.write('>');

            oControl.getOptions().forEach(function (oOption) {
                oRm.write('<option>');

                oOption.getContent().forEach(function (oContent) {
                   oRm.renderControl(oContent);
                });

                oRm.write('</option>');
            });

            oRm.write('</select>');
        };

        return Renderer;
    },

    true
);
