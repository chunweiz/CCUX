/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.CustJourneyChannel');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { channel: 'Mail', frequency: 3 },
                    { channel: 'Email', frequency: 3 },
                    { channel: 'Webchat', frequency: 1 },
                    { channel: 'Call', frequency: 5 },
                    { channel: 'IVR', frequency: 5 },
                    { channel: 'Web', frequency: 5 }
                ]
            }));
        };

        CustomController.prototype._onTotalPress = function (oEvent) {
            console.log(oEvent);
        };

        CustomController.prototype._onSlicePress = function (oEvent) {
            console.log(oEvent.getParameters());
        };

        return CustomController;
    }
);
