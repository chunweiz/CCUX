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
                    { channel: 'call', frequency: 5 },
                    { channel: 'mail', frequency: 3 },
                    { channel: 'email', frequency: 3 },
                    { channel: 'webchat', frequency: 1 }
                ]
            }));

            this.getView().byId('content').addContent(oCustomChart);
        };

        return CustomController;
    }
);
