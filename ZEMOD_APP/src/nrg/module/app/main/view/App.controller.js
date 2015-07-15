/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/header/view/AppHeader',
        'nrg/module/app/footer/view/AppFooter',
        'nrg/module/app/main/view/AppMain',
        'nrg/module/app/main/view/AppNav',
        'sap/m/BusyDialog'
    ],

    function (Controller, AppHeader, AppFooter, AppMain, AppNav, BusyDialog) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.app.main.view.App');

        CustomController.prototype.onInit = function () {
            this._oBusyDialog = new BusyDialog();
        };

        //DOM for control is only available after rendering
        CustomController.prototype.onAfterRendering = function () {
            this._oAppHeader = new AppHeader({
                hdr: 'idAppHdrMenu',
                quickLink: 'idAppHdrQuickLink',
                msg: 'idAppHdrMsg'
            }, this).initialize();

            this._oAppFooter = new AppFooter('idAppFooterMenu', this);
            this._oAppFooter.initialize();

            this._oAppMain = new AppMain('idAppMain', this)
                .initialize()
                .setMainTitle('nrgAppMainCustTitle');

            this._oAppNav = new AppNav({
                navLeft: 'idNrgAppArrowLeft',
                navRight: 'idNrgAppArrowRight'
            }, this).initialize();
        };

        CustomController.prototype.getBusyDialog = function () {
            if (!this._oBusyDialog) {
                this._oBusyDialog = new BusyDialog();
            }

            return this._oBusyDialog;
        };

        return CustomController;
    }
);
