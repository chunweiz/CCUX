/*globals sap, ute*/

sap.ui.define([],
    function () {
        'use strict';

        var BadgeRenderer = {};

        BadgeRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            
            oRm.addClass('uteBadge');
            
            switch (oControl.getType()) {
            case ute.ui.commons.BadgeType.Alert:
                oRm.addClass('uteBadgeAlert');
                break;
            case ute.ui.commons.BadgeType.Attention:
                oRm.addClass('uteBadgeAttention');
                break;
            case ute.ui.commons.BadgeType.Regular:
                oRm.addClass('uteBadgeRegular');
                break;
            default:
                oRm.addClass('uteBadgeRegular');
            }
            
            oRm.writeClasses();
            
            oRm.addStyle('height', oControl.getHeight());
            oRm.addStyle('line-height', oControl.getHeight());
            oRm.addStyle('width', oControl.getWidth());
            oRm.writeStyles();
            
            oRm.write('>');
            oRm.writeEscaped(oControl.getText());
            oRm.write('</div>');
        };

        return BadgeRenderer;

    }, true);

/*
<div class="uteBadge attention">RHS</div>    
*/