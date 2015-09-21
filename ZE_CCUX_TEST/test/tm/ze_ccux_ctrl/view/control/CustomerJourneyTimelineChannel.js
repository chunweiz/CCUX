/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineChannelRenderer'
    ],

    function (jQuery, Control, CustomRenderer) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel', {
            metadata: {
                properties: {
                    channelIcon: { type: 'sap.ui.core.URI', defaultValue: 'sap-icon://letter' },
                    topLabel: { type: 'string', defaultValue: null },
                    rightDivider: { type: 'boolean', defaultValue: false },
                    selected: { type: 'boolean', defaultValue: false },
                    selectionGroup: { type: 'string', defaultValue: null }
                },

                events: {
                    press: {},
                    doublePress: {}
                }
            },

            renderer: CustomRenderer
        });

        CustomControl.ChannelType = {
            Website: 'Website',
            Mobile: 'Mobile',
            IVR: 'IVR',
            Webchat: 'Webchat',
            Phone: 'Phone',
            Survey: 'Survey',
            Correspondence: 'Correspondence'
        };

        CustomControl.prototype.onclick = function (oEvent) {
            this._onDoubleClick = false;

            // Wait for a while to check whether user intention is to double click.
            //  If it is, do not fire single click.
            jQuery.sap.delayedCall(300, this, function () {
                if (!this._onDoubleClick) {
                    this.firePress();
                }
            });
        };

        CustomControl.prototype.ondblclick = function (oEvent) {
            this._onDoubleClick = true;
            this.fireDoublePress();
        };

        return CustomControl;
    }
);
