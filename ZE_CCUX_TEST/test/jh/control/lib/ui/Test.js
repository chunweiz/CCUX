sap.ui.define(
	[
		'sap/ui/core/Control'
	],

	function (Control) {
		var CustomControl = Control.extend('jh.control.lib.ui.Test', {
			metadata: {
				library: 'jh.control.lib.ui'
			}
		});

		return CustomControl;
	},

	true
);
