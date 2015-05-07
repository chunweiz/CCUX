/*globals sap, tm*/

sap.ui.define(
    [],

	function () {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'tm.control.lib.ui',
			version: '1.0.0',
			dependencies: ['sap.ui.core'],

            types: [
                'tm.control.lib.ui.BadgeDesign'
            ],

			controls: [
				'tm.control.lib.ui.Badge',
				'tm.control.lib.ui.Infoline'
			],

            interfaces: [],
			elements: []
		});

        tm.control.lib.ui.BadgeDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
        };

		return tm.control.lib.ui;
	}
);
