/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var DivRenderer = {};

        DivRenderer.render = function (oRm, oControl) {
            var aContent, nContent, aClass, nClass,
                bAdded = false;
            
            oRm.write('<div');
            oRm.writeControlData(oControl);
            
            if (oControl.getHeight()) {
                oRm.addStyle('height', oControl.getHeight());
                bAdded = true;
            }
            
            if (oControl.getWidth()) {
                oRm.addStyle('width', oControl.getWidth());
                bAdded = true;
            }
            
            if (oControl.getDisplay()) {
                oRm.addStyle('display', oControl.getDisplay());
                bAdded = true;
            }
            
            if (oControl.getPosition()) {
                oRm.addStyle('position', oControl.getPosition());
                bAdded = true;
            }
            
            if (bAdded === true) {
                oRm.writeStyles();
            }
            
            if (oControl.getClasses()) {
                aClass = oControl.getClasses().replace(/\s/g, '').split('|');
                for (nClass = 0; nClass < aClass.length; nClass = nClass + 1) {
                    oRm.addClass(aClass[nClass]);
                }
                 
                oRm.writeClasses();
            }
            
            oRm.write('>');
            
            aContent = oControl.getContent();
            for (nContent = 0; nContent < aContent.length; nContent = nContent + 1) {
                oRm.renderControl(aContent[nContent]);
            }
            
            oRm.write('</div>');
        };

        return DivRenderer;

    }, true);
