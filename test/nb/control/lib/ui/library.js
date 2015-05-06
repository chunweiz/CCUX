/*globals sap, nb*/

sap.ui.define(
    [],

	function () {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'nb.control.lib.ui',
			version: '1.0.0',
			dependencies: ['sap.ui.core'],
/*
            types: [
                'nb.control.lib.ui.BadgeDesign'
            ],*/

			controls: [
				'nb.control.lib.ui.Dropdown'
			],

            interfaces: [],
			elements: []
		});

       /* nb.control.lib.ui.BadgeDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
        };*/

		return nb.control.lib.ui;
	}
);
