/*!
 * ${copyright}
 */

// Provides default renderer for control sap.ui.commons.TextField
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', 'sap/ui/core/ValueStateSupport'],
	function (jQuery, Renderer, ValueStateSupport) {
        "use strict";

	    var InputRenderer = {};
	
	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRenderManager The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.commons.TextField}
	 *            oTextField The TextField control that should be rendered.
	 */
	    InputRenderer.render = function(oRm, oInput) {
            if( oInput.getFieldType() === "field2" ){   
                if( oInput.getLabel() ){
                    oRm.write( "<Label"  ) ;
                    oRm.addClass( "uteUiInputType2Label" ) ;
                    oRm.writeClasses() ;
                    oRm.write( ">" ) ;
                    oRm.write( oInput.getLabel() + ":" ) ;
                    oRm.write( "</Label>" ) ;
                }
                oRm.write(  "<input" ) ;
                oRm.writeControlData(oInput) ;
                oRm.writeAttribute("id", oInput.getId() ) ;
                oRm.writeAttribute("name" , oInput.getName() );
                oRm.writeAttribute("placeholder" , oInput.getPlaceholder() ) ;
                oRm.addStyle("width", oInput.getWidth() );
                oRm.addClass( "uteUiInputType2" ) ;
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write( ">" ) ;
            }
            else{       //default situation, so not specified as field type 2 then filed1
                oRm.write(  "<input" ) ;
                oRm.writeControlData(oInput) ;
                oRm.writeAttribute("id", oInput.getId() ) ;
                oRm.writeAttribute("name" , oInput.getName() );
                oRm.writeAttribute("placeholder" , oInput.getPlaceholder() ) ;
                oRm.addStyle("width", oInput.getWidth() );
                oRm.addStyle("height", oInput.getHeight() ) ;
                oRm.addClass( "uteUiInputType1" ) ;
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write( ">" ) ;
            }
            
        }
	       

	return InputRenderer;

}, /* bExport= */ true);