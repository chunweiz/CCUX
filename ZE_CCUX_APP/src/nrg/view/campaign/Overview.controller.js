/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Overview');

            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
            var aPriceData, campaignData;
            aPriceData = [
                {EFL500: "14.4000000", EFL1000: "13.4000000", EFL2000: "12.9000000" }
            ];
            campaignData = [
                {PromoCode: "MAOPRJ", OfferCode: "50124832", TermLength: "$0.00", StartDate: "09/01/2014", EndDate: "09/01/2015", CancellationFee: "$200.00", Incentive: "$20.00" }
            ];
            this.getView().setModel(new sap.ui.model.json.JSONModel(), "modelData");
            this.getView().getModel("modelData").setProperty("/priceData", aPriceData);
            this.getView().getModel("modelData").setProperty("/campaignData", campaignData);

        };
        Controller.prototype.testFunc = function (evt) {
            //alert("clicked");
        };
        return Controller;
    }


);
