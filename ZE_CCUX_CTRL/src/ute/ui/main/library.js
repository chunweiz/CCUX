/*global sap, ute*/

sap.ui.define(
    [
        'sap/ui/core/library'
    ],

	function (Library) {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'ute.ui.main',
			version: '1.0.0',
			dependencies: ['sap.ui.core'],

			types: [

            ],

			controls: [

			],

			elements: [],
            interfaces: []
		});



		return ute.ui.main;
	}
);
