/*globals sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var BadgeRenderer = {};

        BadgeRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            
            oRm.addClass('uteBadge');
            
            switch (oControl.getType()) {
            case ute.ui.commons.BadgeType.Alert:
                oRm.addClass('uteBadge-alert');
                break;
            case ute.ui.commons.BadgeType.Attention:
                oRm.addClass('uteBadge-attention');
                break;
            case ute.ui.commons.BadgeType.Regular:
                oRm.addClass('uteBadge-regular');
                break;
            default:
                oRm.addClass('uteBadge-regular');
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

    },

    false
);

/*
<div class="uteBadge attention">RHS</div>    
*/
