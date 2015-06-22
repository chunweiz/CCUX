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

            switch (oDropdown.getDesign().toLowerCase()) {
             case 'default':
                oRm.addClass('uteDD-arrow-hollow');
                oRm.addClass('uteDD-with-border');
                oRm.addClass('uteDD-background-white');
                oRm.addClass('uteDD-arrow-blue');

                break;

            }
            oRm.writeClasses();
            oRm.addStyle('width', '200px');
            oRm.addStyle('padding', '20px');
            oRm.writeStyles();
            oRm.write('>');

    /*        oRm.write('<a');
            oRm.addClass('uteDD-value');

            if (oDropdown.getValue() === '') {
                oRm.writeEscaped(oDropdown.getTitle());
            } else {
                var oItem1 = oDropdown.getDropdownListItem()[1];
                 for (var j = 0; j < oItem1.getContent().length; j++) {
                    var oContent = oItem1.getContent()[j];
                    oRm.renderControl(oContent);
                }
            }

            oRm.write('</a>');*/

            this._renderContent(oRm, oDropdown);

            oRm.write("</ul>");
            oRm.write('</nav>');

            };

     DropdownRenderer._renderContent = function (oRm, oCustomControl) {
            var aContent = oCustomControl.getContent() || [];

            aContent.forEach(function (oContent) {
                if (oContent instanceof nb.control.lib.ui.DropdownListItem) {
                    oContent.setGroup(oCustomControl.getId() + '--grp');
                    oCustomControl._attachItemPress(oContent);
                }

                oRm.renderControl(oContent);
            });
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
