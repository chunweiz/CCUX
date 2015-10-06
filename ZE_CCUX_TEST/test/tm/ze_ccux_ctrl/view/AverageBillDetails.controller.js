/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.AverageBillDetails');

        CustomController.prototype.onInit = function() {
            var sUrl = jQuery.sap.getModulePath('test.tm.ze_ccux_ctrl.view.control.AverageBillDetailsChart', '.css');
            jQuery.sap.includeStyleSheet(sUrl);
        };

        CustomController.prototype.onBeforeRendering = function() {
            this.getView().byId('chart').setDataModel(new JSONModel({
                data: [
                    { usageDate: '07/01/2013', usage: 1456 },
                    { usageDate: '06/01/2013', usage: 1210 },
                    { usageDate: '05/01/2013', usage: 1144 },
                    { usageDate: '04/01/2013', usage: 1357 },
                    { usageDate: '03/01/2013', usage: 1543 },
                    { usageDate: '02/01/2013', usage: 1654 },
                    { usageDate: '01/01/2013', usage: 1356 },
                    { usageDate: '12/01/2014', usage: 1158 },
                    { usageDate: '11/01/2014', usage: 1582 },
                    { usageDate: '10/01/2014', usage: 1055 },
                    { usageDate: '09/01/2014', usage: 1286 },
                    { usageDate: '08/01/2014', usage: 1574 },
                    { usageDate: '07/01/2014', usage: 1258 },
                    { usageDate: '06/01/2014', usage: 1345 },
                    { usageDate: '05/01/2014', usage: 1526 },
                    { usageDate: '04/01/2014', usage: 1712 },
                    { usageDate: '03/01/2014', usage: 1462 },
                    { usageDate: '02/01/2014', usage: 1155 },
                    { usageDate: '01/01/2014', usage: 1018 },
                    { usageDate: '12/01/2015', usage: 1332 },
                    { usageDate: '11/01/2015', usage: 1450 },
                    { usageDate: '10/01/2015', usage: 1280 },
                    { usageDate: '09/01/2015', usage: 1390 },
                    { usageDate: '08/01/2015', usage: 1420 },
                    { usageDate: '07/01/2015', usage: 1380 },
                    { usageDate: '06/01/2015', usage: 1400 },
                    { usageDate: '05/01/2015', usage: 1300 }
                ]
            }));
        };

        CustomController.prototype.onSelected = function (oEvent) {
            var oCheckbox = oEvent.getSource();
            var sYear = oCheckbox.getId().replace(this.getView().getId() + '--', '');
            var bHide = oCheckbox.getChecked();

            var oChart = this.getView().byId('chart');
            if (oChart) {
                oChart.hideUsage(sYear, !bHide);
            }
        };

        return CustomController;
    }
);
