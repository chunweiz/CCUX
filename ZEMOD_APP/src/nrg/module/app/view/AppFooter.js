/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider'
    ],

    function (EventProvider) {
        'use strict';

        var AppFooter = EventProvider.extend('nrg.module.app.view.AppFooter', {
            constructor: function (oController) {
                EventProvider.apply(this);

                this._oController = oController;
            },

            metadata: {
                publicMethods: [
                    'init'
                ]
            }
        });

        AppFooter.prototype.init = function () {

        };

        return AppFooter;
    }
);
