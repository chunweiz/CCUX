/*global sap, tm*/

sap.ui.define(
    [],

	function () {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'tm.message.control',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ],

            types: [],

			controls: [
                'tm.message.control.Label'
			],

            interfaces: [],
			elements: []
		});

		return tm.message.control;
	}
);
