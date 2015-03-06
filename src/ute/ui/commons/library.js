sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'],
	function(jQuery) {
		'use strict';

		sap.ui.getCore().initLibrary({
			name: 'ute.ui.commons',
			version: '0.0.0.1',
			dependencies: ['sap.ui.core'],
			types: [],
			interfaces: [],
			controls: [
				'ute.ui.commons.InfoLine'
			],
			elements: []
		});

		return ute.ui.commons;
		
	}, /* bExport= */ false);