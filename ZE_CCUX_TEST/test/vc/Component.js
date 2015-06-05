/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent'
    ],

    function (UIComponent) {
        'use strict';

        var CustomComponent = UIComponent.extend('vc.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
        };

        return CustomComponent;
    }
);
