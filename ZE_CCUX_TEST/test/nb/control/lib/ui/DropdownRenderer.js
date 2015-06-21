/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', 'sap/ui/core/ValueStateSupport'],
    function (jQuery, Renderer, ValueStateSupport) {
        "use strict";
        var DropdownRenderer = {};

        DropdownRenderer.render = function (oRm, oDropdown) {

            oRm.write('<nav>');
            oRm.write('<ul');
            oRm.writeControlData(oDropdown);
            oRm.writeAttributeEscaped("id", 'dd');
            oRm.addClass('uteDD');
            /*oRm.addClass('uteMDd-design-' + oCustomControl.getDesign().toLowerCase());*/

            switch (oCustomControl.getDesign().toLowerCase()) {
             case 'Default':
                oRm.addClass('uteDD-arrow-hollow');
                oRm.addClass('uteDD-with-border');
                oRm.addClass('uteDD-background-white');
                oRm.addClass('uteDD-arrow-blue');

                break;

            }


            oRm.writeClasses();

            if (oDropdown.getWidth()) {
                oRm.addStyle('width', '200px');
            }
            if (oDropdown.getPadding()) {
                oRm.addStyle('padding', '20px');
            }
            oRm.writeStyles();
            oRm.write('>');

            oRm.write('<a');
            oRm.addClass('uteDD-value');

            if (oDropdown.getValue() === '') {
                oRm.writeEscaped(oDropdown.getTitle());
            } else {
                var oItem1 = oDropdown.getDropdownListItems()[1];
                 for (var j = 0; j < oItem1.getContent().length; j++) {
                    var oContent = oItem1.getContent()[j];
                    oRm.renderControl(oContent);
                }
            }

            oRm.write('</a>');

            oRm.write("</ul>");
            oRm.write('</nav>');

            };
      DropdownRenderer._calTop = function (oDropdown) {
            var top = parseInt('20px'.replace(/\D/g, ''), 10),
                totalTop;

            totalTop = String((top + 110)) + "%";

            return totalTop;
        };

        return DropdownRenderer;
    },

    true
);
