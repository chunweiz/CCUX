/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'test/tm/ze_ccux_ctrl/view/CustJourneyChannelChart',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, CustomChart, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.CustJourneyChannel');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().byId('content').removeAllAggregation('content');

            var oCustomChart = new CustomChart().setDataModel(new JSONModel({
                data: [
                    { channel: 'Mail', frequency: 3 },
                    { channel: 'Email', frequency: 3 },
                    { channel: 'Webchat', frequency: 1 },
                    { channel: 'Call', frequency: 5 }
                ]
            }));

            this.getView().byId('content').addContent(oCustomChart);
        };

        return CustomController;
    }
);
