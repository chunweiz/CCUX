/*global sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'ute.ui.viz',
            version: '1.0.0',

            interfaces: [],

            types: [],

            controls: [
                'ute.ui.viz.HighBillUsage',
                'ute.ui.viz.CustomerJourneyChannel'
            ],

            elements: [
                'ute.ui.viz.HighBillUsageData',
                'ute.ui.viz.CustomerJourneyChannelData'
            ]
        });

        return ute.ui.viz;
    }
);
