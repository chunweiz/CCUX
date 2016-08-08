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
            oRm.write('>');

            this._renderNavBack(oRm, oCustomControl);
            this._renderChannel(oRm, oCustomControl);
            this._renderNavForward(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderChannel = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeAttribute('id', oCustomControl.getId() + '-channelContainer');
            oRm.addClass('tmCJT-channelContainer');
            oRm.writeClasses();
            oRm.write('>');

            oCustomControl.getChannel().forEach(function (oChannel) {
                oRm.renderControl(oChannel);
            }, this);

            oRm.write('</div>');
        };

        CustomRenderer._renderNavBack = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeAttribute('id', oCustomControl.getId() + '-navBack');
            oRm.addClass('tmCJT-navBack');
            oRm.writeClasses();
            oRm.write('>');

            oRm.writeIcon('sap-icon://navigation-left-arrow');

            oRm.write('</div>');
        };

        CustomRenderer._renderNavForward = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeAttribute('id', oCustomControl.getId() + '-navForward');
            oRm.addClass('tmCJT-navForward');
            oRm.writeClasses();
            oRm.write('>');

            oRm.writeIcon('sap-icon://navigation-right-arrow');

            oRm.write('</div>');
        };

        return CustomRenderer;
    }
);
