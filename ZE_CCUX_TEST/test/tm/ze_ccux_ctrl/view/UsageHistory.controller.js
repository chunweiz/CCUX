/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'test/tm/ze_ccux_ctrl/view/UsageHistoryChart',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, CustomChart, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.UsageHistory');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { meterReadDate: '3/12/2015', kwhUsage: 1287, avgHighTemp: 46 },
                    { meterReadDate: '2/11/2015', kwhUsage: 1312, avgHighTemp: 45 },
                    { meterReadDate: '1/12/2015', kwhUsage: 1575, avgHighTemp: 51 },
                    { meterReadDate: '12/11/2014', kwhUsage: 889, avgHighTemp: 31 },
                    { meterReadDate: '11/11/2014', kwhUsage: 724, avgHighTemp: 26 },
                    { meterReadDate: '10/13/2014', kwhUsage: 1326, avgHighTemp: 44 },
                    { meterReadDate: '9/12/2014', kwhUsage: 2225, avgHighTemp: 77 },
                    { meterReadDate: '8/13/2014', kwhUsage: 1892, avgHighTemp: 68 },
                    { meterReadDate: '7/15/2014', kwhUsage: 1825, avgHighTemp: 59 },
                    { meterReadDate: '6/13/2014', kwhUsage: 1277, avgHighTemp: 43 },
                    { meterReadDate: '5/13/2014', kwhUsage: 779, avgHighTemp: 25 }
                ]
            }));
        };

        return CustomController;
    }
);
