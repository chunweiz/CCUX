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
                'ute.ui.viz.HighBillUsage'
            ],

            elements: [
                'ute.ui.viz.HighBillUsageData'
            ]
        });

        return ute.ui.viz;
    }
);
