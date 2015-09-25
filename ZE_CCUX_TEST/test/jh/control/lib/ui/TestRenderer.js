sap.ui.define(
	[],

	function () {
		var CustomRenderer = {};

		CustomRenderer.render = function (oRm, oCustomControl) {
			oRm.write('<span');
			oRm.writeControlData(oCustomControl);
			oRm.addClass('jerry');
			oRm.writeClasses();
			oRm.write('>Jerry was here');
			oRm.write('</span>');
		};

		return CustomRenderer;
	},

	true
);
