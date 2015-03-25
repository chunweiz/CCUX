/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var DivisionRenderer = {},
            aContent,
            i;

        DivisionRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            
            oRm.addStyle('height', oControl.getHeight());
            oRm.addStyle('width', oControl.getWidth());
            
            if (oControl.getInline()) {
                oRm.addStyle('display', 'inline-block');
            }
            
            oRm.writeStyles();
            
            oRm.write('>');
            
            aContent = oControl.getContent();
            for (i = 0; i < aContent.length; i = i + 1) {
                oRm.renderControl(aContent[i]);
            }
            
            oRm.write('</div>');
        };

        return DivisionRenderer;

    }, true);