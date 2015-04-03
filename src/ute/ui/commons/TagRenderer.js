/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var TagRenderer = {};

        TagRenderer.render = function (oRm, oControl) {
            var aContent, nContent, aClass, nClass,
                bAdded = false;
            
            oRm.write('<' + oControl.getElem());
            oRm.writeControlData(oControl);
            
            if (oControl.getType()) {
                oRm.writeAttribute('type', oControl.getType());
            }
            
            oRm.writeClasses();
            
            oRm.write('>');
            
            oRm.writeEscaped(oControl.getText());
            
            aContent = oControl.getContent();
            for (nContent = 0; nContent < aContent.length; nContent = nContent + 1) {
                oRm.renderControl(aContent[nContent]);
            }
            
            oRm.write('</' + oControl.getElem() + '>');
        };

        return TagRenderer;

    }, true);
