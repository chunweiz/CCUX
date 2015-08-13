/*!
 *  Created on  : Aug 13, 2015
 *  Author      : Jerry (Ya-Chieh) Hsu
 *  Description : Provides renderer ute.ui.commons.Tooltip.
 */

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/commons/CalloutBaseRenderer',
        'sap/ui/core/Renderer'
    ],

    function(jQuery, CalloutBaseRenderer, Renderer) {

        "use strict";

        /**
         * Customized tooltip renderer.
         * @namespace
         */
        var CustomRenderer = Renderer.extend(CalloutBaseRenderer);

        /**
         * Renders the HTML for content.
         */
        CustomRenderer.renderContent = function(oRenderManager, oControl){

            var rm = oRenderManager;
            var content = oControl.getContent();

            // content
            for (var i = 0; i < content.length; i++) {
                rm.renderControl(content[i]);
            }
        };

        /**
         * Add the root CSS class to the Control to redefine/extend CalloutBase
         */
        CustomRenderer.addRootClasses = function(oRenderManager, oControl) {
            oRenderManager.addClass("uteCommonsTooltip");
        };

        /**
         * Add the content CSS class to the Control to redefine/extend CalloutBase
         */
        CustomRenderer.addContentClasses = function(oRenderManager, oControl) {
            oRenderManager.addClass("uteCommonsTooltip-content");
        };

        /**
         * Add the arrow/tip CSS class to the Control to redefine/extend CalloutBase
         */
        CustomRenderer.addArrowClasses = function(oRenderManager, oControl) {
            oRenderManager.addClass("uteCommonsTooltip-arrow");
        };


        return CustomRenderer;

    },

    true
);
