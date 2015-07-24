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
                    'setHeaderMenuItemSelected',
                    'isHeaderMenuItemSelected',
                    'setHeaderMenuItemEnabled',
                    'isHeaderMenuItemEnabled',
                    'setTitle',
                    'setLayout',
                    'setFooterExpanded',
                    'isFooterExpanded',
                    'attachNavLeft',
                    'detachhNavLeft',
                    'showNavLeft',
                    'attachNavRight',
                    'detachNavRight',
                    'showNavRight'
                ]
            }
        });

        App.HMItemId = AppHeader.HMItemId;
        App.LayoutType = AppBody.ContentLayoutType;

        App.prototype.reset = function () {
            this._oAppHeader.reset();
            this._oAppBody.reset();
            this._oAppFooter.reset();
        };

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
            return this._oAppHeader.isSelected(sHMItemId);
        };

        App.prototype.setHeaderMenuItemEnabled = function (bEnabled, sHMItemId) {
            this._oAppHeader.setEnabled(bEnabled, sHMItemId);
            return this;
        };

        App.prototype.isHeaderMenuItemEnabled = function (sHMItemId) {
            return this._oAppHeader.isEnabled(sHMItemId);
        };

        App.prototype.setTitle = function (sTitle) {
            var oBodyTitle = this._oController.getView().byId('appBodyTitle');

            if (oBodyTitle && sTitle) {
                oBodyTitle.setText(sTitle);
            }

            return this;
        };

        App.prototype.setLayout = function (sLayoutType) {
            AppBody.setContentLayout(sLayoutType);
            return this;
        };

        App.prototype.attachNavLeft = function (fnCallback, oListener) {
            this._oAppBody.attachEvent(AppBody.Event.NavLeftClick, fnCallback, oListener);
            return this;
        };

        App.prototype.detachNavLeft = function (fnCallback, oListener) {
            this._oAppBody.detachEvent(AppBody.Event.NavLeftClick, fnCallback, oListener);
            return this;
        };

        App.prototype.showNavLeft = function (bShow) {
            this._oAppBody.showNavLeft(bShow);
            return this;
        };

        App.prototype.attachNavRight = function (fnCallback, oListener) {
            this._oAppBody.attachEvent(AppBody.Event.NavRightClick, fnCallback, oListener);
            return this;
        };

        App.prototype.detachNavRight = function (fnCallback, oListener) {
            this._oAppBody.detachEvent(AppBody.Event.NavRightClick, fnCallback, oListener);
            return this;
        };

        App.prototype.showNavRight = function (bShow) {
            this._oAppBody.showNavRight(bShow);
            return this;
        };

        App.prototype.setFooterExpanded = function (bExpanded) {
            this._oAppFooter.setExpanded(bExpanded);
            return this;
        };

        App.prototype.isFooterExpanded = function () {
            return this._oAppFooter.isExpanded();
        };

        return App;
    }
);
