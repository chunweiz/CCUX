/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/Object'
    ],

    function (BaseObject) {
        'use strict';

        var AppNav = BaseObject.extend('nrg.controller.helper.AppNav', {
            constructor: function (mViewId, oController) {
                this._oController = oController;
                this._oNavLeft = this._oController.getView().byId(mViewId.navLeft);
                this._oNavRight = this._oController.getView().byId(mViewId.navRight);
            },

            metadata: {
                publicMethods: [
                    'initialize'
                ]
            }
        });

        AppNav.prototype.initialize = function () {
            this._oNavLeft.getDomRef().addEventListener('click', this._onNavLeftClick);
            this._oNavRight.getDomRef().addEventListener('click', this._onNavRightClick);

            return this;
        };

        AppNav.prototype._onNavLeftClick = function (oEvent) {

        };

        AppNav.prototype._onNavRightClick = function (oEvent) {

        };

        return AppNav;
    },

    false
);
