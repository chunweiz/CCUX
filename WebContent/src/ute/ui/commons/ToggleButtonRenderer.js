/*globals sap*/
/*jslint nomen:true*/
/*jslint regexp: true*/
sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var ToggleButtonRenderer = {},
            bUseIconFont;

        ToggleButtonRenderer.render = function (rm, oToggleButton) {
            rm.write('<div');
            rm.writeControlData(oToggleButton);
            rm.addStyle('width', this._calTotalWidth(oToggleButton));
            if (oToggleButton.getHeight()) {
                rm.addStyle('height', this.getHeight());
            }
            switch (oToggleButton.getToggleButtonType()) {
            case 'ToggleDesign1':
                rm.addClass('uteToggleBtn1');
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");

                rm.write("<input id=\"__leftBt\" type=\"button\" width=\"500px\" value=\"" + oToggleButton.getLeftBtnText() + "\"");
                rm.addClass('uteToggleBtn1-leftBtn-selected');
                rm.addStyle("width", oToggleButton.getLeftBtnWidth());
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");
                rm.write("<input id=\"__rightBt\" type=\"button\" value=\"" + oToggleButton.getRightBtnText() + "\"");
                rm.addClass("uteToggleBtn1-rightBtn");
                rm.addStyle("width", oToggleButton.getRightBtnWidth());
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");
                break;
            case 'ToggleDesign2':
                rm.addClass('uteToggleBtn2');
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");

                rm.write("<input id=\"__leftBt\" type=\"button\" width=\"500px\" value=\"" + oToggleButton.getLeftBtnText() + "\"");
                rm.addClass('uteToggleBtn2-leftBtn-selected');
                rm.addStyle("width", oToggleButton.getLeftBtnWidth());
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");
                rm.write("<input id=\"__rightBt\" type=\"button\" value=\"" + oToggleButton.getRightBtnText() + "\"");
                rm.addClass("uteToggleBtn2-rightBtn");
                rm.addStyle("width", oToggleButton.getRightBtnWidth());
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");

                break;
            }


            rm.write("</div>");

        };

        ToggleButtonRenderer._calTotalWidth = function (oToggleButton) {
            var leftButtonNum = parseInt(oToggleButton.getLeftBtnWidth().replace(/\D/g, ''), 10),
                rightButtonNum =  parseInt(oToggleButton.getRightBtnWidth().replace(/\D/g, ''), 10),
                widthUnit =  oToggleButton.getLeftBtnWidth().replace(/[^A-Za-z]/g, ""),
                totalWidth;

            totalWidth = String((leftButtonNum + rightButtonNum + 5)) + widthUnit;
            return totalWidth;
        };


        ToggleButtonRenderer.toggle = function (oToggleButton) {
            switch (oToggleButton.getToggleButtonType()) {
            case 'ToggleDesign1':
                if (oToggleButton.$().children().first().attr('class') === "uteToggleBtn1-leftBtn-selected") {

                    oToggleButton.$().children().first().removeClass("uteToggleBtn1-leftBtn-selected");
                    oToggleButton.$().children().first().addClass("uteToggleBtn1-leftBtn");
                    oToggleButton.$().children().first().next().removeClass("uteToggleBtn1-rightBtn");
                    oToggleButton.$().children().first().next().addClass("uteToggleBtn1-rightBtn-selected");
                } else {
                    oToggleButton.$().children().first().removeClass("uteToggleBtn1-leftBtn");
                    oToggleButton.$().children().first().addClass("uteToggleBtn1-leftBtn-selected");
                    oToggleButton.$().children().first().next().removeClass("uteToggleBtn1-rightBtn-selected");
                    oToggleButton.$().children().first().next().addClass("uteToggleBtn1-rightBtn");

                }
                break;
            case 'ToggleDesign2':
                if (oToggleButton.$().children().first().attr('class') === "uteToggleBtn2-leftBtn-selected") {

                    oToggleButton.$().children().first().removeClass("uteToggleBtn2-leftBtn-selected");
                    oToggleButton.$().children().first().addClass("uteToggleBtn2-leftBtn");
                    oToggleButton.$().children().first().next().removeClass("uteToggleBtn2-rightBtn");
                    oToggleButton.$().children().first().next().addClass("uteToggleBtn2-rightBtn-selected");
                } else {
                    oToggleButton.$().children().first().removeClass("uteToggleBtn2-leftBtn");
                    oToggleButton.$().children().first().addClass("uteToggleBtn2-leftBtn-selected");
                    oToggleButton.$().children().first().next().removeClass("uteToggleBtn2-rightBtn-selected");
                    oToggleButton.$().children().first().next().addClass("uteToggleBtn2-rightBtn");

                }
                break;
            }

        };

        return ToggleButtonRenderer;

    }, /* bExport= */ true);
