/*globals sap, tm*/

sap.ui.define(
    [
        'jquery.sap.global',

        //Not part of factory function arguments
        './library'
    ],

    function (jQuery) {
        'use strict';

        var ButtonRenderer = {};

        ButtonRenderer.render = function (oRm, oControl) {
            oRm.write('<button');

            oRm.writeControlData(oControl);
            oRm.writeAttribute('type', 'button');
            oRm.addClass('uteBtn');
            oRm.writeClasses();
            oRm.write('>');

            //Begin - body of the button
            oRm.write('<span>' + tm.control.lib.ui.ButtonDesign.Alert + '</span>');

            //End - body of the button

            oRm.write('</button>');
        };

        return ButtonRenderer;
    },

    true
);
