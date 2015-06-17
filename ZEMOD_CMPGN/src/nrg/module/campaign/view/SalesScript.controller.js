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

        var Controller = CoreController.extend('nrg.module.campaign.view.SalesScript');

        /* =========================================================== */
		/* lifecycle method- Init                                      */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaignSS").attachPatternMatched(this._onObjectMatched, this);
        };
       /* =========================================================== */
		/* lifecycle method- After Rendering                           */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
            var aContent, obinding, sPath, that = this,
                oDropDownList = this.getView().byId("idnrgCamSSDdL"),
                handler = function () {
                    aContent = oDropDownList.getDropdownListItems();
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                       // aContent[0].addStyleClass("nrgCamHisBut-Selected");
                        that.getView().bindElement({
                            model : "comp-campaign",
                            path : sPath
                        });
                    }
                    obinding.detachDataReceived(handler);
                };
            obinding = oDropDownList.getBinding("DropdownListItems");
            obinding.attachDataReceived(handler);
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
                aFilters = this._createSearchFilterObject("1121", "A"),
                sCurrentPath,
                oDropDownList,
                oDropDownListItemTemplate;
            sCurrentPath = "/ScriptS";
            oDropDownList = this.getView().byId("idnrgCamSSDdL");
            oDropDownListItemTemplate = this.getView().byId("idnrgCamSSLngLtIt").clone();
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oDropDownListItemTemplate,
                filters : aFilters
            };
            oDropDownList.bindAggregation("DropdownListItems", mParameters);

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

            oFilterTemplate.sPath = 'NewOfferCode';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sOfferCode;
            aFilters.push(oFilterTemplate);
            return aFilters;
        };
        return Controller;
    }
);
