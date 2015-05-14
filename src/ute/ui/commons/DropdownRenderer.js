/*global sap*/

sap.ui.define([],
    function () {
        "use strict";
        var DropdownRenderer = {},
            i,
            j,
            oItem,
            oContent;

        DropdownRenderer.render = function (oRm, oDropdown) {

            oRm.write('<nav>');
            oRm.write('<ul');
            oRm.writeControlData(oDropdown);
            oRm.writeAttributeEscaped('id', 'dd');
            oRm.addClass('uteDD');
            if (oDropdown.getBorder()) {
                oRm.addClass('uteDD-with-border');
            }
            if (oDropdown.getEnabled()) {
                if (oDropdown.getWhitebackground()) {
                    oRm.addClass('uteDD-white-background');
                } else {
                    oRm.addClass('uteDD-grey-background');
                }
            }

            if (oDropdown.getArrowcolor() === 'Blue') {
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
            oRm.write('<a');
            oRm.addClass('uteDD-value');
            oRm.write('>');
            if (oDropdown.getValue() === '') {
                oRm.writeEscaped(oDropdown.getTitle());
            } else {
                oRm.writeEscaped(oDropdown.getValue());
            }
            oRm.write('</a>');
            oRm.write('<ul');
            oRm.addClass('uteDD-list');
            oRm.addStyle('top', this.calTop(oDropdown));
            oRm.writeStyles();
            if (oDropdown.getBorder()) {
                oRm.addClass('uteDD-list-with-border');
            }
            if (oDropdown.getWhitebackground()) {
                oRm.addClass('uteDD-list-white-background');
            }
            oRm.writeClasses();
            oRm.write('>');
            for (i = 0; i < oDropdown.getDropdownListItems().length; i += 1) {
                oItem = oDropdown.getDropdownListItems()[i];
                oRm.write('<li');
                if (oDropdown.getArrowcolor() === 'Blue') {
                    oRm.addClass('uteDD-list-hover-blue');
                } else {
                    oRm.addClass('uteDD-list-hover-grey');
                }
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('<a>');
                for (j = 0; j < oItem.getContent().length; j += 1) {
                    oContent = oItem.getContent()[j];
                    oRm.renderControl(oContent);
                }
                oRm.write('</a>');
                oRm.write('</li>');
            }
            oRm.write('</ul></ul>');
            oRm.write('</nav>');
        };
        DropdownRenderer.calTop = function (oDropdown) {
            var top = parseInt(oDropdown.getPadding().replace(/\D/g, ''), 10),
                totalTop;
            totalTop = String((top + 110)) + '%';
            return totalTop;
        };
        return DropdownRenderer;
    },
    true
    );


