/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/type/Price',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, price, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Tools');
        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
        };

		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                mParameters,
                aFilters,
                i,
                oModel,
                sCurrentPath,
                aFilterIds,
                aFilterValues;
            oViewModel = new JSONModel({
				busy : true,
				delay : 0,
                history : false,
                cancel : false
			});
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = this._i18NModel.getProperty("nrgHistorySet");
            this.getView().getModel("appView").setProperty("/busy", false);
            Controller.sContract = oEvent.getParameter("arguments").coNum;
            sCurrentPath = sCurrentPath + "/$count";
            mParameters = {
                batchGroupId : "myId3",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/history", true);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Failed:::" + oError);
                }.bind(this)
            };
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
            sCurrentPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            sCurrentPath = sCurrentPath + "/$count";
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            mParameters = {
                batchGroupId : "myId4",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/cancel", true);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Failed:::" + oError);
                }.bind(this)
            };
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
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
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oScrollContainer,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues;
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = this._i18NModel.getProperty("nrgHistorySet");
            oHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.History"
            });
            oScrollContainer = oHistoryView.byId("idnrgCamHisScroll");
            oScrollTemplate = oHistoryView.byId("idnrgCamHisBut").clone();
            mParameters = {
                model : "comp-campaign",
                path : sPath,
                template : oScrollTemplate,
                filters : aFilters
            };
            oScrollContainer.bindAggregation("content", mParameters);
            this._oHistoryDialog = new ute.ui.main.Popup.create({
                title: 'Campaign History',
                close: this._handleDialogClosed,
                content: oHistoryView
            });
            this._oHistoryDialog.addStyleClass("nrgCamHis-dialog");
            //to get access to the global model
            this.getView().addDependent(this._oHistoryDialog);
            this._oHistoryDialog.open();

        };

        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCancelPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oPendingSwapsTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oPendingSwapsTemplate;
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PendingSwaps", "nrg.module.campaign.view.PendingSwaps");
            }
            if (this._oCancelDialog === undefined) {
                this._oCancelDialog = new ute.ui.main.Popup.create({
                    title: 'Campaign History',
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            sPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            oPendingSwapsTable = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamTls-pendTable");
            oPendingSwapsTemplate = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamTls-pendRow");
            mParameters = {
                model : "comp-campaign",
                path : sPath,
                filters : aFilters,
                template : oPendingSwapsTemplate
            };
            this.getView().addDependent(this._oCancelDialog);
            //to get access to the global model
            this._oCancelDialog.addStyleClass("nrgCamHis-dialog");
           // oPendingSwapsTable.bindRows(mParameters);
            this._oCancelDialog.open();
        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._handleDialogClosed = function (oControlEvent) {

        };
        return Controller;
    }

);
