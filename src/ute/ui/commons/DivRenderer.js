/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var DivRenderer = {};

        DivRenderer.render = function (oRm, oControl) {
            var aContent, nContent;
            
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
            for (nContent = 0; nContent < aContent.length; nContent = nContent + 1) {
                oRm.renderControl(aContent[nContent]);
            }
            
            oRm.write('</div>');
        };

        return DivRenderer;

    }, true);
