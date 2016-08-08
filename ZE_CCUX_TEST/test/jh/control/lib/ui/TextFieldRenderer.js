/*!
 *  Created on  : Aug 21, 2015
 *  Author      : Jerry (Ya-Chieh) Hsu
 *  Description : Provides renderer jh.control.lib.ui.TextField.
 */

sap.ui.define(
	[
		'jquery.sap.global',
		'sap/ui/core/Renderer'
	],

	function(jQuery, Renderer) {

		"use strict";

		var TextFieldRenderer = {};		

		TextFieldRenderer.render = function(oRenderManager, oTextField){

			oRenderManager.write('<span');
			oRenderManager.writeControlData(oTextField);
			oRenderManager.addClass('uteTextField');
            if (oTextField.getFieldType() === 'Float') {
                oRenderManager.addClass('uteTextField-float');
            }
            oRenderManager.addStyle('width', oTextField.getWidth());
            oRenderManager.writeStyles();
            oRenderManager.writeClasses();
            oRenderManager.write('>');

            oRenderManager.write('<input');
            
            // Attributes
            oRenderManager.writeAttribute('id', oTextField.getId() + '-input');
            oRenderManager.writeAttribute('name', oTextField.getName());
            if (oTextField.getFieldType() === 'Float') {
                oRenderManager.writeAttribute('required');
            }
            if (oTextField.getValue()) {
                oRenderManager.writeAttribute('value', oTextField.getValue());
            }
            if (!oTextField.getEditable()) {
                oRenderManager.writeAttribute('readonly', '');
            }
            if (oTextField.getMaxLength()) {
		        oRenderManager.writeAttribute("maxLength", oTextField.getMaxLength());
	        }
            oRenderManager.addClass('uteTextField-float-input');
            oRenderManager.writeClasses();
            oRenderManager.write('>');

            // Implement Placeholder
            if(oTextField.getFieldType() === 'Float' && oTextField.getPlaceholder()) {
            	oRenderManager.write('<label');
            	oRenderManager.writeAttribute('for', oTextField.getName());
            	oRenderManager.addClass('uteTextField-float-label');
            	oRenderManager.writeClasses();
            	oRenderManager.write('>');
            	oRenderManager.write(oTextField.getPlaceholder());
            	oRenderManager.write('</label>');
            }
            

            oRenderManager.write('</span>');
		};

		return TextFieldRenderer;

	},

	true
);
