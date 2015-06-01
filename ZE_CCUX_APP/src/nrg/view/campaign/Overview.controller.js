/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/util/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.campaign.Overview');

            //TODO: Implementation required
        Controller.prototype.onBeforeRendering = function () {
            var aPriceData, aCampaignData, aDescription;
            aPriceData = [
                {EFL500: "14.4000000", EFL1000: "13.4000000", EFL2000: "12.9000000" }
            ];
            aCampaignData = [
                {PromoCode: "MAOPRJ", OfferCode: "50124832", TermLength: "$0.00", StartDate: "09/01/2014", EndDate: "09/01/2015", CancellationFee: "$200.00", Incentive: "$20.00" }
            ];
            aDescription = "You have agreed to purchase: A thermostat for $94.99, and your final purchase price will be $ 102.83 with tax. This is a one-time purchase and has nothing to do with your                             electric service or any other services that Reliant or its affiliates may be providing you for which you make periodic payments. The credit card you provided will be                                 charged a one-time fee for this purchase. A restocking fee may apply for returned devices. Your NRG thermostat is compatible with most HVAC systems. Check compatibility                               at reliant.com/connectsupport. A limited one year manufacturer's warranty is provided by Building36. Mr/Ms. LAST NAME, I'd like to confirm that you are purchasing NRG                                 thermostat, is that correct? Great! Thank you so much.";
            this.getView().setModel(new sap.ui.model.json.JSONModel(), "modelData");
            this.getView().getModel("modelData").setProperty("/priceData", aPriceData);
            this.getView().getModel("modelData").setProperty("/campaignData", aCampaignData);
            this.getView().getModel("modelData").setProperty("/description", aDescription);

        };
                    //TODO: Implementation required
        Controller.prototype.onAfterRendering = function () {



        };


        return Controller;
    }


);
