// Provides control sap.ui.commons.TextView.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/Popup'],
	function (jQuery, library, Control, Popup) {
	    "use strict";



	/**
	 * Constructor for a new TextView.
	 *
	 *
	 */
	    var TextView = Control.extend("ute.ui.commons.TextView", { metadata : {

		        library : "ute.ui.commons",

		        properties : {

			/**
			 * Text to be displayed.
			 */
			        text : {type : "string", defaultValue : '', bindable : "bindable"},
            /**
			 * Width of the TextView
			 */
			        width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},

            /**
			 * Defines the visual appearance of the control.
			 */
			        design : {type : "ute.ui.commons.TextViewDesign", group : "Data", defaultValue : ute.ui.commons.TextViewDesign.Base},

            /**
			 * Semantic color of the text View
			 */
			       semanticColor : {type : "string", group : "Appearance", defaultValue : ute.ui.commons.TextViewColor.Default}


		        }

	        }
                });

        TextView.prototype.setText = function (sText) {
		    this.setProperty("text", sText, true); // no re-rendering!
		    var oDomRef = this.getDomRef();
		    if (oDomRef) {
			// in case of
			    sText = this.getText(); // the default value '' ensures valid text string
			    oDomRef.innerHTML = jQuery.sap.encodeHTML(sText).replace(/&#xa;/g, "<br>");
			// when no tooltip is applied use the text as tooltip
			    if (!this.getTooltip_AsString()) {
				    oDomRef.title = sText; // IE8 doesn't like HTML encoded attribute values
			    }
		    }

		    return this;
	    };


	    return TextView;

    }, /* bExport= */ true);
