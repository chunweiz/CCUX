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
				'tm.control.lib.ui.Infoline',
                'tm.control.lib.ui.ScrollContainer',
                'tm.control.lib.ui.Page',
                'tm.control.lib.ui.table.Table',
                'tm.control.lib.ui.table.SimpleTable',
                'tm.control.lib.ui.table.SimpleColumn',
                'tm.control.lib.ui.table.SimpleRow',
                'tm.control.lib.ui.selopt.Select'
			],

            interfaces: [],
			elements: [
                'tm.control.lib.ui.table.Column',
                'tm.control.lib.ui.table.Row',
                'tm.control.lib.ui.selopt.Option'
            ]
		});

        tm.control.lib.ui.BadgeDesign = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
        };

		return tm.control.lib.ui;
	}
);
