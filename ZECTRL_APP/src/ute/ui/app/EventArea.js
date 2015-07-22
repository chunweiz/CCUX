/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.EventArea', {
            metadata: {
                library: 'ute.ui.app',

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    click: {}
                }
            }
        });

        CustomControl.prototype.onclick = function (oEvent) {
            this.fireClick();
        };

        return CustomControl;
    },

    true
);
