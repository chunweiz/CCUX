/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Renderer',
        'sap/ui/core/ValueStateSupport'
    ],

	function (jQuery, Renderer, ValueStateSupport) {
        'use strict';

	    var TextfieldRenderer = {};

	    TextfieldRenderer.render = function (oRm, oTextfield) {

            oRm.write('<span');
            oRm.addClass('uteTextfield');
            oRm.writeClasses();
            oRm.write('>');

            if (oTextfield.getFieldType() === 'Underlined') {
                if (oTextfield.getLabel()) {
                    oRm.write('<label');
                    oRm.addClass('uteTextfield-underlined-label');
                    oRm.writeClasses();
                    oRm.write('>');
                    oRm.write(oTextfield.getLabel() + ':');
                    oRm.write('</label>');
                }
                oRm.write('<input');
                oRm.writeControlData(oTextfield);
                oRm.writeAttribute('id', oTextfield.getId());
                oRm.writeAttribute('name', oTextfield.getName());
                if (oTextfield.getValue()) {
                    oRm.writeAttribute('value', oTextfield.getValue());
                } else {
                    oRm.writeAttribute('placeholder', oTextfield.getPlaceholder());
                }
                oRm.addStyle('width', oTextfield.getWidth());
                oRm.addClass('uteTextfield-underlined-input');
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write('>');
            } else {       //default situation, so not specified as type "underlined"
                oRm.write('<input');
                oRm.writeControlData(oTextfield);
                oRm.writeAttribute('id', oTextfield.getId());
                oRm.writeAttribute('name', oTextfield.getName());
                if (oTextfield.getValue()) {
                    oRm.writeAttribute('value', oTextfield.getValue());
                } else {
                    oRm.writeAttribute('placeholder', oTextfield.getPlaceholder());
                }
                oRm.addStyle('width', oTextfield.getWidth());
                oRm.addClass('uteTextfield-regular');
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write('>');
            }

            if (this.renderOuterContentBefore) {
                this.renderOuterContentBefore(oRm, oTextfield);
            }

            oRm.write('</span>');
        };


	    return TextfieldRenderer;

    },

    true
);
