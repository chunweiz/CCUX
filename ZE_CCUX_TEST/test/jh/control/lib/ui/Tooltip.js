/*!
 *  Created on  : Aug 1, 2015
 *  Author      : Jerry (Ya-Chieh) Hsu
 *  Description : Provides control jh.control.lib.ui.Tooltip.
 */

sap.ui.define(
	[
		'jquery.sap.global',
		'sap/ui/commons/CalloutBase'
	],
	function(jQuery, CalloutBase) {

		"use strict";

		 /**
		 * Constructor for a Customized Tooltip.
		 *
		 * @param {string} [sId] id for the new control, generated automatically if no id is given
		 * @param {object} [mSettings] initial settings for the new control
		 *
		 * @class
		 *
		 * Is used to provide tooltip that has controls as its children. This tooltip is modified from Callout and extends the CalloutBase.
		 * @extends sap.ui.core.TooltipBase
		 *
		 * @author Utegration Jerry Hsu
		 * @version ${version}
		 *
		 * @constructor
		 * @public
		 * @alias jh.control.lib.ui.Tooltip
		 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
		 */


		var CustomControl = CalloutBase.extend("jh.control.lib.ui.Tooltip", {

			metadata : {

				library : "jh.control.lib.ui",

				aggregations : {

					/**
					 * Determines the content of the Customized Tooltip
					 */
					content : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
				},

				defaultAggregation: 'content'
			}
		});

		///**
		// * This file defines behavior for the Customized Tooltip control
		// */

		return CustomControl;

	},

	true

);
