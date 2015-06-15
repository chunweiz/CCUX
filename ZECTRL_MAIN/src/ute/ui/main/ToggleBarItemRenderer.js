/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<span');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('uteMTb-item');
            oRm.writeClasses();
            oRm.write('>');

            /*
            ** Actual radio button, will be hide away
            */
            oRm.write('<input type="radio"');
            oRm.writeAttribute('id', oCustomControl.getId() + '-intRb');

            if (oCustomControl.getName()) {
                oRm.writeAttributeEscaped('name', oCustomControl.getName());
            }

            if (oCustomControl.getSelected()) {
                oRm.writeAttribute('checked', 'checked');
            }

            if (!oCustomControl.getEnabled()) {
                oRm.writeAttribute('disabled', 'disabled');
            }

            oRm.addClass('uteMTbItem-intRb');
            oRm.writeClasses();
            oRm.write('/>');

            this._renderContent(oRm, oCustomControl);

            oRm.write('</span>');
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {
            var aContent;

            aContent = oCustomControl.getContent() || [];
            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            });
        };

        return CustomRenderer;
    },

    true
);
