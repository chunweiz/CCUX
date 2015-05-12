/*global sap*/
/*jslint nomen: true */


sap.ui.define(['jquery.sap.global', './DatePicker', 'ute/ui/commons/TextfieldRenderer'],
	function (jQuery, DatePicker, TextFieldRenderer) {
        "use strict";

        /*
         * DatePickerRenderer is extending TextFieldRenderer
         */
        var DatePickerRenderer = sap.ui.core.Renderer.extend(TextFieldRenderer);

        /*
         * Overriding TextFieldRenderer to include the value attribute to Datepicker.
         */
        TextFieldRenderer.render = function (oRm, oTextfield) {

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
                oRm.writeAttribute('placeholder', oTextfield.getPlaceholder());
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
                oRm.writeAttribute('placeholder', oTextfield.getPlaceholder());
                oRm.write(" value=\"");
				oRm.writeEscaped(oTextfield.getValue());
                oRm.write("\"");
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

        /*
         * DatePickerRenderer Method to include the Icon to launch the Calendar control in the pop-up.
         */
        DatePickerRenderer.renderOuterContentBefore = function (rm, DatePicker) {

            rm.write("<div");
            rm.writeControlData(DatePicker);
            rm.writeAttribute('tabindex', '-1'); // to do not close popup by click on it
            rm.addClass("uteDatePicIcon");
            rm.writeClasses();
            rm.write("></div>"); //No Symbol for HCB Theme, as done by ComboBox.

        };
        return DatePickerRenderer;

    }, /* bExport= */ true);
