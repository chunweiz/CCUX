// Provides default renderer for control sap.ui.commons.TextView
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer'],
	function(jQuery, Renderer) {
	"use strict";


	/**
	 * TextView renderer.
	 * @author SAP SE
	 * @namespace
	 */
	var TextViewRenderer = {
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRenderManager The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.core.Control} oTextView An object representation of the control that should be rendered.
	 */
	TextViewRenderer.render = function(oRenderManager, oTextView) {
		var rm = oRenderManager;
		var r = TextViewRenderer;



		if (oTextView.getWidth() && oTextView.getWidth() !== '') {
			rm.addStyle("width", oTextView.getWidth());
		}

		rm.write("<span");
		rm.writeControlData(oTextView);


			rm.writeAttributeEscaped("title", oTextView.getText());

		rm.writeClasses();
		rm.writeStyles();
		rm.write(">");
		rm.writeEscaped(oTextView.getText(), true);
		rm.write("</span>");

	};


	return TextViewRenderer;

}, /* bExport= */ true);
