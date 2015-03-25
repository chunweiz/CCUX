/*globals sap*/

sap.ui.define([],
    function () {
        'use strict';

        var SpanRenderer = {};

        SpanRenderer.render = function (oRm, oControl) {
            var aContent, nContent;
            
            oRm.write('<span');
            oRm.writeControlData(oControl);
            oRm.write('>');
            
            oRm.writeEscaped(oControl.getText());
            
            aContent = oControl.getContent();
            for (nContent = 0; nContent < aContent.length; nContent = nContent + 1) {
                oRm.renderControl(aContent[nContent]);
            }
            
            oRm.write('</span>');
        };

        return SpanRenderer;

    }, true);
