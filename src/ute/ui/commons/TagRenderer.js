/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var TagRenderer = {};

        TagRenderer.render = function (oRm, oControl) {
            var aContent, nContent, aClass, nClass,
                bAdded = false;
            
            oRm.write('<' + oControl.getType());
            oRm.writeControlData(oControl);
            
            //Add CSS classes
            aClass = JSON.parse(oControl.getClasses());
            
            if (aClass.length > 0) {
                for (nClass = 0; nClass < aClass.length; nClass = nClass + 1) {
                    oRm.addClass(aClass[nClass]);
                }
                 
                oRm.writeClasses();
            }
            
            oRm.write('>');
            
            oRm.writeEscaped(oControl.getText());
            
            aContent = oControl.getContent();
            for (nContent = 0; nContent < aContent.length; nContent = nContent + 1) {
                oRm.renderControl(aContent[nContent]);
            }
            
            oRm.write('</' + oControl.getType() + '>');
        };

        return TagRenderer;

    }, true);
