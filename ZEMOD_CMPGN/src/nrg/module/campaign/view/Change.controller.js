/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global'
    ],

    function (CoreController, Filter, FilterOperator, jQuery) {
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
                sContract,
                sNewOfferCode;
            sContract = oEvent.getParameter("arguments").coNum;
            sNewOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCurrentPendingSet");
            sCurrentPath = sCurrentPath + "(OfferCode='" + sNewOfferCode + "',Type='P')";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            mParameters = {
                //filters : aFilters,
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
		 * @param {oContractID} Contract to be used aa a filter
         * @param {OfferCode} Filter Offer Code to determine the current selection
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (sContractID, sOfferCode) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'Contract';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sContractID;
            aFilters.push(oFilterTemplate);

            oFilterTemplate.sPath = 'OfferCode';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sOfferCode;
            aFilters.push(oFilterTemplate);
            return aFilters;
        };
        /**
		 * Event function for Accept Campaign
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptCampaign = function (oEvent) {
            var oContext = this.getView().getBindingContext("comp-campaign");
            this.navTo("campaignSS", {sPath: "test"});
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
        return Controller;
    }
);
