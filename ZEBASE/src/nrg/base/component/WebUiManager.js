/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/ManagedObject'
    ],

    function (ManagedObject) {
        'use strict';

        var Manager = ManagedObject.extend('nrg.base.component.WebUiManager', {
            constructor: function (oComponent) {
                ManagedObject.apply(this, arguments);
                this._oComponent = oComponent;
            },

            metadata: {
                publicMethods: [
                    'start'
                ]
            }
        });

        Manager.prototype.start = function () {

        };

        return Manager;
    }
);
