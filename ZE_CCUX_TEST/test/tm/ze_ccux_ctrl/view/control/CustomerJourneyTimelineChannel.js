/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel', {
            metadata: {
                properties: {
                    channelType: {
                        type: 'test.tm.ze_ccux_ctrl.view.control.CustomerJourneyTimelineChannel.ChannelType',
                        defaultValue: 'Mail'
                    }
                }
            }
        });

        CustomElement.ChannelType = {
            Mail: 'Mail',
            Call: 'Call',
            Ivr: 'Ivr',
            Survey: 'Survey'
        };

        return CustomElement;
    }
);
