/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider'
    ],

    function (EventProvider) {
        'use strict';

        var AppBody = EventProvider.extend('nrg.module.app.ccux.view.AppBody', {
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

        AppBody.prototype.init = function () {

        };

        return AppBody;
    }
);
