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
            rm.addClass('uteToggleBtn');
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            
            rm.write("<input id=\"__leftBt\" type=\"button\" width=\"500px\" value=\"" + oToggleButton.getLeftBtnText() + "\"");
            rm.addClass('uteToggleBtn-leftBtn-selected');
            rm.addStyle("width", oToggleButton.getLeftBtnWidth());
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            rm.write("<input id=\"__rightBt\" type=\"button\" value=\"" + oToggleButton.getRightBtnText() + "\"");
            rm.addClass("uteToggleBtn-rightBtn");
            rm.addStyle("width", oToggleButton.getRightBtnWidth());
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            
            rm.write("</div>");
            //rm.addClass("
        };
    
        ToggleButtonRenderer._calTotalWidth = function (oToggleButton) {
            var leftButtonNum = parseInt(oToggleButton.getLeftBtnWidth().replace(/\D/g, ''), 10),
                rightButtonNum =  parseInt(oToggleButton.getRightBtnWidth().replace(/\D/g, ''), 10),
                widthUnit =  oToggleButton.getLeftBtnWidth().replace(/[^A-Za-z]/g, ""),
                totalWidth;
            
            totalWidth = String((leftButtonNum + rightButtonNum + 3)) + widthUnit;
            return totalWidth;
        };

        
        ToggleButtonRenderer.toggle = function (oToggleButton) {
            if (oToggleButton.$().children().first().attr('class') === "uteToggleBtn-leftBtn-selected") {
                
                oToggleButton.$().children().first().removeClass("uteToggleBtn-leftBtn-selected");
                oToggleButton.$().children().first().addClass("uteToggleBtn-leftBtn");
                
                oToggleButton.$().children().first().next().removeClass("uteToggleBtn-rightBtn");
                oToggleButton.$().children().first().next().addClass("uteToggleBtn-rightBtn-selected");
                
            } else {
                oToggleButton.$().children().first().removeClass("uteToggleBtn-leftBtn");
                oToggleButton.$().children().first().addClass("uteToggleBtn-leftBtn-selected");
                
                oToggleButton.$().children().first().next().removeClass("uteToggleBtn-rightBtn-selected");
                oToggleButton.$().children().first().next().addClass("uteToggleBtn-rightBtn");
            }
        };
    
        return ToggleButtonRenderer;
    
    }, /* bExport= */ true);
