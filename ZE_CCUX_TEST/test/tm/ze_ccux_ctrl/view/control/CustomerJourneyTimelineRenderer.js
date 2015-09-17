/*global sap*/

sap.ui.define(
    [
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineChannel'
    ],

    function (CJTChannel) {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('tmCJT');
            oRm.writeClasses();
            oRm.addStyle('width', oCustomControl.getWidth());
            oRm.writeStyles();
            oRm.write('>');

            oCustomControl.getChannel().forEach(function (channel) {
                oRm.write('<div>');
                oRm.writeEscaped(channel.getChannelType());
                oRm.write('</div>');
            }, this);

            oRm.write('</div>');
        };

        return CustomRenderer;
    }
);
