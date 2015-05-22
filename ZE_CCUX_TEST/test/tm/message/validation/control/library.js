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

            types: [
                'tm.message.control.LabelDesign'
            ],

			controls: [
                'tm.message.control.Label'
			],

            interfaces: [],
			elements: []
		});

        tm.message.control.LabelDesign = {
            Error: 'Error',
            Warning: 'Warning',
            None: 'None',
            Information: 'Information',
            Success: 'Success'
        };

		return tm.message.control;
	}
);
