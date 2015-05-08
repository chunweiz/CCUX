/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './Row', './library'],
	function (jQuery, Control, Row, library) {
        "use strict";

        var Table = Control.extend("ute.ui.commons.Table", { metadata : {
            library : "ute.ui.commons",
            properties : {
                /*Width of tabke*/
                width: {type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: 'auto' },

                /*Height of each row in CSS of table*/
                rowHeight: {type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultvalue: 'null'},

                rowSelected: {type: 'int', group: 'Appearance', dafautValue: -1}

                /*hold for adding propertities, will probably add according to requirement*/
            },
            defaultAggregation: 'columns',
            aggregations: {
                /* Columns of the Table*/
                columns : {type : "ute.ui.commons.Column", multiple : true, singularName : "column", bindable : "bindable"},

                /*Rows of the Table*/
                rows : {type : "ute.ui.commons.Row", multiple : true, singularName : "row", bindable : "bindable"}
            },
            events: {
                /*Might need this*/
                rowSelectionChange : {
				    parameters : {
                        /*selected row index*/
                        rowIndex: {type : "int"},

                        /*binding context of the row which has been clicked so that selection has been changed*/
                        rowContext: {type : "object"},

                        /* array of row indices which selection has been changed (either selected or deselected)*/
                        rowIndices : {type : "int[]"}   //keep first
				    }
                }
            }
        }});

        Table.prototype.getBinding = function (sName) {
            var oBinding;
            if (sName === 'rows') {
                oBinding = sap.ui.core.Element.prototype.getBinding.call(this, sName);
                return oBinding;
            }
        };

        Table.prototype._createRows = function () {
            var aCols = this.getColumns(),
                oTemplate = new Row(this.getId() + '-rows'),
                oBinding = this.getBinding('rows'),
                oBindingInfo = this.getBindingInfo('rows'),
                //aContexts = oBinding.getContext(),
                i,
                oClone;

            for (i = 0; i < aCols.length; i = i + 1) {
                if (aContexts && aContexts[i]) {
                    oClone = oTemplate.clone('row' + i);
                    oClone.setBindingContext(aContexts[i], oBindingInfo.model);
                } else {
                    oClone.setBindingContext(null);
                }
                this.addAggregation('rows', oClone, true);
            }

            oTemplate.destroy();
        };

        return Table;
    }, true);
