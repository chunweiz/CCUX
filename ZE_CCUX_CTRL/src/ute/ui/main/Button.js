/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Button', {
            metadata: {
                library: 'ute.ui.main',

                properties: {

                }
            }
        });



        return CustomControl;
    },

    true
);
