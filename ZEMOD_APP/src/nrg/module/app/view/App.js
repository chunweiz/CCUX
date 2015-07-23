/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider',
        'nrg/module/app/view/AppHeader',
        'nrg/module/app/view/AppBody',
        'nrg/module/app/view/AppFooter',
        'sap/m/BusyDialog'
    ],

    function (EventProvider, AppHeader, AppBody, AppFooter, BusyDialog) {
        'use strict';

        var App = EventProvider.extend('nrg.module.app.view.App', {
            constructor: function (oController) {
                EventProvider.apply(this);

                this._oBusyDialog = new BusyDialog();
                this._bEdit = false;

                this._oAppHeader = new AppHeader(oController, this);
                this._oAppHeader.init();

                this._oAppBody = new AppBody(oController, this);
                this._oAppFooter = new AppFooter(oController, this);
            },

            metadata: {
                publicMethods: [
                    'getHeader',
                    'getBody',
                    'getFooter',
                    'setBusy',
                    'getBusy',
                    'setEdit',
                    'getEdit'
                ]
            }
        });

        App.prototype.getHeader = function () {
            return this._oAppHeader;
        };

        App.prototype.getBody = function () {
            return this._oAppBody;
        };

        App.prototype.getFooter = function () {
            return this._oAppFooter;
        };

        App.prototype.setBusy = function (bBusy) {
            bBusy = !!bBusy;

            if (bBusy) {
                if (!this._oBusyDialog().isOpen()) {
                    this._oBusyDialog.open();
                }

            } else {
                if (this._oBusyDialog().isOpen()) {
                    this._oBusyDialog.close();
                }
            }

            return this;
        };

        App.prototype.getBusy = function () {
            return this._oBusyDialog.isOpen();
        };

        App.prototype.setEdit = function (bEdit) {
            this._bEdit = !!bEdit;

            return this;
        };

        App.prototype.getEdit = function () {
            return this._bEdit;
        };

        return App;
    }
);
