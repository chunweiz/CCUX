/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'test/tm/ze_ccux_ctrl/view/control/CustomerJourneyTimelineChannelRenderer'
    ],

    function (Control, CustomRenderer) {
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
            console.log('onclick');
            this.firePress();
        };

        CustomControl.prototype.ondblclick = function (oEvent) {
            console.log('ondblclick');
            this.fireDoublePress();
        };

        return CustomControl;
    }
);
