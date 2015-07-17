/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/type/Price',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, price, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Tools');
        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
        };

		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                mParameters,
                aFilters,
                i,
                oModel,
                sCurrentPath,
                aFilterIds,
                aFilterValues;
            oViewModel = new JSONModel({
				busy : true,
				delay : 0,
                selected : 0,
                history : false,
                cancel : false
			});
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = this._i18NModel.getProperty("nrgHistorySet");
            this.getView().getModel("appView").setProperty("/busy", false);
            Controller.sContract = oEvent.getParameter("arguments").coNum;
            sCurrentPath = sCurrentPath + "/$count";
            mParameters = {
                batchGroupId : "myId3",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/history", true);
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
            sCurrentPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            sCurrentPath = sCurrentPath + "/$count";
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            mParameters = {
                batchGroupId : "myId4",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/cancel", true);
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
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oScrollContainer,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oDataTag,
                oNoDataTag,
                fnRecievedHandler,
                aContent,
                oPricingTable,
                oPricingRowTemplate,
                oPricingColTemplate,
                that = this,
                fnRecieved,
                fnChange,
                oTemplateView,
                oTemplateModel,
                aEFLDatapaths,
                iCount,
                oEFLJson = {},
                aResults = [];
            this.getOwnerComponent().setCcuxBusy(true);
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = this._i18NModel.getProperty("nrgHistorySet");
            oHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.History"
            });
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oScrollContainer = oHistoryView.byId("idnrgCamHisScroll");
            oScrollTemplate = oHistoryView.byId("idnrgCamHisBut").clone();
            oDataTag = this.getView().byId("idnrgCamHisData");
            oNoDataTag = this.getView().byId("idnrgCamHisNoData");
            oPricingColTemplate = oHistoryView.byId("idnrgCamHis-prcCol");
            oPricingRowTemplate = oHistoryView.byId("idnrgCamHis-prcRow");
            oPricingTable = oHistoryView.byId("idnrgCamHisPriceT");
            oTemplateModel = new sap.ui.model.json.JSONModel();

            // Function received handler is used to update the view with first History campaign.---start
            fnRecievedHandler = function () {
                var oBinding;
                aContent = oScrollContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    aContent[0].addStyleClass("nrgCamHis-but-selected");
                    oHistoryView.bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                   // Adding EFL Table to History view as XML templating-- start
                    aEFLDatapaths = this.getModel("comp-campaign").getProperty(sPath + "/EFLs");
                    if ((aEFLDatapaths !== undefined) && (aEFLDatapaths.length > 0)) {
                        for (iCount = 0; iCount < aEFLDatapaths.length; iCount = iCount + 1) {
                            aResults.push(this.getModel("comp-campaign").getProperty("/" + aEFLDatapaths[iCount]));
                        }
                    }
                    if ((aResults === undefined) && (aResults.length === 0)) {
                        return;
                    } else {
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
                        oPricingTable.addContent(oTemplateView);
                    }
                    // Adding EFL Table to History view as XML templating--end

                } else {
                    oDataTag.addStyleClass("nrgCamHis-hide");
                    oNoDataTag.removeStyleClass("nrgCamHis-hide");
                }

            };
            // Function received handler is used to update the view with first History campaign.---end


            mParameters = {
                parameters : {expand: "EFLs"},
                model : "comp-campaign",
                path : sPath,
                template : oScrollTemplate,
                filters : aFilters,
                events: {dataReceived : fnRecievedHandler}
            };
            oScrollContainer.bindAggregation("content", mParameters);
            this._oHistoryDialog = new ute.ui.main.Popup.create({
                title: 'Campaign History',
                close: this._handleDialogClosed,
                content: oHistoryView
            });
            this._oHistoryDialog.addStyleClass("nrgCamHis-dialog");
            //to get access to the global model
            this.getView().addDependent(this._oHistoryDialog);
            this._oHistoryDialog.open();
            that.getOwnerComponent().setCcuxBusy(false);

        };

        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCancelPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oPendingSwapsTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oPendingSwapsTemplate;
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PendingSwaps", "nrg.module.campaign.view.PendingSwaps", this);
            }
            if (this._oCancelDialog === undefined) {
                this._oCancelDialog = new ute.ui.main.Popup.create({
                    title: 'Change Campaign - Cancel',
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            sPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            oPendingSwapsTable = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamPds-pendTable");
            oPendingSwapsTemplate = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamPds-pendRow");
            mParameters = {
                model : "comp-campaign",
                path : sPath,
                filters : aFilters,
                template : oPendingSwapsTemplate
            };
            this.getView().addDependent(this._oCancelDialog);
            //to get access to the global model
            this._oCancelDialog.addStyleClass("nrgCamHis-dialog");
            oPendingSwapsTable.bindRows(mParameters);
            this._oCancelDialog.open();
        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._handleDialogClosed = function (oControlEvent) {

        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingSwapsSelected = function (oEvent) {
            var iSelected = this.getView().getModel("appView").getProperty("/selected");
            if (oEvent.getSource().getChecked()) {
                iSelected = iSelected + 1;
            } else {
                iSelected = iSelected - 1;
            }
            this.getView().getModel("appView").setProperty("/selected", iSelected);

        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onSelected = function (oEvent) {
            var iSelected = this.getView().getModel("appView").getProperty("/selected");
            if (oEvent.getSource().getChecked()) {
                iSelected = iSelected + 1;
            } else {
                iSelected = iSelected - 1;
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
                        }
                    }
                    tempColumns.push(temp.EFLLevel);
                    columns.push({
                        "EFLLevel": temp.EFLLevel
                    });
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
		 * Handle when user clicked on Cancelling of Pending Swaps
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.ProceedwithCancel = function (oEvent) {
        };
        /**
		 * Handle when user clicked on Cancelling of Pending Swaps
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.ContinuewithCancel = function (oEvent) {
        };

        return Controller;
    }

);
