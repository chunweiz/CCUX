/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'ute/ui/commons/Dialog',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, Dialog, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.SalesScript');

        /* =========================================================== */
		/* lifecycle method- Init                                      */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaignSS").attachPatternMatched(this._onObjectMatched, this);
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
        };

       /* =========================================================== */
		/* lifecycle method- After Rendering                           */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
        };

        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
        };

		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
			var sObjectPath = oEvent.getParameter("arguments").sPath,
                oModel = this.getOwnerComponent().getModel('comp-campaign'),
                mParameters,
                aFilters,
                sCurrentPath,
                oDropDownList,
                oDropDownListItemTemplate,
                aFilterIds,
                aFilterValues,
                sNewOfferCode,
                oMandDiscloureTV,
                fnRecievedHandler,
                that = this,
                aContent,
                sPath;
            this.getOwnerComponent().setCcuxBusy(true);
            this.sContract = oEvent.getParameter("arguments").coNum;
            this._sOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = this._i18NModel.getProperty("nrgCpgChangeOffSet");
            sNewOfferCode = "50160100";
            sCurrentPath = "/CpgChgOfferS";
            sCurrentPath = sCurrentPath + "(OfferCode='" + sNewOfferCode + "',Contract='32253375')";
            this._bindView(sCurrentPath);
            sCurrentPath = "/ScriptS";
            // Handler function for Tab Bar Item.
            aFilterIds = ["Contract", "OfferCode", "TxtName"];
            aFilterValues = ['32253375', sNewOfferCode, 'MAND'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oDropDownList = this.getView().byId("idnrgCamSSDdL");
            oDropDownListItemTemplate = this.getView().byId("idnrgCamSSLngLtIt").clone();
            oMandDiscloureTV = this.getView().byId("idCamSSMdTv");
            fnRecievedHandler = function (oEvent) {
                aContent = oDropDownList.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    oDropDownList.setSelectedKey("EN");
                    oMandDiscloureTV.bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                that.getOwnerComponent().setCcuxBusy(false);
            };
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oDropDownListItemTemplate,
                filters : aFilters,
               // parameters : {expand : "Scripts"},
                events: {dataReceived : fnRecievedHandler}
            };
            oDropDownList.bindAggregation("content", mParameters);

            //this._bindView(sObjectPath);
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
            this.getView().bindElement({
                model : "comp-campaign",
                path : sObjectPath
            });

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
		 * Action to be taken when the User clicks on Accept of Sales Script
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAccept = function (oEvent) {

            var sCurrentPath,
                oDropDownList,
                oDropDownListItemTemplate,
                mParameters,
                aFilters,
                aContent,
                obinding,
                sPath,
                that = this,
                fnRecievedHandler,
                oOverScriptTV = this.getView().byId("idnrgCamOvsOvTv"),
                aFilterIds,
                aFilterValues;
            this._oOverviewDialog = this.getView().byId("idnrgCamOvsDialog");
            this.getOwnerComponent().setCcuxBusy(true);
            aFilterIds = ["Contract", "OfferCode", "TxtName"];
            aFilterValues = ['32253375', '50160100', "OVW"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sCurrentPath = "/ScriptS";
            this._oOverviewDialog.setWidth("750px");
            this._oOverviewDialog.setHeight("auto");
            this._oOverviewDialog.setTitle("OVERVIEW SCRIPT");
            this._oOverviewDialog.setModal(true);
            this._oOverviewDialog.addStyleClass("nrgCamOvs-dialog");
            oDropDownList = this.getView().byId("idnrgCamOvsDdL");
            aContent = oDropDownList.getContent();
            oDropDownListItemTemplate = aContent[0].clone();
            fnRecievedHandler = function () {
                aContent = oDropDownList.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    oDropDownList.setSelectedKey("EN");
                    oOverScriptTV.bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                obinding.detachDataReceived(fnRecievedHandler);
                that.getOwnerComponent().setCcuxBusy(false);
            };
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oDropDownListItemTemplate,
                filters : aFilters,
                events: {dataReceived : fnRecievedHandler}
            };
            oDropDownList.bindAggregation("content", mParameters);
            obinding = oDropDownList.getBinding("content");
            this.getView().addDependent(this._oOverviewDialog);
            this._oOverviewDialog.open();
        };

        /**
		 * Back to Overview page function
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.backToOverview = function (oEvent) {
            this.navTo("campaign", {coNum : "34805112", flagType : "C"});
        };
        /**
		 * Formats the Type value to display "English" and "Spanish"
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.formatType = function (sType) {
            if (sType === "EN") {
                return this._i18NModel.getProperty("nrgCmpSSEN");
            } else {
                return this._i18NModel.getProperty("nrgCmpSSES");
            }
        };
        /**
		 * Change the binding if the language is selected
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.onSelected = function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath(),
                oMandDiscloureTV = this.getView().byId("idCamSSMdTv");
            oMandDiscloureTV.bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };
        /**
		 * Handler for the Rejection Reason Selected
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.onRejectionReason = function (oEvent) {

        };
        /**
		 * Handle when user clicked on Accepting Overview Script
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onOvsAccept = function (oEvent) {
            var oModel,
                mParameters;
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            mParameters = {
                method : "POST",
                urlParameters : {"CampaignCode" : 'XA1PP7',
                                         "EndDate" : new Date(),
                                        "LP_Code" : "null",
                                        "LP_FirstName" : "null",
                                        "LP_LastName" : "null",
                                        "LP_RefID" : "null",
                                        "OfferCode" : '50160100',
                                        "OfferTitle" : "CPL AVG@2000 13.9 SE N&W 12 WPT EML $0 NSP",
                                        "PromoCode" : 'XA1PP7',
                                        "StartDate" : new Date(),
                                        "Contract" : '32253375'},
                success : function (oData) {
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Eligibility Error occured");
                }.bind(this)
            };
            oModel.callFunction("/AcceptCampaign", mParameters); // callback function for error
            //this.navTo("campaignoffers", {coNum: this._sContract});
            this._oOverviewDialog.close();
        };
        /**
		 * Handle when user clicked on Declining Overview Script
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onOvsDecline = function (oEvent) {
            this._oOverviewDialog.close();
            this.navTo("campaignoffers", {coNum: this._sContract});
        };
        return Controller;
    }
);
