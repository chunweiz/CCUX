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
			        width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null}


		        }

	        }});




	    return TextView;

    }, /* bExport= */ true);
