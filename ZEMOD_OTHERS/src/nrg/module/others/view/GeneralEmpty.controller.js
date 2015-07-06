/*globals sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/base/component/WebUiManager'
    ],

    function (Controller, WebUiManager) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.others.view.GeneralEmpty');

        CustomController.prototype.onPressed = function (oControlEvent) {
            var oEventBus = sap.ui.getCore().getEventBus();

            oEventBus.publish(WebUiManager.EventBus.Publish.Channel, 'bpConfirmed', {
                bpNum: '0123456789',
                caNum: '9876543210'
            });
        };

        return CustomController;
    }
);
