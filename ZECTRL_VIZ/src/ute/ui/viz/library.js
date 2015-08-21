/*global sap, ute*/

sap.ui.define(
    [
        'sap/ui/thirdparty/d3'
    ],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'ute.ui.viz',
            version: '1.0.0',

            interfaces: [],

            types: [],

            controls: [],

            elements: [
                'ute.ui.viz.Dataset'
            ]
        });

        return ute.ui.viz;
    }
);
