/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<input type="checkbox"');
            oRm.writeControlData(oCustomControl);

            oRm.addClass('uteMChkBox');
            oRm.writeClasses();

            if (oCustomControl.getChecked()) {
                oRm.writeAttribute('checked', 'checked');
            }

            if (oCustomControl.getDisabled()) {
                oRm.writeAttribute('disabled', 'disabled');
            }
            oRm.write(' />');
            oRm.write('<label');
            oRm.writeAttribute('id', oCustomControl.getId() + '-chk');
            oRm.writeAttribute('for', oCustomControl.getId());
            oRm.addClass('uteMChkBox-chk');
            oRm.writeClasses();
            oRm.write('>');
            oRm.write('zzzz');
            oRm.write('</label>');
        };

        return CustomRenderer;
    },

    true
);
