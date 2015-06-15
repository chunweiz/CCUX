/*globals sap, sc*/

sap.ui.define(
    [],

	function () {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'sc.control.lib.ui',
			version: '1.0.0',
			dependencies: ['sap.ui.core'],
            types: [],
			controls: [
				'sc.control.lib.ui.Calendar',
                'sc.control.lib.ui.DatePicker'
			],

            interfaces: [],
			elements: []
		});
		return sc.control.lib.ui;
	}
);
