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

        var Controller = CoreController.extend('nrg.module.campaign.view.Overview');


		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaign").attachPatternMatched(this._onObjectMatched, this);

        };
        /* =========================================================== */
		/* lifecycle method- After Rendering                          */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
            var aContent, obinding, sPath, that = this,
                aToggleContainer = this.getView().byId("idnrgCamOvr-TabBar"),
                handler = function () {
                    aContent = aToggleContainer.getContent();
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                        aContent[0].setSelected(true);
                       // aContent[0].addStyleClass("nrgCamHisBut-Selected");
                        that.getView().bindElement({
                            model : "comp-campaign",
                            path : sPath
                        });
                    }
                    obinding.detachDataReceived(handler);
                };
            obinding = aToggleContainer.getBinding("content");
            obinding.attachDataReceived(handler);
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
                aFilters = this._createSearchFilterObject("1121", "Y");

            sCurrentPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgCurrentPendingSet");
            sEligibilityPath = this.getOwnerComponent().getModel("comp-i18n-campaign").getProperty("nrgEligibilitySet");
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oToggleContainer = this.getView().byId("idnrgCamOvr-TabBar");
            aContent = oToggleContainer.getContent();
            oToggleTemplate = aContent[0].clone();
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oToggleTemplate,
                filters : aFilters
            };
            oToggleContainer.bindAggregation("content", mParameters);
            mParameters = {
                filters : aFilters,
                success : function (oData) {
                    this.getView().byId("idCamCustReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : "/CpgEligS('1121')"
                    });
                    this.getView().byId("idCamAgtReqOfferBtn").bindElement({
                        model : "Overview-elig",
                        path : "/CpgEligS('1121')"
                    });
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Some Error");
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
		 * @param {sContractID} Contract to be used aa a filter
         * @param {sCurrentFlag} Filter flag to determine the current
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (sContractID, sCurrentFlag) {
            var aFilters = [],
                oFilterTemplate = new Filter();
            oFilterTemplate.sPath = 'Contract';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sContractID;
            aFilters.push(oFilterTemplate);
            return aFilters;
        };

        /**
		 * Toggles between Current and Pending clicks
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.toggleCampaign = function (oEvent) {
            var sPath;
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
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

            this.navTo("campaignoffers", {coNum: "123"});
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
                return "Current Campaign";

            } else {
                return "Pending Campaign";
            }

        };
        return Controller;
    }


);
