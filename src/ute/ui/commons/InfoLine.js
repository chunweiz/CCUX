sap.ui.define(['sap/ui/core/Control'],
function (Control) {
	'use strict';

	var InfoLine = Control.extend('ute.ui.commons.InfoLine', {
		metadata: {
			library: 'ute.ui.commons',
			properties: {
				title: {
					type: 'string',
					defaultValue: ''
				},
				expand: {
					type: 'boolean',
					defaultValue: false
				},
				maxHeight: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: undefined
				}
			},
			aggregations: {
				content: {
					multiple: false
				}
			},
			defaultAggregation : 'content'
		}
	});

	return InfoLine;

}, true);
