/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/view/AppHeader',
        'nrg/module/app/view/AppFooter',
        'nrg/module/app/view/AppMain',
        'nrg/module/app/view/AppNav'
    ],

    function (Controller, AppHeader, AppFooter, AppMain, AppNav) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.app.view.App');

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

        return CustomController;
    }
);
