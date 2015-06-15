/*globals sap, vc*/

sap.ui.define(
    [],

	function () {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'vc.control',
			version: '1.0.0',
			dependencies: ['sap.ui.core'],

            types: [
                'vc.control.ButtonDesign'
            ],

			controls: [
				'vc.control.Button'
			]

		});

        vc.control.ButtonDesign = {
            None: 'None',
            Default: 'Default'
        };

		return vc.control;
	},

    true
);
