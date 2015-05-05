/*globals sap, tm*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/library'
    ],

	function (jQuery) {
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
            Alert: 'alert',
            Attention: 'attention',
            Regular: 'regular'
        };

        tm.control.lib.ui.ButtonDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
        };

		return tm.control.lib.ui;
	}
);
