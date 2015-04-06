/*globals sap*/

// Provides default renderer for control sap.ui.commons.CheckBox
sap.ui.define(['jquery.sap.global'],
	function (jQuery, ValueStateSupport) {
        "use strict";

        var CheckBoxRenderer = {};
	    CheckBoxRenderer.render = function (rm, oCheckBox) {
            rm.write("<div");
            rm.writeControlData(oCheckBox);
            rm.addClass("uteCheckBox");
            rm.writeClasses();
            rm.write("><input");
            rm.writeAttribute("type", "checkbox");
            rm.writeAttribute("id", oCheckBox.getId());
            if (oCheckBox.getName()) {
                rm.writeAttribute("name", oCheckBox.getName());
            }
            if (oCheckBox.getChecked()) {
                rm.write("checked");
            }
            rm.write("/><label");
            rm.writeAttribute("for", oCheckBox.getId());
            rm.write("></label>");
            if (oCheckBox.getText()) {
                rm.write("<span");
                rm.addClass("uteCheckBoxText");
                rm.writeClasses();
                rm.write(">" + oCheckBox.getText() + "</span>");
            }
            rm.write("</div>");
	    };



	    return CheckBoxRenderer;

    }, /* bExport= */ true);
