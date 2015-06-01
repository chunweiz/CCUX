/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.History');

            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
            var aPriceData, aCampaignData, aDescription;
            aPriceData = [
                {EFL500: "14.4000000", EFL1000: "13.4000000", EFL2000: "12.9000000" }
            ];
            aCampaignData = [
                {PromoCode: "MAOPRJ", OfferCode: "50124832", TermLength: "$0.00", StartDate: "09/01/2014", EndDate: "09/01/2015", CancellationFee: "$200.00", Incentive: "$20.00" }
            ];
            this.getView().setModel(new sap.ui.model.json.JSONModel(), "historyData");
            this.getView().getModel("historyData").setProperty("/priceData", aPriceData);
            this.getView().getModel("historyData").setProperty("/campaignData", aCampaignData);

        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {



        };
        //TODO: Implementation required

        return Controller;
    }
);
