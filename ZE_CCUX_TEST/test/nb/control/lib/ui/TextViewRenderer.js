// Provides default renderer for control sap.ui.commons.TextView
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer'],
	function (jQuery, Renderer) {
	    "use strict";


	/**
	 * TextView renderer.
	 * @author UTE
	 *
	 */
	    var TextViewRenderer = {
	        };

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 *
	 */
	    TextViewRenderer.render = function (oRenderManager, oTextView) {
		    var rm = oRenderManager,
		        r = TextViewRenderer,
                TextViewDesign =  sap.ui.commons.TextViewDesign,
                TextViewColor  =  sap.ui.commons.TextViewColor,
                oDesign = oTextView.getDesign();
              /*  oColor  = oTextView.getSemanticColor();*/


// Styles
            switch (oDesign) {
            case TextViewDesign.Small:
                rm.addClass('uteTv-Small');
                break;
            case TextViewDesign.Bold:
                rm.addClass('uteTv-Base');
                break;
             case TextViewDesign.Large:
                rm.addClass('uteTv-Large');
                break;
            }



            rm.write("<div");
            rm.write(">");
		    rm.write("<span");
		    rm.writeControlData(oTextView);
            rm.addClass("uteUiTv");
            if (oTextView.getWidth() && oTextView.getWidth() !== '') {
			rm.addStyle("width", oTextView.getWidth());
		    }
			rm.writeAttributeEscaped("title", oTextView.getText());

		    rm.writeClasses();
		    rm.writeStyles();
		    rm.write(">");
		    rm.writeEscaped(oTextView.getText(), true);
		    rm.write("</span>");
            rm.write("</div>");

	    };


	    return TextViewRenderer;

    }, /* bExport= */ true);
