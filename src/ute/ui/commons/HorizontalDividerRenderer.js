/*global sap*/

// Provides default renderer for control sap.ui.commons.HorizontalDivider
sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
	    "use strict";


	/**
	 * HorizontalDivider renderer.
	 * @namespace
	 */
	    var HorizontalDividerRenderer = {
	        };
	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.fw.RenderManager}.
	 *
	 * @param {sap.ui.fw.RenderManager} oRenderManager The RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.ui.fw.Control} oControl An object representation of the control that should be rendered
	 */
	    HorizontalDividerRenderer.render = function (oRenderManager, oControl) {
		    var rm = oRenderManager;
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.writeAttribute("role", "separator"); //ARIA
			if (oControl.getWidth()) {
				rm.writeAttribute("style", "width:" + oControl.getWidth() + ";");
			}
			rm.addClass("uteUiCommonsHoriDiv");
			switch (oControl.getType()) {
			case "Page":
				rm.addClass("uteUiCommonsHoriDivTypePage");
				break;
			case "Area":
				rm.addClass("uteUiCommonsHoriDivTypeArea");
				break;
			case "Dotted":
				rm.addClass("uteUiCommonsHoriDivTypeDotted");
				break;
			case "Dashed":
				rm.addClass("uteUiCommonsHoriDivTypeDashed");
				break;
			default:
				rm.addClass("uteUiCommonsHoriDivTypePage");
			}
			switch (oControl.getHeight()) {
		    case "Ruleheight":
				rm.addClass("uteUiCommonsHoriDivHeightR");
				break;
			case "Small":
				rm.addClass("uteUiCommonsHoriDivHeightS");
				break;
			case "Large":
				rm.addClass("uteUiCommonsHoriDivHeightL");
				break;
			default:
				rm.addClass("uteUiCommonsHoriDivHeightM");
			}
			rm.writeClasses();
			rm.write("/>");
			rm.write("</div>");
	    };


	    return HorizontalDividerRenderer;

    }, /* bExport= */ true);
