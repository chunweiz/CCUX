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
/*            var aContent, obinding, sPath, that = this,
                oMandDiscloureTV = this.getView().byId("idCamSSMdTv"),
                oDropDownList = this.getView().byId("idnrgCamSSDdL"),
                handler = function () {
                    aContent = oDropDownList.getContent();
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
                };*/
            //obinding = oDropDownList.getBinding("content");
            //obinding.attachDataReceived(handler);
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
                oViewModel,
                aFilterIds,
                aFilterValues,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                sNewOfferCode,
                oTextLineTV;
            oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
            this.sContract = oEvent.getParameter("arguments").coNum;
            this._sOfferCode = oEvent.getParameter("arguments").offercodeNum;
            sCurrentPath = this._i18NModel.getProperty("nrgCpgChangeOffSet");
            sNewOfferCode = "50160100";
            sCurrentPath = "/CpgChgOfferS";
            sCurrentPath = sCurrentPath + "(OfferCode='" + sNewOfferCode + "',Contract='32253375')";
            // Handler function for Tab Bar Item.
            aFilterIds = ["Scripts/TxtName"];
            aFilterValues = ['MAND'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            //oDropDownList = this.getView().byId("idnrgCamSSDdL");
            //oDropDownListItemTemplate = this.getView().byId("idnrgCamSSLngLtIt").clone();
            oTextLineTV = this.getView().byId("idCamSSMdTv");
            mParameters = {
                filters : aFilters,
                urlParameters: {"$expand": "Scripts"},
                success : function (oData) {
                    this.getView().bindElement({
                        model : "comp-campaign",
                        path : sCurrentPath
                    });
                    sCurrentPath = "/ScriptS(Contract='32253375',OfferCode='50160100',TxtName='MAND',TxtLang='EN')";
                    oTextLineTV.bindElement({
                        model : "comp-campaign",
                        path : sCurrentPath
                    });
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Scripts Error occured");
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
            //oDropDownList.bindAggregation("content", mParameters);
            this.getView().getModel("appView").setProperty("/busy", false);
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

            var oDialog = this.getView().byId("idnrgCamOvsDialog"),
                sCurrentPath,
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
            aFilterIds = ["Contract", "OfferCode", "TxtName"];
            aFilterValues = ['32253375', this._sOfferCode, "OVW"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sCurrentPath = "/ScriptS";
            oDialog.setWidth("750px");
            oDialog.setHeight("auto");
            oDialog.setTitle("OVERVIEW SCRIPT");
            oDialog.setModal(true);
            oDialog.addStyleClass("nrgCamOvs-dialog");
            oDropDownList = this.getView().byId("idnrgCamOvsDdL");
            aContent = oDropDownList.getContent();
            oDropDownListItemTemplate = aContent[0].clone();
            fnRecievedHandler = function () {
                aContent = oDropDownList.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    oOverScriptTV.bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                }
                obinding.detachDataReceived(fnRecievedHandler);
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
