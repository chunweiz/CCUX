/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element',

        'sap/ui/thirdparty/d3'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.viz.CustomerJourneyChannelData', {
            metadata: {
                library: 'ute.ui.viz'
            }
        });

        CustomElement.prototype.getData = function () {
            var aData = {};

            aData = [
                { channel: 'call', frequency: 5 },
                { channel: 'mail', frequency: 3 },
                { channel: 'webchat', frequency: 1 },
                { channel: 'email', frequency: 3 }
            ];

            return aData;
        };

        return CustomElement;
    },

    true
);
