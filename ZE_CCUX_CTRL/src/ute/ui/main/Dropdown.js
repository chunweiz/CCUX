/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Dropdown', {
            metadata: {
                library: 'ute.ui.main',

                properties: {

                },

                events: {
                    select: {
                        parameters: {
                            key: { type: 'string' }
                        }
                    }
                }
            }
        });



        return CustomControl;
    },

    true
);
