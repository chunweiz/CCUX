/*global sap, ute*/
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
                this._oAppBody.init();

                this._oAppFooter = new AppFooter(oController, this);
                this._oAppFooter.init();
            },

            metadata: {
                publicMethods: [
                    'setOccupied',
                    'isOccupied',
                    'setInEdit',
                    'isInEdit',
                    'setHeaderMenuItemSelected',
                    'isHeaderMenuItemSelected',
                    'setHeaderMenuItemEnabled',
                    'isHeaderMenuItemEnabled',
                    'setTitle',
                    'setLayout',
                    'setFooterExpanded',
                    'isFooterExpanded'
                ]
            }
        });

        App.HMItemId = AppHeader.HMItemId;
        App.LayoutType = ute.ui.app.BodyContentLayout;

        App.prototype.setOccupied = function (bOccupied) {
            bOccupied = !!bOccupied;

            if (bOccupied) {
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

        App.prototype.isOccupied = function () {
            return this._oBusyDialog.isOpen();
        };

        App.prototype.setInEdit = function (bEdit) {
            this._bEdit = !!bEdit;

            return this;
        };

        App.prototype.isInEdit = function () {
            return this._bEdit;
        };

        App.prototype.setHeaderMenuItemSelected = function (bSelected, sHMItemId) {
            this._oAppHeader.setSelected(bSelected, sHMItemId);
            return this;
        };

        App.prototype.isHeaderMenuItemSelected = function (sHMItemId) {
            this._oAppHeader.isSelected(sHMItemId);
            return false;
        };

        App.prototype.setHeaderMenuItemEnabled = function (bEnabled, sHMItemId) {
            this._oAppHeader.setEnabled(bEnabled, sHMItemId);
            return this;
        };

        App.prototype.isHeaderMenuItemEnabled = function (sHMItemId) {
            this._oAppHeader.isEnabled(sHMItemId);
            return false;
        };

        App.prototype.setTitle = function (sTitle) {
            var oBodyTitle = this._oController.getView().byId('appBodyTitle');

            if (oBodyTitle && sTitle) {
                oBodyTitle.setText(sTitle);
            }

            return this;
        };

        App.prototype.setLayout = function (sLayoutType) {
            return this;
        };

        App.prototype.setFooterExpanded = function (bExpanded) {
            return this;
        };

        App.prototype.isFooterExpanded = function () {
            return false;
        };

        return App;
    }
);
