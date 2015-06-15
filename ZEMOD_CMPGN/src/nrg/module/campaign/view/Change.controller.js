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
		 * Binds the view to the object path and expands the aggregated line items.
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oModel,
                sCurrentPath,
                mParameters,
                aFilters = this._createSearchFilterObject("1121", "50124832"),
                sPath;

            //sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCurrentPendingSet");
            sCurrentPath = "/CpgChgSaveS";
            sPath = "/CpgChgSaveS(OfferCode='50124832',Type='P')";
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            mParameters = {
                //filters : aFilters,
                success : function (oData) {
                    this.getView().bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, mParameters);
            }
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
        return Controller;
    }
);
