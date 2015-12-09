/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        'nrg/base/type/Price',
        'sap/ui/core/routing/HashChanger',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, jQuery, price, HashChanger, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.DefferedPmtPlan');

        Controller.prototype.onInit = function () {
        };


        Controller.prototype.onBeforeRendering = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxContextManager().getContext().oData;
            this._bpNum = oRouteInfo.bpNum;
            this._caNum = oRouteInfo.caNum;
            this._coNum = oRouteInfo.coNum;
            this._isExt = oRouteInfo.isExt;

            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppScrnControl');



            this._initScrnControl();
            this._startScrnControl();
        };

        /****************************************************************************************************************/
        //Init Functions
        /****************************************************************************************************************/
        Controller.prototype._initScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/StepOne', false);
            oScrnControl.setProperty('/StepTwo', false);
            oScrnControl.setProperty('/StepThree', false);
            oScrnControl.setProperty('/DPPDenied', false);
            oScrnControl.setProperty('/EXTGrant', false);
            oScrnControl.setProperty('/EXTDenied', false);
        };

        Controller.prototype._startScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl'),
                oHashChanger = new HashChanger(),
				sUrlHash = oHashChanger.getHash(),
                aSplitHash = sUrlHash.split('/');

            if (aSplitHash[1] === 'defferedpaymentplan') {
                oScrnControl.setProperty('/StepOne', true);
            } else if (aSplitHash[1] === 'defferedpaymentext') {
                oScrnControl.setProperty('/EXTGrant', true);
            }

            oScrnControl.setProperty('/StepOne', true);
        };

        Controller.prototype._selectScrn = function (sSelectedScrn) {

        };

        /****************************************************************************************************************/
        //Formatter
        /****************************************************************************************************************/


        /****************************************************************************************************************/
        //Handler
        /****************************************************************************************************************/


        /****************************************************************************************************************/
        //OData Call
        /****************************************************************************************************************/

        return Controller;
    }
);
