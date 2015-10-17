/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/Fragment',
        'sap/ui/model/json/JSONModel',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, Fragment, JSONModel, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.BillingCheckbookTools');

        Controller.prototype.onInit = function ()
        {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing-avgplan'), 'oDataAvgSvc');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEligibility');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oUsageGraph');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAmountBtn');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oAmountHistory');

            this._aYearList = [];
            this._aGraphClors = ['blue', 'gray', 'yellow'];
        };

        Controller.prototype.onBeforeRendering = function () {
            // Retrieve routing parameters
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            // Retrieve the data for table
            this._retrieveTableInfo(this._coNum);
            // Retrieve the data for graph
            this._retrieveGraphInfo(this._coNum);
            // Retrieve the eligibility for ABP
            this._retrieveABPEligibility(this._coNum);
        };

        Controller.prototype.onAfterRendering = function ()
		{

        };

        /*------------------------------------------------ Retrieve Methods -------------------------------------------------*/

        Controller.prototype._retrieveTableInfo = function (sCoNumber) {
            var sPath = '/AvgAddS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNumber}));

            var oModel = this.getView().getModel('oDataAvgSvc'),
                oHistoryModel = this.getView().getModel('oAmountHistory'),
                aHistoryData = [],
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results) {
                        for (var i = 0; i < oData.results.length; i++) {
                            var dataEntry = {};
                            dataEntry = oData.results[i];
                            dataEntry.Amount = "$" + parseFloat(dataEntry.Amount);
                            dataEntry.Consumption = parseFloat(dataEntry.Consumption);
                            dataEntry.AdjAmount = "";
                            aHistoryData.push(dataEntry);
                        }
                        oHistoryModel.setData(aHistoryData);
                        oHistoryModel.setProperty('/estAmount', "$" + parseFloat(oData.results[0].Estimate));
                    } else {
                        
                    }
                }.bind(this),
                error: function (oError) {
                
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrieveGraphInfo = function (sCoNumber) {
            var sPath = '/AvgUsgS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNumber}));

            var oModel = this.getView().getModel('oDataAvgSvc'),
                oGraphModel = this.getView().getModel('oUsageGraph'),
                aGraphData = [],
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results) {  
                        for (var i = 0; i < oData.results.length; i++) {
                            var dataEntry = {};
                            dataEntry.usageDate = oData.results[i].Period;
                            dataEntry.usage = parseInt(oData.results[i].Consumption);
                            aGraphData.push(dataEntry);
                        }
                        oGraphModel.setProperty('/data', aGraphData);
                    } else {
                        
                    }
                }.bind(this),
                error: function (oError) {
                
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
            
        };

        Controller.prototype._retrieveABPEligibility = function (sCoNumber) {
            var sPath = '/EligibilityS' + '(\'' + sCoNumber + '\')',
                oModel = this.getView().getModel('oDataAvgSvc'),
                oEligibilityModel = this.getView().getModel('oEligibility'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    oEligibilityModel.setData(oData);
                    // if (oData.ABPAct === "Y") {
                    //     oEligibilityModel.setProperty('/Activated', true);
                    //     oEligibilityModel.setProperty('/NonActivated', false);
                    // } else {
                    //     oEligibilityModel.setProperty('/Activated', false);
                    //     oEligibilityModel.setProperty('/NonActivated', true);
                    // }
                }.bind(this),
                error: function (oError) {
                
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        /*------------------------------------------------- Button Actions --------------------------------------------------*/

        Controller.prototype._onCancelBtnClick = function () {
            this._oAvgBillPopup.close();
        };

        Controller.prototype._onCalBtnClick = function () {
            var oModel = this.getView().getModel('oDataAvgSvc'),
                oHistoryModel = this.getView().getModel('oAmountHistory'),
                oPayload = {},
                mParameters;

            oPayload.Contract = this._coNum;
            for (var i = 0; i < oHistoryModel.oData.length; i++) {
                var periodParameterName = 'Prd' + this._pad(i+1);
                var basisParameterName = 'Bbs' + this._pad(i+1);
                var adjustParameterName = 'Amt' + this._pad(i+1);

                oPayload[periodParameterName] = oHistoryModel.oData[i].Period;
                oPayload[basisParameterName] = oHistoryModel.oData[i].Basis;
                oPayload[adjustParameterName] = (parseFloat(oHistoryModel.oData[i].AdjAmount) || 0).toString();
            }

            if (oModel) {
                mParameters = {
                    method : "POST",
                    // urlParameters : {
                    //     "Contract": this._coNum,
                    //     "Prd01": oPayload.Prd01,
                    //     "Prd02": oPayload.Prd02,
                    //     "Prd03": oPayload.Prd03,
                    //     "Prd04": oPayload.Prd04,
                    //     "Prd05": oPayload.Prd05,
                    //     "Prd06": oPayload.Prd06,
                    //     "Prd07": oPayload.Prd07,
                    //     "Prd08": oPayload.Prd08,
                    //     "Prd09": oPayload.Prd09,
                    //     "Prd10": oPayload.Prd10,
                    //     "Prd11": oPayload.Prd11,
                    //     "Prd12": oPayload.Prd12,
                    //     "Amt01": parseFloat(oPayload.Amt01) || 0,
                    //     "Amt02": parseFloat(oPayload.Amt02) || 0,
                    //     "Amt03": parseFloat(oPayload.Amt03) || 0,
                    //     "Amt04": parseFloat(oPayload.Amt04) || 0,
                    //     "Amt05": parseFloat(oPayload.Amt05) || 0,
                    //     "Amt06": parseFloat(oPayload.Amt06) || 0,
                    //     "Amt07": parseFloat(oPayload.Amt07) || 0,
                    //     "Amt08": parseFloat(oPayload.Amt08) || 0,
                    //     "Amt09": parseFloat(oPayload.Amt09) || 0,
                    //     "Amt10": parseFloat(oPayload.Amt10) || 0,
                    //     "Amt11": parseFloat(oPayload.Amt11) || 0,
                    //     "Amt12": parseFloat(oPayload.Amt12) || 0,
                    //     "Bbs01": parseFloat(oPayload.Bbs01) || 0,
                    //     "Bbs02": parseFloat(oPayload.Bbs02) || 0,
                    //     "Bbs03": parseFloat(oPayload.Bbs03) || 0,
                    //     "Bbs04": parseFloat(oPayload.Bbs04) || 0,
                    //     "Bbs05": parseFloat(oPayload.Bbs05) || 0,
                    //     "Bbs06": parseFloat(oPayload.Bbs06) || 0,
                    //     "Bbs07": parseFloat(oPayload.Bbs07) || 0,
                    //     "Bbs08": parseFloat(oPayload.Bbs08) || 0,
                    //     "Bbs09": parseFloat(oPayload.Bbs09) || 0,
                    //     "Bbs10": parseFloat(oPayload.Bbs10) || 0,
                    //     "Bbs11": parseFloat(oPayload.Bbs11) || 0,
                    //     "Bbs12": parseFloat(oPayload.Bbs12) || 0
                    // },
                    urlParameters : oPayload,
                    success : function (oData, response) {
                        console.log('5566520', oData, response);
                    }.bind(this),
                    error: function (oError) {
                        console.log('7788520', oError);
                    }.bind(this)
                };
                oModel.callFunction("/ABPCalc", mParameters);
            }
        };

        Controller.prototype._onSetBtnClick = function () {
            var oModel = this.getView().getModel('oDataAvgSvc'),
                oHistoryModel = this.getView().getModel('oAmountHistory'),
                mParameters;

            if (oModel) {
                mParameters = {
                    method : "POST",
                    urlParameters : {
                        "Contract": this._coNum,
                        "Date": oHistoryModel.oData[oHistoryModel.oData.length - 1].Period
                    },
                    success : function (oData, response) {
                        console.log('5566520', oData, response);
                    }.bind(this),
                    error: function (oError) {
                        console.log('7788520', oError);
                    }.bind(this)
                };
                oModel.callFunction("/ABPCrte", mParameters);
            }
        };

        Controller.prototype._onDeactBtnClick = function () {
            var oModel = this.getView().getModel('oDataAvgSvc'),
                oHistoryModel = this.getView().getModel('oAmountHistory'),
                mParameters;

            if (oModel) {
                mParameters = {
                    method : "POST",
                    urlParameters : {
                        "Contract": this._coNum
                    },
                    success : function (oData, response) {
                        console.log('5566520', oData, response);
                    }.bind(this),
                    error: function (oError) {
                        console.log('7788520', oError);
                    }.bind(this)
                };
                oModel.callFunction("/ABPCanc", mParameters);
            }
        };

        Controller.prototype._onAvgBillBtnClicked = function () {
            var oEligibilityModel = this.getView().getModel('oEligibility');

            if (this._coNum) {

                // Check if the user is eligible for ABP.
                if (oEligibilityModel.oData.ABPElig === "Y") {
                    if (oEligibilityModel.oData.ABPAct === "Y") {
                        // Scenario 1
                    } else {
                        // Scenario 2
                    }

                    if (!this._oAvgBillPopup) {
                        this._oAvgBillPopup = ute.ui.main.Popup.create({
                            content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.billing.view.AverageBillingPlan", this),
                            title: 'AVERAGE BILLING PLAN'
                        });
                        this._oAvgBillPopup.addStyleClass('nrgBilling-avgBillingPopup');
                        this.getView().addDependent(this._oAvgBillPopup);
                        // Render the graph
                        this.byId("chart").setDataModel(this.getView().getModel('oUsageGraph'));
                        // Render the graph crontrol buttons
                        this._renderGraphCrontrolBtn();
                    }
                    this._oAvgBillPopup.open();

                } else {
                    ute.ui.main.Popup.Alert({
                        title: 'Not Eligible',
                        message: 'You are not eligible for Average Billing Plan.'
                    });
                }
            } else {
                ute.ui.main.Popup.Alert({
                    title: 'Contract Not Found',
                    message: 'Contract number is not found in the routing.'
                });
            }
        };

        Controller.prototype.onSelected = function (oEvent) {
            var oCheckbox = oEvent.getSource(),
                sYear = this._aYearList[parseInt(oCheckbox.getId().replace(this.getView().getId() + '--' + 'nrgBilling-avgBillingPopup-graphControlChkbox-', ''))].toString(),
                bHide = oCheckbox.getChecked(),
                oChart = this.getView().byId('chart');

            if (oChart) {
                oChart.hideUsage(sYear, !bHide);
            }
        };





        Controller.prototype._renderGraphCrontrolBtn = function () {
            var oGraphModel = this.getView().getModel('oUsageGraph');
            
            if (oGraphModel.oData.data.length) {
                for (var i = 0; i < oGraphModel.oData.data.length; i++) {
                    var parts = oGraphModel.oData.data[i].usageDate.split("/");
                    var time = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
                    if (this._aYearList.indexOf(time.getFullYear()) < 0) {
                        this._aYearList.push(time.getFullYear());
                    }
                }
            }

            for (var j = 0; j < this._aYearList.length; j++) {
                this.getView().byId("nrgBilling-avgBillingPopup-graphControlBtn-" + j).setVisible(true);
                this.getView().byId("nrgBilling-avgBillingPopup-graphControlText-" + j).setText(this._aYearList[j]).addStyleClass("usageChartLegend-label-" + this._aGraphClors[j]);
            }

        };

        

        Controller.prototype._pad = function (d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        };


        return Controller;
    }
);
