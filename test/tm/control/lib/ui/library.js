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
                'tm.control.lib.ui.BadgeDesign',
                'tm.control.lib.ui.ButtonDesign'
            ],

			controls: [
				'tm.control.lib.ui.Button',
				'tm.control.lib.ui.TextField',
				'tm.control.lib.ui.Badge'
			],

            interfaces: [],
			elements: []
		});

        tm.control.lib.ui.BadgeDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
        };

        tm.control.lib.ui.ButtonDesign = {
            Type001: 'Type001',
            Type002: 'Type002',
            Type003: 'Type003'
        };

		return tm.control.lib.ui;
	}
);
