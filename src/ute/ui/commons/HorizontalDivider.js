/*global sap*/
/*jslint nomen:true*/

// Provides control sap.ui.commons.HorizontalDivider.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control'],
	function (jQuery, library, Control) {
	    "use strict";

	/**
	 * Constructor for a new HorizontalDivider.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Divides the screen in visual areas.
	 * @extends sap.ui.core.Control
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @alias sap.ui.commons.HorizontalDivider
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	    var HorizontalDivider = Control.extend("ute.ui.commons.HorizontalDivider", /** @lends ute.ui.commons.HorizontalDivider.prototype */ {
			metadata : {

				library : "ute.ui.commons",
		        properties : {
			/**s
			 * Defines the width of the divider.
			 */
					width : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : '100%'},

			/**
			 * Defines the type of the divider.
			 */
					type : {type : "ute.ui.commons.HorizontalDividerType", group : "Appearance", defaultValue : ''},

			/**
			 * Defines the height of the divider.
			 */
					height : {type : "ute.ui.commons.HorizontalDividerHeight", group : "Appearance", defaultValue : ''}
				}
			}
		});

	// No Behaviour

		return HorizontalDivider;

	}, /* bExport= */ true);
