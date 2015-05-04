/*globals sap*/
/*jslint nomen:true*/
sap.ui.define(['jquery.sap.global'],
	function (jQuery) {
        "use strict";

        var ToggleButtonRenderer = {},
            bUseIconFont;

        ToggleButtonRenderer.render = function (rm, oToggleButton) {
            rm.write('<div');
            rm.writeControlData(oToggleButton);
            rm.addStyle('width', this._calTotalWidth(oToggleButton));
            if(oToggleButton.getHeight()){
                rm.addStyle('height', this.getHeight());
            }
            rm.addClass('uteToggleBtn');
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            
            rm.write("<input id=\"__leftBt\" type=\"button\" width=\"500px\" value=\"" + oToggleButton.getLeftBtnText() + "\"");
            rm.addClass('uteToggleBtn-leftBtn');
            rm.addStyle("width", oToggleButton.getLeftBtnWidth() );
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            rm.write("<input id=\"__rightBt\" type=\"button\" value=\"" + oToggleButton.getRightBtnText() + "\"");
            rm.addClass("uteUiToggleRightButton");
            rm.addStyle("width", oToggleButton.getRightBtnWidth() );
            rm.writeStyles();
            rm.writeClasses();
            rm.write(">");
            
            rm.write("</div>") ;
            //rm.addClass("
        };
    
        ToggleButtonRenderer._calTotalWidth = function (oToggleButton){
            var leftButtonNum = parseInt(oToggleButton.getLeftBtnWidth().replace(/\D/g,'')),
                rightButtonNum =  parseInt(oToggleButton.getRightBtnWidth().replace(/\D/g,'')),
                widthUnit =  oToggleButton.getLeftBtnWidth().replace(/[^A-Za-z]/g, ""),
                totalWidth;
            
            totalWidth = String( (leftButtonNum + rightButtonNum + 3) ) + widthUnit ;
            return totalWidth ;
        };

        
        ToggleButtonRenderer.toggle= function (oToggleButton) {
            if( oToggleButton.$().children().first().attr('class') === "uteUiToggleLeftButtonSelected" ){
                
                oToggleButton.$().children().first().removeClass("uteUiToggleLeftButtonSelected");
                oToggleButton.$().children().first().addClass("uteUiToggleLeftButton") ;
                
                oToggleButton.$().children().first().next().removeClass("uteUiToggleRightButton");
                oToggleButton.$().children().first().next().addClass("uteUiToggleRightButtonSelected");
                
            }
            else{
                oToggleButton.$().children().first().removeClass("uteUiToggleLeftButton");
                oToggleButton.$().children().first().addClass("uteUiToggleLeftButtonSelected") ;
                
                oToggleButton.$().children().first().next().removeClass("uteUiToggleRightButtonSelected");
                oToggleButton.$().children().first().next().addClass("uteUiToggleRightButton");
            }
        };
    
        return ToggleButtonRenderer;
    
    }, /* bExport= */ true);
