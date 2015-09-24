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
                    selected: { type: 'boolean', defaultValue: false }
                },

                events: {
                    press: {},
                    doublePress: {}
                }
            },

            renderer: CustomRenderer
        });

        return CustomControl;
    }
);
