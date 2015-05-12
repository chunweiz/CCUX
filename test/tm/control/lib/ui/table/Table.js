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

        Control.prototype.updateRows = function (sReason) {
            if (this.getDomRef()) {
                CoreControl.prototype.updateRows.apply(this, arguments);
            }
        };

        Control.prototype._createRows = function () {
            var oTemplate, oClone, oBinding, oBindingInfo, aContext;

            oTemplate = new Row();

            this.getColumns().forEach(function (oColumn) {
                if (oColumn.getTemplate()) {
                    oClone = oColumn.getTemplate().clone();
                    oTemplate.addCell(oClone);
                }
            });

            this.destroyAggregation('rows', true);
            oBinding = this.getBinding('rows');
            oBindingInfo = this.mBindingInfos.rows;

            oBinding.getContexts().forEach(function (oContext) {
                oClone = oTemplate.clone();
                oClone.setBindingContext(oContext, oBindingInfo.model);
                this.addAggregation('rows', oClone, true);
            }.bind(this));

            oTemplate.destroy();
        };

//        Control.prototype.bindRows = function (oBindingInfo) {
//            return this.bindAggregation('rows', oBindingInfo);
//        };
//
//        Control.prototype.getBinding = function (sName) {
//            var oBinding;
//
//            sName = sName || 'rows';
//            oBinding = sap.ui.core.Element.prototype.getBinding().call(this, sName);
//
//            return oBinding;
//        };
//
//        Control.prototype.updateRows = function (sReason) {
//
//        };
//
//        Control.prototype._createRows = function () {
//            var oBinding = this.getBinding('rows');
//
//        };
//
//        Control.prototype._bindAggregation = function (sName, sPath, oTemplate, oSorter, aFilters) {
//            var oBinding;
//
//            sap.ui.core.Element.prototype._bindAggregation.apply(this, arguments);
//            oBinding = this.getBinding('rows');
//
//            return this;
//        };

        return Control;
    },

    true
);
