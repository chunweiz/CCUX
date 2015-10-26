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
        };

        Controller.prototype.onAfterRendering = function ()
		{

        };

        /*------------------------------------------------ Retrieve Methods -------------------------------------------------*/
        Controller.prototype._retrieveTableInfo = function (sCoNumber, fnCallback) {
            var sPath = '/AvgAddS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNumber}));

            var oModel = this.getView().getModel('oDataAvgSvc'),
                oHistoryModel = this.getView().getModel('oAmountHistory'),
                aHistoryData = [],
                fTotalAmount,
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results) {
                        for (var i = 0; i < oData.results.length; i++) {
                            if (oData.results[i].Period !== "Total") {
                                var dataEntry = {};
                                var fullPeriod = oData.results[i].Period;
                                dataEntry = oData.results[i];
                                dataEntry.Period = dataEntry.Period.substr(0, 2) + '/' + dataEntry.Period.substr(6, 4);
                                dataEntry.FullPeriod = fullPeriod;
                                dataEntry.ActualBill = "$" + parseFloat(dataEntry.ActualBill);
                                dataEntry.Usage = parseFloat(dataEntry.Usage);
                                dataEntry.AdjAmount = "0.00";
                                dataEntry.AmtUsdAbp = parseFloat(dataEntry.AmtUsdAbp);
                                aHistoryData.push(dataEntry);
                            } else {
                                fTotalAmount = parseFloat(oData.results[i].AmtUsdAbp);
                            }
                        }
                        oHistoryModel.setData(aHistoryData);
                        oHistoryModel.setProperty('/totalAmount', fTotalAmount);
                        oHistoryModel.setProperty('/estAmount', "$" + parseFloat(oData.results[0].Estimate).toFixed(2));

                        if (fnCallback) fnCallback();
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

        Controller.prototype._retrieveGraphInfo = function (sCoNumber, fnCallback) {
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

                        if (fnCallback) fnCallback();
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

        Controller.prototype._retrieveABPEligibility = function (sCoNumber, fnCallback) {
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
                    if (fnCallback) fnCallback();
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

                oPayload[periodParameterName] = oHistoryModel.oData[i].FullPeriod;
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
                        "Date": oHistoryModel.oData[oHistoryModel.oData.length - 1].FullPeriod
                    },
                    success : function (oData, response) {
                        if (oData.Code === "S") {
                            // close the ABP pop up
                            this._oAvgBillPopup.close();
                            // Display the success message
                            ute.ui.main.Popup.Alert({
                                title: 'Success',
                                message: 'ABP activation success and contact log has been created.'
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
                oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager(),
                bDoneRetrTable = false,
                bDoneRetrGraph = false,
                bDoneRetrEligibility = false,
                checkRetrTableGraphComplete;

            if (this._coNum) {

                // Display the loading indicator
                this.getOwnerComponent().getCcuxApp().setOccupied(true);
                // Retrieve the eligibility for ABP
                this._retrieveABPEligibility(this._coNum, function () {bDoneRetrEligibility = true;});

                var checkDoneRetrEligibility = setInterval (function () {
                    if (bDoneRetrEligibility) {
                        // Check if the customer is eligible for ABP.
                        if (oEligibilityModel.oData.ABPElig === "Y") {
                            // Check if the customer is on ABP now
                            if (oEligibilityModel.oData.ABPAct === "Y") {
                                // Check if there is billing history
                                if (oEligibilityModel.oData.NoBillHistory === "X" || oEligibilityModel.oData.NoBillHistory === "x") {
                                    // Show the confirmation pop up
                                    ute.ui.main.Popup.Confirm({
                                        title: 'No Billing History',
                                        message: 'Customer has no billing history to display. Do you wish to deactivate Average Billing Plan?',
                                        callback: function (sAction) {
                                            if (sAction === 'Yes') {
                                                oWebUiManager.notifyWebUi('openIndex', {
                                                    LINK_ID: "Z_AVGBIL_D"
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    oWebUiManager.notifyWebUi('openIndex', {
                                        LINK_ID: "Z_AVGBIL_D"
                                    });
                                }
                                // Dismiss the loading indicator
                                this.getOwnerComponent().getCcuxApp().setOccupied(false);
                            } else {
                                // Retrieve the data for table
                                this._retrieveTableInfo(this._coNum, function () {bDoneRetrTable = true;});
                                // Retrieve the data for graph
                                this._retrieveGraphInfo(this._coNum, function () {bDoneRetrGraph = true;});

                                checkRetrTableGraphComplete = setInterval (function () {
                                    if (bDoneRetrTable && bDoneRetrGraph) {
                                        // Dismiss the loading indicator
                                        this.getOwnerComponent().getCcuxApp().setOccupied(false);
                                        // Upon successfully retrieving the data, stop checking the completion of retrieving data
                                        clearInterval(checkRetrTableGraphComplete);
                                        // Upon successfully retrieving the data, stop the error message timeout
                                        clearTimeout(retrTimeout);

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
                                }.bind(this), 100);
                            }
                        } else {
                            ute.ui.main.Popup.Alert({
                                title: 'Not Eligible',
                                message: 'You are not eligible for Average Billing Plan.'
                            });
                            // Dismiss the loading indicator
                            this.getOwnerComponent().getCcuxApp().setOccupied(false);
                        }

                        clearInterval(checkDoneRetrEligibility);
                    }
                }.bind(this), 100);

                // Timeout function. If after 5 minutes still cannot done with retrieving data, then raise error message.
                var retrTimeout = setTimeout(function(){
                    ute.ui.main.Popup.Alert({
                        title: 'Network service failed',
                        message: 'We cannot retrieve your data. Please try again later.'
                    });
                    // Upon error time out, stop checking the completion of retrieving data
                    clearInterval(checkRetrTableGraphComplete);
                    // Dismiss the loading indicator
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this), 300000);

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
