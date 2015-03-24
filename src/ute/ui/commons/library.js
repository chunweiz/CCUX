/*globals sap, ute*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'],
	function (jQuery) {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'ute.ui.commons',
			version: '1.0.0.0',
			dependencies: ['sap.ui.core'],
			types: [
                'ute.ui.commons.BadgeType'
            ],
			interfaces: [],
			controls: [
				'ute.ui.commons.InfoLine',
                'ute.ui.commons.Dialog',
                'ute.ui.commons.Badge',
                'ute.ui.commons.Button',
                'ute.ui.commons.ToggleButton',
                'ute.ui.commons.Div'
			],
			elements: []
		});
    
        ute.ui.commons.BadgeType = {
            Alert: 'Alert',
            Attention: 'Attention',
            Regular: 'Regular'
            
        };

		return ute.ui.commons;
		
	}, /* bExport= */ false);