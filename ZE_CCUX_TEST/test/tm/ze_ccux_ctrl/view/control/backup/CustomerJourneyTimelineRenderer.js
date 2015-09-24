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

            this._renderChannel(oRm, oCustomControl);
            this._renderBackNavigation(oRm, oCustomControl);
            this._renderForwardNavigation(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderChannel = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeAttribute('id', oCustomControl.getId() + '-container');
            oRm.addClass('tmCJT-container');
            oRm.writeClasses();
            oRm.write('>');

            oCustomControl.getChannel().forEach(function (oChannel) {
                oRm.renderControl(oChannel);

                oRm.write('<div');
                oRm.addClass('tmCJT-channelLine');
                if (oChannel.getRightDivider()) {
                    oRm.addClass('tmCJT-channelLine-small');
                }
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('</div>');

                if (oChannel.getRightDivider()) {
                    oRm.write('<div');
                    oRm.addClass('tmCJT-channelLineDivider');
                    oRm.writeClasses();
                    oRm.write('>');
                    oRm.writeIcon('sap-icon://line-charts');
                    oRm.write('</div>');
                    oRm.write('<div');
                    oRm.addClass('tmCJT-channelLine tmCJT-channelLine-small');
                    oRm.writeClasses();
                    oRm.write('>');
                    oRm.write('</div>');
                }

            }, this);

            oRm.write('</div>');
        };

        CustomRenderer._renderBackNavigation = function (oRm, oCustomControl) {
            // Left arrow
            oRm.write('<span');
            oRm.writeAttribute('id', oCustomControl.getId() + '-navBack');
            oRm.addClass('tmCJT-navBack');
            oRm.writeClasses();
            oRm.write('>');
            oRm.writeIcon('sap-icon://navigation-left-arrow');
            oRm.write('</span>');
        };

        CustomRenderer._renderForwardNavigation = function (oRm, oCustomControl) {
            // Right arrow
            oRm.write('<span');
            oRm.addClass('tmCJT-navFwd');
            oRm.writeClasses();
            oRm.writeAttribute('id', oCustomControl.getId() + '-navFwd');
            oRm.write('>');
            oRm.writeIcon('sap-icon://navigation-right-arrow');
            oRm.write('</span>');
        };

        return CustomRenderer;
    }
);