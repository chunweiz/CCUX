/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/controller/BaseController',
        'nrg/controller/helper/AppHeader',
        'nrg/controller/helper/AppFooter',
        'nrg/controller/helper/AppMain'
    ],
    
    function (Controller, AppHeader, AppFooter, AppMain) {
        'use strict';
        
        var AppController = Controller.extend('nrg.controller.App');

        //DOM for control is only available after rendering
        AppController.prototype.onAfterRendering = function () {
            this._oAppHeader = new AppHeader({
                hdr: 'idAppHdrMenu',
                quickLink: 'idAppHdrQuickLink',
                msg: 'idAppHdrMsg'
            }, this).initialize();

            console.log('creating footer ...');
            this._oAppFooter = new AppFooter('idAppFooterMenu', this);
            console.log('created footer ...');
            this._oAppFooter.initialize();
            console.log('init footer ...');

            this._oAppMain = new AppMain('idAppMain', this)
                .initialize()
                .setMainTitle('nrgAppMainCustTitle');
        };

        return AppController;
    },
    
    false
);
