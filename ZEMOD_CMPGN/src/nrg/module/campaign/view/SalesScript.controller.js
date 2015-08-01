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
                oMandDiscloureTV,
                fnRecievedHandler,
                that = this,
                aContent,
                sPath;
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            this._sContract = oEvent.getParameter("arguments").coNum;
            this._sOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = this._i18NModel.getProperty("nrgCpgChangeOffSet");
            sCurrentPath = "/CpgChgOfferS";
            sCurrentPath = sCurrentPath + "(OfferCode='" + this._sOfferCode + "',Contract='" + this._sContract + "')";
            this._bindView(sCurrentPath);
            sCurrentPath = "/ScriptS";
            // Handler function for Tab Bar Item.
            aFilterIds = ["Contract", "OfferCode", "TxtName"];
            aFilterValues = [this._sContract, this._sOfferCode, 'MAND'];
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
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
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
            this.getOwnerComponent().getCcuxApp().setOccupied(true);

            aFilterIds = ["Contract", "OfferCode", "TxtName"];
            aFilterValues = [this._sContract, this._sOfferCode, "OVW"];
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
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
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
            this.getOwnerComponent().getCcuxApp().setOccupied(false);
            this._oOverviewDialog.open();
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
        };

        /**
		 * Back to Overview page function
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.backToOverview = function (oEvent) {
            this.navTo("campaign", {coNum : this._sContract, typeV: "C"});
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
		 * Change the binding if the language is selected for Mandatory Discription
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.onMandLngSelected = function (oEvent) {
            var sPath,
                oMandDiscloureTV = this.getView().byId("idCamSSMdTv"),
                sSelectedKey;
            sSelectedKey = oEvent.getSource().getProperty("selectedKey");
            sPath = "/ScriptS(Contract='" + this._sContract + "',OfferCode='" + this._sOfferCode + "',TxtName='MAND',TxtLang='" + sSelectedKey + "')";
            oMandDiscloureTV.bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };
        /**
		 * Change the binding if the language is selected for Overview script
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.onOvwLngSelected = function (oEvent) {
            var sPath,
                oOverScriptTV = this.getView().byId("idnrgCamOvsOvTv"),
                sSelectedKey;
            sSelectedKey = oEvent.getSource().getProperty("selectedKey");
            sPath = "/ScriptS(Contract='" + this._sContract + "',OfferCode='" + this._sOfferCode + "',TxtName='OVW',TxtLang='" + sSelectedKey + "')";
            oOverScriptTV.bindElement({
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
                mParameters,
                sCampaignCode,
                sEndDate,
                sOfferCode,
                sOfferTitle,
                sPromo,
                sStartDate,
                sContract,
                sPath,
                oContext,
                that = this;
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            sPath = "/CpgChgOfferS(Contract='" + this._sContract + "',OfferCode='" + this._sOfferCode + "')";
            oContext = oModel.getContext(sPath);
            sCampaignCode = oContext.getProperty("Campaign");
            sEndDate = oContext.getProperty("EndDate");
            sOfferCode = oContext.getProperty("OfferCode");
            sOfferTitle = oContext.getProperty("OfferTitle");
            sPromo = oContext.getProperty("Promo");
            sStartDate = oContext.getProperty("StartDate");
            sContract = oContext.getProperty("Contract");
            mParameters = {
                method : "POST",
                urlParameters : {"CampaignCode" : sCampaignCode,
                                         "EndDate" : sEndDate,
                                        "LP_Code" : "null",
                                        "LP_FirstName" : "null",
                                        "LP_LastName" : "null",
                                        "LP_RefID" : "null",
                                        "OfferCode" : sOfferCode,
                                        "OfferTitle" : sOfferTitle,
                                        "PromoCode" : sPromo,
                                        "StartDate" : sStartDate,
                                        "Contract" : sContract},
                success : function (oData) {
                    if ((oData !== undefined) && (oData.Code === "S")) {
                        sap.ui.commons.MessageBox.alert("SWAP is completed");
                        this.navTo("campaign", {coNum : this._sContract, typeV : "C"});
                    } else {
                        sap.ui.commons.MessageBox.alert("SWAP Failed");
                        this.navTo("campaignoffers", {coNum: this._sContract});
                    }
                    jQuery.sap.log.info("Odata Read Successfully:::" + oData.Code);
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Eligibility Error occured");
                }.bind(this)
            };
            oModel.callFunction("/AcceptCampaign", mParameters); // callback function for error
            this._oOverviewDialog.close();
            this.getOwnerComponent().getCcuxApp().setOccupied(false);
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
