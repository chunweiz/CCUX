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
            if (oDropdown.getEnabled()) {
                if (oDropdown.getWhitebackground()) {
                    oRm.addClass('uteDD-white-background');
                }
            else {
                oRm.addClass('uteDD-grey-background');
            }
           }
          //  oRm.addClass('uteDD-solid-arrow');
         //   oRm.addClass('uteDD-solid-arrow');
            if (oDropdown.getArrowcolor() === "Blue") {
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

            oRm.addStyle('top', this._calTop(oDropdown));
            oRm.writeStyles();
            if (oDropdown.getBorder()) {
                oRm.addClass('uteDD-list-with-border');
            }
            if (oDropdown.getWhitebackground()) {
                oRm.addClass('uteDD-list-white-background');
            }


            oRm.writeClasses();

            oRm.write('>');
            for (var i = 0; i < oDropdown.getItems().length; i++) {
				var oItem = oDropdown.getItems()[i];
				oRm.write("<li");
                if(oDropdown.getArrowcolor() === "Blue"){
                oRm.addClass('uteDD-list-hover-blue');
                } else {
                    oRm.addClass('uteDD-list-hover-grey');
                }
                oRm.writeClasses();
                oRm.write("><a>");
                oRm.writeEscaped(oItem.getText());
                oRm.write("</a></li>");
            }
			oRm.write("</ul></div></div>");


            };
      DropdownRenderer._calTop = function (oDropdown) {
            var top = parseInt(oDropdown.getPadding().replace(/\D/g, ''), 10),
                totalTop;

            totalTop = String((top + 75)) + "%";

            return totalTop;
        };

        return DropdownRenderer;
    },

    true
);


