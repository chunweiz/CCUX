/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        './Icon'
    ],

    function (UIComponent, Icon) {
        'use strict';

        var CustomComponent = UIComponent.extend('test.tm.ze_ccux_ctrl.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
            Icon.load();
        };

        return CustomComponent;
    }
);
