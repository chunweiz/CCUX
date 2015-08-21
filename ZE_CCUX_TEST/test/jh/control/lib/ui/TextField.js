/*!
 *  Created on  : Aug 21, 2015
 *  Author      : Jerry (Ya-Chieh) Hsu
 *  Description : Provides control jh.control.lib.ui.TextField.
 */

sap.ui.define(
	[
		'jquery.sap.global',
		'sap/ui/core/Control'
	],
	function (jQuery, Control) {

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


		var CustomControl = Control.extend("jh.control.lib.ui.TextField", {

			metadata : {

				library : "jh.control.lib.ui",

				properties : {
	                
	                //Value the textfield bind with
	                value : {type : "string", group : "Data", defaultValue : '', bindable : "bindable"},

	                //Not implemented, if enabled = flase will grey out
	                enabled : {type : "boolean", group : "Behavior", defaultValue : true},

	                //If false the textfield is not editable
	                editable : {type : "boolean", group : "Behavior", defaultValue : true},

	                //CSS type width of the Textfield, the min width is set to 168px.
	                width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "200px" },

	                maxLength : {type : "int", group : "Behavior", defaultValue : 0},

	                //name attribute in HTML
	                name : {type : "string", group : "Misc", defaultValue : null},

	                //Placeholder value of a string before the input
	                placeholder : {type : "string", group : "Appearance", defaultValue : null},

	                fieldType : { type: "jh.control.lib.ui.TextFieldType", group: "Appearance", defaultValue: "Regular" },

	                label: { type: "string", group: "Appearance", defaultvalue: null }
	            },

	            events : {

	            }
			}
		});

		///**
		// * This file defines behavior for the Customized TextField control
		// */

		CustomControl.prototype.ontap = function (oEvent) {
			var $inputField = jQuery(this.getDomRef("input"));
			if(!$inputField.hasClass('uteTextField-float-label-show')) {
				$inputField.addClass('uteTextField-float-label-show');
			}

			$inputField.focus();
		}

		CustomControl.prototype.onsapfocusleave = function (oEvent) {
			console.log(this.getValue());
		}


		return CustomControl;

	},

	true

);
