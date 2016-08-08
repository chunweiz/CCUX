/*global sap, tm*/

sap.ui.define(
    [
        'jquery.sap.global'
    ],

	function (jQuery) {
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

        jQuery.sap.require('sap.ui.core.IconPool');

        sap.ui.core.IconPool.addIcon('notification', 'nrg-icon', {
            fontFamily: 'nrg-icon',
            content: 'e616'
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
