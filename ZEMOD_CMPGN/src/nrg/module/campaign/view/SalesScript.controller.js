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
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().getRoute("campaignSS").attachPatternMatched(this._onObjectMatched, this);

        };

        /* =========================================================== */
		/* lifecycle method- After Rendering                          */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
        };

        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var aLanguageData, aDispositionData;
            aLanguageData = [
                {language: "English" },
                {language: "Spanish" }
            ];
            aDispositionData = [
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" },
                {Reason: "MAOPRJ" }
            ];
            this.getView().setModel(new sap.ui.model.json.JSONModel(), "SalesScriptData");
            this.getView().getModel("SalesScriptData").setProperty("/languageData", aLanguageData);
            this.getView().getModel("SalesScriptData").setProperty("/dispoistionData", aDispositionData);

        };
		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
			var sObjectPath = oEvent.getParameter("arguments").sPath;
			this._bindView(sObjectPath);
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
        return Controller;
    }
);
