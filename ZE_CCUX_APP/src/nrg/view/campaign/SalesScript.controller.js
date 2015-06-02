/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.SalesScript');

            //TODO: Implementation required
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
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {
        };
        //TODO: Implementation required
        return Controller;
    }
);
