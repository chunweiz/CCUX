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
                sNewOfferCode,
                oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay();
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
            this.sContract = oEvent.getParameter("arguments").coNum;
            sNewOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCurrentPendingSet");
            sCurrentPath = sCurrentPath + "(OfferCode='" + sNewOfferCode + "',Type='P')";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            mParameters = {
                success : function (oData) {
                    this._bindView(sCurrentPath);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
            this.getView().getModel("appView").setProperty("/busy", false);
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
		 * Event function for Accept Campaign
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptCampaign = function (oEvent) {
            var sOfferCode = this.getView().getBindingContext("comp-campaign").getProperty("OfferCode"),
                sType = this.getView().getBindingContext("comp-campaign").getProperty("Type");
            this.navTo("campaignSS", {offercodeNum : sOfferCode, typeV : sType });
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
            this.navTo("campaign", {coNum : this.sContract, typeV : "C"});
        };
        return Controller;
    }
);
