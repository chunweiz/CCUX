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
        };
       /* =========================================================== */
		/* lifecycle method- After Rendering                           */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
            var aContent, obinding, sPath, that = this,
                oMandDiscloureTV = this.getView().byId("idCamSSMdTv"),
                oDropDownList = this.getView().byId("idnrgCamSSDdL"),
                handler = function () {
                    aContent = oDropDownList.getDropdownListItems();
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                       // aContent[0].addStyleClass("nrgCamHisBut-Selected");
                        oMandDiscloureTV.bindElement({
                            model : "comp-campaign",
                            path : sPath
                        });
                    }
                    that.getView().getModel("appView").setProperty("/busy", false);
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
                aFilters,
                sCurrentPath,
                oDropDownList,
                oDropDownListItemTemplate,
                sType,
                sOfferCode,
                oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay();
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
            sType = oEvent.getParameter("arguments").typeV;
            sOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = "/CpgChgOfferS";
            sCurrentPath = sCurrentPath + "(OfferCode='" + sOfferCode + "',Type='P')";
            aFilters = this._createSearchFilterObject("1121", "A", "MD");
           //sCurrentPath = sCurrentPath + "/ScriptS";
            oDropDownList = this.getView().byId("idnrgCamSSDdL");
            oDropDownListItemTemplate = this.getView().byId("idnrgCamSSLngLtIt").clone();
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oDropDownListItemTemplate,
               // filters : aFilters,
                parameters: {expand: "Cpg_Script"}

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
        Controller.prototype._createSearchFilterObject = function (sContractID, sOfferCode, sTextname) {
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

            oFilterTemplate.sPath = 'TxtName';
            oFilterTemplate.sOperator = FilterOperator.EQ;
            oFilterTemplate.oValue1 = sTextname;
            aFilters.push(oFilterTemplate);
            return aFilters;
        };
        /**
		 * Action to be taken when the User clicks on Accept of Sales Script
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAccept = function (oEvent) {

            var oDialog = this.getView().byId("idnrgCamOvsDialog"),
                sCurrentPath,
                oDropDownList,
                oDropDownListItemTemplate,
                mParameters,
                aFilters = this._createSearchFilterObject("1121", "A", "OS"),
                aContent,
                obinding,
                sPath,
                that = this,
                handler,
                oOverScriptTV = this.getView().byId("idnrgCamOvsOvTv");
            sCurrentPath = "/ScriptS";
            oDialog.setWidth("750px");
            oDialog.setHeight("auto");
            oDialog.setTitle("OVERVIEW SCRIPT");
            oDialog.setModal(true);
            oDialog.addStyleClass("nrgCamOvs-dialog");
            oDropDownList = this.getView().byId("idnrgCamOvsDdL");
            aContent = oDropDownList.getDropdownListItems();
            oDropDownListItemTemplate = aContent[0].clone();
            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oDropDownListItemTemplate,
                filters : aFilters
            };
            oDropDownList.bindAggregation("DropdownListItems", mParameters);
            handler = function () {
                aContent = oDropDownList.getDropdownListItems();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    oOverScriptTV.bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                obinding.detachDataReceived(handler);
            };
            obinding = oDropDownList.getBinding("DropdownListItems");
            obinding.attachDataReceived(handler);
            this.getView().addDependent(oDialog);
            oDialog.open();
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
        return Controller;
    }
);
