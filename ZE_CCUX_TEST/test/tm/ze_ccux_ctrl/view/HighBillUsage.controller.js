/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/thirdparty/d3'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.HighBillUsage');

        CustomController.prototype.onAfterRendering = function () {
            var sContainerId = this.getView().byId('content').getId();
            var oData = this._getData();
            var oCanvasDim = this._getCanvasDimension(800, 400);
            var oCanvas = this._getCanvas(sContainerId, oCanvasDim);
            var oScale = this._getScale(oCanvasDim, oData);


        };

        CustomController.prototype._getScale = function (oCanvasDim, oData) {
            var oScale = {};

            var aMinMaxMeterReadDate = d3.extent(oData.usageHistory, function (oRecord) {
                return oRecord.meterReadDate;
            });

            oScale.x = d3.time.scale()
                .domain([])
                .range([0, oCanvasDim.width]);

            var iMaxKwhUsage = d3.max(oData.usageHistory, function (oRecord) {
                return oRecord.kwhUsage;
            });

            oScale.y = d3.scale.linear()
                .domain([0, iMaxKwhUsage])
                .range([oCanvasDim.height, 0]);

            return oScale;
        };

        CustomController.prototype._getCanvas = function (sContainerId, oCanvasDim) {
            return d3.select('#' + sContainerId)
                .append('svg')
                    .attr('width', oCanvasDim.width)
                    .attr('height', oCanvasDim.height);
        };

        CustomController.prototype._getCanvasDimension = function (iWidth, iHeight) {
            var oCanvasDim = {};

            oCanvasDim.margin = { top: 30, right: 20, bottom: 30, left: 50 };
            oCanvasDim.width = iWidth - oCanvasDim.margin.left - oCanvasDim.margin.right;
            oCanvasDim.height = iHeight - oCanvasDim.margin.top - oCanvasDim.margin.bottom;

            return oCanvasDim;
        };

        CustomController.prototype._getData = function () {
            var oData = {};

            oData.usageHistory = [
                { meterReadDate: '03/12/2015', kwhUsage: 1287 },
				{ meterReadDate: '02/11/2015', kwhUsage: 1312 },
				{ meterReadDate: '01/12/2015', kwhUsage: 1575 },
				{ meterReadDate: '12/11/2014', kwhUsage: 889 },
				{ meterReadDate: '11/11/2014', kwhUsage: 724 },
				{ meterReadDate: '10/13/2014', kwhUsage: 1326 },
				{ meterReadDate: '09/12/2014', kwhUsage: 2225 },
				{ meterReadDate: '08/13/2014', kwhUsage: 1892 },
				{ meterReadDate: '07/15/2014', kwhUsage: 1825 },
				{ meterReadDate: '06/13/2014', kwhUsage: 1277 },
				{ meterReadDate: '05/13/2014', kwhUsage: 779 }
            ];

            var fnSAPDateParser = d3.time.format('%x').parse;
			oData.usageHistory.forEach(function (oRecord) {
				oRecord.meterReadDate = fnSAPDateParser(oRecord.meterReadDate);
			}, this);

            return oData;
        };

        return CustomController;
    }
);
