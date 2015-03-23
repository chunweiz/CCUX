/*globals sap, ute*/

sap.ui.define([],
    function () {
        'use strict';

        var BlockDivisionRenderer = {};

        BlockDivisionRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            
            oRm.addStyle('height', oControl.getHeight());
            oRm.addStyle('width', oControl.getWidth());
            
            if (oControl.getInline()) {
                oRm.addStyle('display', 'inline-block');
            }
            
            oRm.writeStyles();
            
            oRm.write('>');
            oRm.renderControl(oControl.getContent());
            oRm.write('</div>');
        };

        return BlockDivisionRenderer;

    }, true);

/*
  
*/