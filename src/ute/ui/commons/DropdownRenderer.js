/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', 'sap/ui/core/ValueStateSupport'],
    function (jQuery, Renderer, ValueStateSupport) {
        "use strict";
        var DropdownRenderer = {};

        DropdownRenderer.render = function (oRm, oDropdown) {
            oRm.write('<div');
            oRm.writeControlData(oDropdown);
            oRm.writeAttributeEscaped("id", 'dd');
            oRm.addClass('uteDD');
            if (oDropdown.getBorder()) {
                oRm.addClass('uteDD-with-border');
            }
            if (oDropdown.getBackgroundcolor() !== "") {
                oRm.addClass('uteDD-white-background');
            }
            oRm.addClass('uteDD-solid-arrow');
            if (oDropdown.getArrowcolor === "Blue") {
                oRm.addClass('uteDD-blue-arrow');
            } else {
                oRm.addClass('uteDD-grey-arrow');
            }
            oRm.writeClasses();
            if (oDropdown.getWidth()) {
                oRm.addStyle('width', oDropdown.getWidth());
            }
            if (oDropdown.getPadding()) {
                oRm.addStyle('padding', oDropdown.getPadding());
            }
            oRm.writeStyles();
            oRm.write('>');
            oRm.write('<span>');
            oRm.writeEscaped(oDropdown.getTitle());
            oRm.write('</span>');
            oRm.write('<ul');
            oRm.addClass('uteDD-list');
            if (oDropdown.getBorder()) {
                oRm.addClass('uteDD-list-with-border');
            }
            if (oDropdown.getBackgroundcolor() !== "") {
                oRm.addClass('uteDD-list-white-background');
            }
            oRm.writeClasses();
            /*oRm.addStyle('top',(oDropdown.getPadding()+50)+'%');*/
            oRm.write('>');
            for (var i = 0; i < oDropdown.getItems().length; i++) {
				var oItem = oDropdown.getItems()[i];
				oRm.write("<li><a>");
                oRm.writeEscaped(oItem.getText());
                oRm.write("</a></li>");
            }
			oRm.write("</ul></div></div>");
            };
        return DropdownRenderer;
    },

    true
);


