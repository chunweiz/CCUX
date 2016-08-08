/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomElement) {
            oRm.write('<span');
            oRm.writeControlData(oCustomElement);
            oRm.addClass('uteMTogBtnItm');
            oRm.writeClasses();
            oRm.write('>');

            if (oCustomElement.getContent()) {
                oCustomElement._addContent(oRm);
            }

            oRm.write('</span>');
        };

        return CustomRenderer;
    },

    true
);
