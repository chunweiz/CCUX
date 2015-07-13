/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Overview');


		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaign").attachPatternMatched(this._onObjectMatched, this);
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
            var oModel,
                sCurrentPath,
                sEligibilityPath,
                mParameters,
                oToggleContainer,
                oToggleTemplate,
                aContent,
                aFilters,
                oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
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
                oEFLJson = {},
                aResults = [];
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
            this._sContract = oEvent.getParameter("arguments").coNum;
            this._sFlag = oEvent.getParameter("arguments").typeV.toUpperCase();
            aFilterIds = ["Contract"];
            aFilterValues = [this._sContract];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sCurrentPath = this._i18NModel.getProperty("nrgCurrentPendingSet");
            sEligibilityPath = this._i18NModel.getProperty("nrgEligibilitySet");
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
                   // aContent[0].addStyleClass("nrgCamHisBut-Selected");
                    aEFLDatapaths = this.getModel("comp-campaign").getProperty(sPath + "/EFLs");
                    if ((aEFLDatapaths !== undefined) && (aEFLDatapaths.length > 0)) {
                        for (iCount = 0; iCount < aEFLDatapaths.length; iCount = iCount + 1) {
                            aResults.push(this.getModel("comp-campaign").getProperty("/" + aEFLDatapaths[iCount]));
                        }
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
                    that.getView().bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                that.getView().getModel("appView").setProperty("/busy", false);
                oBinding = oToggleContainer.getBinding("content");
                oBinding.detachDataReceived(fnRecievedHandler);
            };
             // Handler function for Tab Bar Item.
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oToggleTemplate,
                filters : aFilters,
                parameters : {expand: "EFLs"},
                events: {dataReceived : fnRecievedHandler}
            };
            oToggleContainer.bindAggregation("content", mParameters);
            mParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().byId("idCamCustReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : sEligibilityPath
                    });
                    this.getView().byId("idCamAgtReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : sEligibilityPath
                    });
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Eligibility Error occured");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sEligibilityPath, mParameters);
            }
            this.getView().setModel(oModel, "Overview-elig");
		};

        /**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 *
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		Controller.prototype._bindView = function (sObjectPath) {

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
		 * Traverse to Offers View when the user selected Agent requested and Customer Requested buttons
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onOffers = function (oEvent) {
            var sContract = oEvent.getSource().getBindingContext("Overview-elig").getProperty("Contract"),
                sFirstMonthBill = oEvent.getSource().getBindingContext("Overview-elig").getProperty("FirstBill");
            if (sFirstMonthBill === "X") {
                sap.ui.commons.MessageBox.alert("Customer has to completed atleast One Month Invoice");
            } else {
                this.navTo("campaignoffers", {coNum: sContract});
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
            if (sType === "C") {
                return this._i18NModel.getProperty("nrgCmpOvrCt");
            } else {
                return this._i18NModel.getProperty("nrgCmpOvrPg");
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

        return Controller;
    }


);
