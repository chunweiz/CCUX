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
                            dataEntry.Period = dataEntry.Period.substring(3);
                            dataEntry.Amount = "$" + parseFloat(dataEntry.Amount);
                            dataEntry.Consumption = parseFloat(dataEntry.Consumption);
                            dataEntry.AdjAmount = "";
                            aHistoryData.push(dataEntry);
                        }
                        oHistoryModel.setData(aHistoryData);
                        oHistoryModel.setProperty('/estAmount', "$" + parseFloat(oData.results[0].Estimate).toFixed(2));
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
                    if (oData.ABPAct === "Y") {
                        oEligibilityModel.setProperty('/Activated', true);
                        oEligibilityModel.setProperty('/NonActivated', false);
                    } else {
                        oEligibilityModel.setProperty('/Activated', false);
                        oEligibilityModel.setProperty('/NonActivated', true);
                    }
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
                    urlParameters : oPayload,
                    success : function (oData, response) {
                        if (oData.Code === "S") {
                            oHistoryModel.setProperty('/estAmount', "$" + parseFloat(oData.Message));
                        } else {
                            ute.ui.main.Popup.Alert({
                                title: 'Request failed',
                                message: oData.Message
                            });
                        }
                    }.bind(this),
                    error: function (oError) {
                        ute.ui.main.Popup.Alert({
                            title: 'Request failed',
                            message: 'The request cannot be sent due to the network or the oData service.'
                        });
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
                        if (oData.Code === "S") {
                            ute.ui.main.Popup.Alert({
                                title: 'Success',
                                message: 'ABP enrollment success.'
                            });
                            this._retrieveABPEligibility(this._coNum);
                        } else {
                            ute.ui.main.Popup.Alert({
                                title: 'Request failed',
                                message: oData.Message
                            });
                        }
                    }.bind(this),
                    error: function (oError) {
                        ute.ui.main.Popup.Alert({
                            title: 'Request failed',
                            message: 'The request cannot be sent due to the network or the oData service.'
                        });
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
                        if (oData.Code === "S") {
                            ute.ui.main.Popup.Alert({
                                title: 'Success',
                                message: 'You have canceled the ABP successfully.'
                            });
                            this._retrieveABPEligibility(this._coNum);
                        } else {
                            ute.ui.main.Popup.Alert({
                                title: 'Request failed',
                                message: oData.Message
                            });
                        }
                    }.bind(this),
                    error: function (oError) {
                        ute.ui.main.Popup.Alert({
                            title: 'Request failed',
                            message: 'The request cannot be sent due to the network or the oData service.'
                        });
                    }.bind(this)
                };
                oModel.callFunction("/ABPCanc", mParameters);
            }
        };

        Controller.prototype._onAvgBillBtnClicked = function () {
            var oEligibilityModel = this.getView().getModel('oEligibility'),
                oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            if (this._coNum) {

                // Check if the user is eligible for ABP.
                if (oEligibilityModel.oData.ABPElig === "Y") {
                    if (oEligibilityModel.oData.ABPAct === "Y") {
                        oWebUiManager.notifyWebUi('openIndex', {
                            LINK_ID: "Z_AVGBIL_D"
                        });
                    } else {
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
                    }
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
                    if (this._aYearList.indexOf(parts[2]) < 0) {
                        this._aYearList.push(parts[2]);
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
