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

        var Controller = CoreController.extend('nrg.module.campaign.view.Change');

        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaignchg").attachPatternMatched(this._onObjectMatched, this);
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");

        };

        /* =========================================================== */
		/* lifecycle method- After Rendering                          */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
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
                mParameters,
                oTemplateView,
                oTemplateModel,
                aEFLDatapaths,
                iCount,
                oEFLJson = {},
                aResults = [],
                that = this;
            this.getOwnerComponent().setCcuxBusy(true);
            this._sContract = oEvent.getParameter("arguments").coNum;
            this._sNewOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = "/CpgChgOfferS";
            sCurrentPath = sCurrentPath + "(Contract='" + this._sContract + "',OfferCode='" + this._sNewOfferCode + "')";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oTemplateModel = new sap.ui.model.json.JSONModel();
            this._bindView(sCurrentPath);
            aEFLDatapaths = that.getView().getModel("comp-campaign").getProperty(sCurrentPath + "/EFLs");
            if ((aEFLDatapaths !== undefined) && (aEFLDatapaths.length > 0)) {
                for (iCount = 0; iCount < aEFLDatapaths.length; iCount = iCount + 1) {
                    aResults.push(that.getView().getModel("comp-campaign").getProperty("/" + aEFLDatapaths[iCount]));
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
            that.getView().byId('idnrgCamChgPriceT').removeAllAggregation("content");
            that.getView().byId('idnrgCamChgPriceT').addContent(oTemplateView);
            jQuery.sap.log.info("Odata Read Successfully:::");
            this.getOwnerComponent().setCcuxBusy(false);
		};
        /**
		 * Binds the view to the object path. Makes sure that view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 *
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		Controller.prototype._bindView = function (sObjectPath) {
            var fnDataReceived = function (oEvent) {
                jQuery.sap.log.info("Data Received:::");
            };
            this.getView().bindElement({
                model : "comp-campaign",
                path : sObjectPath,
                events : {dataReceived: fnDataReceived}
            });
        };

        /**
		 * Event function for Accept Campaign
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptCampaign = function (oEvent) {
            var sOfferCode = this.getView().getBindingContext("comp-campaign").getProperty("OfferCode"),
                sType = this.getView().getBindingContext("comp-campaign").getProperty("Type");
            this.navTo("campaignSS", {offercodeNum : this._sNewOfferCode, coNum : this._sContract });
        };

        /**
		 * Event function for Decline Campaign
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDeclineCampaign = function (oEvent) {
            var sPath;
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            this.getView().bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };

        /**
		 * Back to Overview page function
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.backToOverview = function (oEvent) {
            this.navTo("campaign", {coNum : this._sContract, typeV : "C"});
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
