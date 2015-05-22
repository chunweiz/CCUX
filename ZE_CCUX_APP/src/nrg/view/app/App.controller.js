/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/view/app/AppHeader',
        'nrg/view/app/AppFooter',
        'nrg/view/app/AppMain',
        'nrg/view/app/AppNav'
    ],

    function (CoreController, AppHeader, AppFooter, AppMain, AppNav) {
        'use strict';

        var Controller = CoreController.extend('nrg.view.app.App');

        //DOM for control is only available after rendering
        Controller.prototype.onAfterRendering = function () {
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

        return Controller;
    }
);
