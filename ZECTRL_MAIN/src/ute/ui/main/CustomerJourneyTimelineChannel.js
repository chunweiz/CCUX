/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.main.CustomerJourneyTimelineChannel', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    channelType: {
                        type: 'ute.ui.main.CustomerJourneyTimelineChannelType',
                        defaultValue: ute.ui.main.CustomerJourneyTimelineChannelType.Website
                    }
                }
            }
        });



        return CustomElement;
    },

    true
);
