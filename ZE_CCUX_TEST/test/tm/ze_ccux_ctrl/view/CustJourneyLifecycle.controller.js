/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.CustJourneyLifecycle');

        CustomController.prototype.onBeforeRendering = function () {

            this.getView().setModel(new JSONModel({
                data: [
                    { channelType: 'Mail' },
                    { channelType: 'Call' },
                    { channelType: 'Ivr' },
                    { channelType: 'Survey' }
                ]
            }), 'timeline');

        };

        return CustomController;
    }
);
