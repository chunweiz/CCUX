/*global sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: 'ute.ui.main',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

			types: [

            ],

			controls: [
				'ute.ui.main.Button'
			],

			elements: [],
            interfaces: []
        });
    },

    true
);
