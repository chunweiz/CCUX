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
            oRm.addStyle('max-width', oCustomControl.getWidth());
            oRm.writeStyles();
            oRm.write('>');

            this._renderChannel(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderChannel = function (oRm, oCustomControl) {
            oCustomControl.getChannel().forEach(function (channel) {
                oRm.write('<div');
                oRm.addClass('tmCJTChannel');
                oRm.addClass('tmCJTChannel-big');
                oRm.writeClasses();
                oRm.write('>');

                oRm.writeIcon(channel.getChannelIcon());

                oRm.write('</div>');
            }, this);
        };

        return CustomRenderer;
    }
);
