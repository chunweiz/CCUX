/*globals sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);

            if (oControl.getWidth()) {
                oRm.addStyle('width', oControl.getWidth());
            }

            if (oControl.getHeight()) {
                oRm.addStyle('height', oControl.getHeight());
            }
            oRm.writeStyles();

            if (oControl.getVertical()) {
                if (!oControl.getHorizontal()) {
                    oRm.addClass('sapMScrollContV');
                } else {
                    oRm.addClass('sapMScrollContVH');
                }
            } else if (oControl.getHorizontal()) {
                oRm.addClass('sapMScrollContH');
            }

            oRm.addClass('sapMScrollCont');
            oRm.writeClasses();

            if (oControl.getTooltip_AsString()) {
                oRm.writeAttributeEscaped('title', oControl.getTooltip_AsString());
            }

            if (oControl.getFocusable()) {
                oRm.writeAttributeEscaped('tabindex', '0');
            }

            oRm.write('><div id="' + oControl.getId() + '-scroll" class="sapMScrollContScroll">');

            oControl.getContent().forEach(function (oContent) {
                oRm.renderControl(oContent);
            });

            oRm.write('</div></div>');
        };

        return Renderer;
    },

    true
);


