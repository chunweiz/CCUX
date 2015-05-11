/*global sap, tm*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        './Row'
    ],

    function (CoreControl, Row) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.table.Table', {
            metadata: {
                library: 'tm.control.lib.ui',

                properties: {

                },

                aggregations: {
                    columns: {
                        type: 'tm.control.lib.ui.table.Column',
                        multiple: true,
                        singularName: 'column',
                        bindable: 'bindable'
                    },

                    rows: {
                        type: 'tm.control.lib.ui.table.Row',
                        multiple: true,
                        singularName: 'row',
                        bindable: 'bindable'
                    }
                }
            }
        });

        Control.getMetadata().getAggregation('rows')._doesNotRequireFactory = true;

        Control.prototype.bindRows = function (oBindingInfo) {
            return this.bindAggregation('rows', oBindingInfo);
        };

        Control.prototype.getBinding = function (sName) {

        };

        Control.prototype._createRows = function () {
            var oBinding = this.getBinding('rows');

        };

        Control.prototype._bindAggregation = function () {

        };

        return Control;
    },

    true
);
