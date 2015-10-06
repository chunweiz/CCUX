/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'sap/ui/model/json/JSONModel'
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Overview');
		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this._aPendingSelPaths = []; // Array for Pending Swaps Selected
        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oModel,
                sCurrentPath,
                sEligibilityPath,
                oBindingInfo,
                oToggleContainer,
                oToggleTemplate,
                aContent,
                aFilters,
                aFilterIds,
                aFilterValues,
                oTemplatesView,
                oBinding,
                fnRecievedHandler,
                that = this,
                sTempValue,
                sPath,
                oMetaContext,
                oTemplateView,
                oTemplateModel,
                aEFLDatapaths,
                iCount,
                aResults = [],
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
                i18NModel;

            i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            this.getOwnerComponent().getCcuxApp().setTitle("CAMPAIGNS");
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this._sFlag = oRouteInfo.parameters.typeV.toUpperCase();
            aFilterIds = ["Contract"];
            aFilterValues = [this._sContract];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sCurrentPath = i18NModel.getProperty("nrgCurrentPendingSet");
            sEligibilityPath = "/ButtonS";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oToggleContainer = this.getView().byId("idnrgCamOvr-TabBar");
            oToggleTemplate = this.getView().byId("idnrgCamOvr-TabItem").clone();
            sEligibilityPath = sEligibilityPath + "('" + this._sContract + "')";
            oTemplateModel = new sap.ui.model.json.JSONModel();
            // Handler function for Tab Bar Item.
            fnRecievedHandler = function (oEvent) {
                aContent = oToggleContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    if (aContent.length === 1) { // show only current campaign data irrespective of the flag
                        sTempValue = aContent[0].getBindingContext("comp-campaign").getProperty("Type");
                        if (sTempValue === that._sFlag) {
                            sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                            aContent[0].setSelected(true);
                        } else {
                            sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                            aContent[0].setSelected(true);
                            //Temporarily show exiting acontent[0] data but in the future decide based on business requirement
                        }
                    }
                    if (aContent.length === 2) {
                        sTempValue = aContent[0].getBindingContext("comp-campaign").getProperty("Type");
                        if (sTempValue === that._sFlag) { //Populate view with Current Campaign or Pending Campaign depends on the flag came from dashboard
                            sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                            aContent[0].setSelected(true);
                        } else {
                            sPath = aContent[1].getBindingContext("comp-campaign").getPath();
                            aContent[1].setSelected(true);
                        }
                    }
                    // Some how Expression binding for this condition is not working, so at the controller level checking again to disable button if pending campaign is not available
                    for (iCount = 0; iCount < aContent.length; iCount = iCount + 1) {
                        sTempValue = aContent[iCount].getBindingContext("comp-campaign").getProperty("OfferCode");
                        if (sTempValue === '00000000') {
                            aContent[iCount].setEnabled(false);
                        }
                    }
                   // aContent[0].addStyleClass("nrgCamHisBut-Selected");
                    aEFLDatapaths = this.getModel("comp-campaign").getProperty(sPath + "/EFLs");
                    if ((aEFLDatapaths !== undefined) && (aEFLDatapaths.length > 0)) {
                        for (iCount = 0; iCount < aEFLDatapaths.length; iCount = iCount + 1) {
                            aResults.push(this.getModel("comp-campaign").getProperty("/" + aEFLDatapaths[iCount]));
                        }
                        oTemplateModel.setData(that.convertEFLJson(aResults));
                        that._oEFLModel = oTemplateModel;
                        oTemplateView = sap.ui.view({
                            preprocessors: {
                                xml: {
                                    models: {
                                        tmpl : that._oEFLModel
                                    }
                                }
                            },
                            type: sap.ui.core.mvc.ViewType.XML,
                            viewName: "nrg.module.campaign.view.EFLData"
                        });
                        that.getView().byId('idnrgCamOvrPriceT').removeAllAggregation("content");
                        that.getView().byId('idnrgCamOvrPriceT').addContent(oTemplateView);
                    }
                    that.getView().bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                oBinding = oToggleContainer.getBinding("content");
                oBinding.detachDataReceived(fnRecievedHandler);
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };
             // Handler function for Tab Bar Item.
            oBindingInfo = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oToggleTemplate,
                filters : aFilters,
                parameters : {expand: "EFLs"},
                events: {dataReceived : fnRecievedHandler}
            };
            oToggleContainer.bindAggregation("content", oBindingInfo);
            oBindingInfo = {
                //filters : aFilters,
                success : function (oData) {
                    this.getView().byId("idCamCustReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : sEligibilityPath
                    });
/*                    this.getView().byId("idCamAgtReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : sEligibilityPath
                    });*/
                    oModel.updateBindings(false);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    this.getOwnerComponent().getCcuxApp().setOccupied(true);
                    jQuery.sap.log.info("Eligibility Error occured");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sEligibilityPath, oBindingInfo);
            }
            this.getView().setModel(oModel, "Overview-elig");
        };
        /* =========================================================== */
		/* lifecycle method- After Rendering                          */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {

        };
       /**
		 * Assign the filter objects based on the input selection
		 *
		 * @function
		 * @param {Array} aFilterIds to be used as sPath for Filters
         * @param {Array} aFilterValues for each sPath
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (aFilterIds, aFilterValues) {
            var aFilters = [],
                iCount;

            for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
            }
            return aFilters;
        };
        /**
		 * Toggles between Current and Pending clicks
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.toggleCampaign = function (oEvent) {
            var sPath,
                aEFLDatapaths,
                iCount,
                aResults = [],
                that = this,
                oTemplateView,
                oTemplateModel;
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            oTemplateModel = new sap.ui.model.json.JSONModel();
            // aContent[0].addStyleClass("nrgCamHisBut-Selected");
            that.getView().byId('idnrgCamOvrPriceT').removeAllAggregation("content");
            aEFLDatapaths = this.getView().getModel("comp-campaign").getProperty(sPath + "/EFLs");
            if ((aEFLDatapaths !== undefined) && (aEFLDatapaths.length > 0)) {
                for (iCount = 0; iCount < aEFLDatapaths.length; iCount = iCount + 1) {
                    aResults.push(this.getView().getModel("comp-campaign").getProperty("/" + aEFLDatapaths[iCount]));
                }
            }
            oTemplateModel.setData(that.convertEFLJson(aResults));
            oTemplateView = sap.ui.view({
                preprocessors: {
                    xml: {
                        models: {
                            tmpl : oTemplateModel
                        }
                    }
                },
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.EFLData"
            });

            that.getView().byId('idnrgCamOvrPriceT').addContent(oTemplateView);
            this.getView().bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };

        /**
		 * Traverse to Offers View when the user selected Agent requested buttons
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAgentRequestedOffers = function (oEvent) {
            var sFirstMonthBill = oEvent.getSource().getBindingContext("Overview-elig").getProperty("FirstBill"),
                sInitTab = oEvent.getSource().getBindingContext("Overview-elig").getProperty("InitTab");
            if ((!sInitTab) || (sInitTab === undefined) || (sInitTab === null) || (sInitTab === "")) {
                this._sInitTab = "SE";
            } else {
                this._sInitTab = sInitTab;
            }
            if (sFirstMonthBill === "X") {
                //sap.ui.commons.MessageBox.alert("Customer has to completed atleast One Month Invoice");
                ute.ui.main.Popup.Alert({
                    title: 'Information',
                    message: 'Customer has to completed atleast One Month Invoice'
                });
            } else {
                this._getPendingSwapsCount(oEvent);
            }
        };
        /**
		 * Traverse to Offers View when the user selected Customer requested buttons
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCustomerRequestedOffers = function (oEvent) {
            var sFirstMonthBill = oEvent.getSource().getBindingContext("Overview-elig").getProperty("FirstBill"),
                sCustomerEligible = oEvent.getSource().getBindingContext("Overview-elig").getProperty("CustEligFlag"),
                sInitTab = oEvent.getSource().getBindingContext("Overview-elig").getProperty("InitTab"),
                _CancellationPopupHandler,
                that = this;
            if ((!sInitTab) || (sInitTab === undefined) || (sInitTab === null) || (sInitTab === "")) {
                this._sInitTab = "SE";
            } else {
                this._sInitTab = sInitTab;
            }
            if (!sFirstMonthBill) {
                sap.ui.commons.MessageBox.alert("Customer has to completed at least One Month Invoice");
            } else {
/*                if (sCustomerEligible === "X") {
                    this._getPendingSwapsCount(oEvent);
                } else {
                    _CancellationPopupHandler = function (sAction) {
                        switch (sAction) {
                        case ute.ui.main.Popup.Action.Yes:
                            that._getPendingSwapsCount(oEvent);
                            break;
                        case ute.ui.main.Popup.Action.No:
                        // No Action decided
                            break;
                        case ute.ui.main.Popup.Action.Ok:
                        // No Action decided
                            break;
                        }
                    };
                    ute.ui.main.Popup.Confirm({
                        title: 'Cancellation',
                        message: 'Customer may be charged a cancellation fee',
                        callback: _CancellationPopupHandler
                    });
                }*/
                this._getPendingSwapsCount(oEvent);
            }
        };
        /**
		 * Queries Odata and get the count of the pending swaps
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype._getPendingSwapsCount = function (oEvent) {
            var sCurrentPath,
                aFilterIds,
                aFilterValues,
                aFilters,
                mParameters,
                oModel,
                that = this,
                i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            sCurrentPath = i18NModel.getProperty("nrgPendingSwapsSet");
            sCurrentPath = sCurrentPath + "/$count";
            aFilterIds = ["Contract"];
            aFilterValues = [this._sContract];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            mParameters = {
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            that.showPendingSwaps();
                        } else {
                            that.navTo("campaignoffers", {bpNum: that._sBP, caNum: that._sCA, coNum: this._sContract, typeV : this._sInitTab});
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Failed:::" + oError);
                }.bind(this)
            };
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
        };
        /**
		 * Formats the Type value to display "Current Campaign" or "Pending Campaign"
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.formatType = function (sType) {
            var i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            if (sType === "C") {
                return i18NModel.getProperty("nrgCmpOvrCt");
            } else {
                return i18NModel.getProperty("nrgCmpOvrPg");
            }
        };
        /**
		 * Converts in to EFL Json format required by Template view.
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.convertEFLJson = function (results) {
            var columns = [],
                temp,
                tempColumns = [],
                continueFlag = false,
                oBRRow = [],
                oCERow = [],
                oBRCells = [],
                oCECells = [],
                iCount1,
                iCount2,
                aJsonDataNew;
            for (iCount1 = 0; iCount1 < results.length; iCount1 = iCount1 + 1) {

                temp = results[iCount1];
                if ((temp !== undefined) && (temp.EFLLevel !== undefined)) {

                  // Columns Assignment.
                    if (tempColumns !== undefined) {

                        for (iCount2 = 0; iCount2 < tempColumns.length; iCount2  = iCount2 + 1) {
                            if (temp.EFLLevel === tempColumns[iCount2]) {
                                continueFlag = true;
                                break;
                            }
                        }
                        if (continueFlag) {
                            continueFlag = false;
                        } else {
                            tempColumns.push(temp.EFLLevel);
                            columns.push({
                                "EFLLevel": temp.EFLLevel
                            });
                        }
                    }
                    // Columns Assignment.
                }
            }
            for (iCount1 = 0; iCount1 < results.length; iCount1 = iCount1 + 1) {

                temp = results[iCount1];
                if ((temp !== undefined) && (temp.EFLLevel !== undefined)) {

                    if (temp.EFLType === "BR") {
                        oBRCells.push({
                            "EFLPrice": temp.EFLPrice
                        });
                    }

                    if (temp.EFLType === "CE") {
                        oCECells.push({
                            "EFLPrice": temp.EFLPrice
                        });
                    }
                }
            }
            aJsonDataNew = {};
            aJsonDataNew.results = {};
            aJsonDataNew.results.columns = columns;
            aJsonDataNew.results.rows = [];
            aJsonDataNew.results.rows.push({
                "cells" : oBRCells
            });
            aJsonDataNew.results.rows.push({
                "cells" : oCECells
            });

            return aJsonDataNew;
        };
        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.showPendingSwaps = function () {
            var oModel,
                sPath,
                oBindingInfo,
                oHistoryView,
                oPendingSwapsTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oPendingSwapsTemplate,
                i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign"),
                fnRecievedHandler,
                oViewModel = new JSONModel({
                    selected : 0,
                    ReqNumber : "",
                    ReqName : "",
                    NoPhone : false
                }),
                that = this;
            this.getView().setModel(oViewModel, "localModel");
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            aFilterIds = ["Contract"];
            aFilterValues = [this._sContract];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PendingOverview", "nrg.module.campaign.view.PendingSwaps", this);
            }
            if (this._oCancelDialog === undefined) {
                this._oCancelDialog = new ute.ui.main.Popup.create({
                    title: 'Change Campaign - Cancel',
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            sPath = i18NModel.getProperty("nrgPendingSwapsSet");
            oPendingSwapsTable = sap.ui.core.Fragment.byId("PendingOverview", "idnrgCamPds-pendTable");
            oPendingSwapsTemplate = sap.ui.core.Fragment.byId("PendingOverview", "idnrgCamPds-pendRow");
            fnRecievedHandler = function () {
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };
            oBindingInfo = {
                model : "comp-campaign",
                path : sPath,
                filters : aFilters,
                template : oPendingSwapsTemplate,
                events: {dataReceived : fnRecievedHandler}
            };
            oPendingSwapsTable.bindRows(oBindingInfo);
            this.getView().addDependent(this._oCancelDialog);
            //to get access to the global model
            this._oCancelDialog.addStyleClass("nrgCamHis-dialog");
            this.getOwnerComponent().getCcuxApp().setOccupied(false);
            this._oCancelDialog.open();
            this.getOwnerComponent().getCcuxApp().setOccupied(true);

        };
        /**
		 * Handler Function for the Pending Swaps Selection
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingSwapsSelected = function (oEvent) {
            var iSelected = this.getView().getModel("localModel").getProperty("/selected"),
                sPath,
                iIndex,
                sTemp;

            sPath = oEvent.getSource().getParent().getBindingContext("comp-campaign").getPath();
            iIndex = this._aPendingSelPaths.indexOf(sPath);
            if (oEvent.getSource().getChecked()) {
                iSelected = iSelected + 1;
                sTemp = iIndex < 0 && this._aPendingSelPaths.push(sPath);
            } else {
                iSelected = iSelected - 1;
                sTemp = iIndex > -1 && this._aPendingSelPaths.splice(iIndex, 1);
            }
            this.getView().getModel("localModel").setProperty("/selected", iSelected);
        };
        /**
		 * Handle when user clicked on Cancelling of Pending Swaps
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.ProceedwithCancel = function (oEvent) {
            var oModel = this.getOwnerComponent().getModel('comp-campaign'),
                aSelectedPendingSwaps,
                mParameters,
                oLocalModel,
                sReqName,
                sReqNumber,
                bNoPhone;

            oLocalModel = this.getView().getModel("localModel");
            sReqName = oLocalModel.getProperty("/ReqName");
            sReqNumber = oLocalModel.getProperty("/ReqNumber");
            bNoPhone = oLocalModel.getProperty("/NoPhone");
            if ((this._aPendingSelPaths) && (this._aPendingSelPaths.length > 0)) {
                if ((!sReqName) || (sReqName === "")) {
                    sap.ui.commons.MessageBox.alert("Please enter Requestor's Name");
                    return;
                }
                if ((!bNoPhone) && ((!sReqNumber) || (sReqNumber === ""))) {
                    sap.ui.commons.MessageBox.alert("Please enter Requestor's Number or Select No Phone");
                    return;
                }
            } else {
                sap.ui.commons.MessageBox.alert("Select Pending Swap to cancel");
                return;
            }
            oModel.setRefreshAfterChange(false);
            this._aPendingSelPaths.map(function (sCurrentPath) {
                var oContext = oModel.getContext(sCurrentPath);
                mParameters = {
                    method : "POST",
                    urlParameters : {"iDoc" : oContext.getProperty("IdocNo"),
                                     "ReqNumber" : sReqNumber,
                                     "Type" : oContext.getProperty("SwapType"),
                                     "ReqName" : sReqName,
                                     "Contract" : oContext.getProperty("Contract"),
                                     "Hist" : oContext.getProperty("HistoryNo")},
                    success : function (oData, oResponse) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                    }.bind(this),
                    error: function (oError) {
                        jQuery.sap.log.info("Eligibility Error occured");
                    }.bind(this)
                };
                oModel.callFunction("/DeleteCampaign", mParameters);
            });
            this._oCancelDialog.close();
            this.navTo("campaignoffers", {bpNum: this._sBP, caNum: this._sCA, coNum: this._sContract, typeV : this._sInitTab});
        };
        /**
		 * Handle when user clicked on Cancelling of Pending Swaps
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.ContinueWithoutCancel = function (oEvent) {
            this._oCancelDialog.close();
            this.navTo("campaignoffers", {bpNum: this._sBP, caNum: this._sCA, coNum: this._sContract, typeV : this._sInitTab});
        };
        return Controller;
    }


);
