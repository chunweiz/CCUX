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
			interfaces: [],
			controls: [
				'tm.control.lib.ui.Division',
				'tm.control.lib.ui.Button'
			],
			elements: []
		});

		return tm.control.lib.ui;
	}
);
