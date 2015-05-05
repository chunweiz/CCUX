/*global sap*/
/*jslint nomen:true*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './Row', './library'],
	function (jQuery, Control, Row, library) {
        "use strict";

        var Table = Control.extend("ute.ui.commons.Table", { metadata : {
            library : "ute.ui.commons.table",
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
                columns : {type : "sap.ui.table.Column", multiple : true, singularName : "column", bindable : "bindable"},

                /*Rows of the Table*/
                rows : {type : "sap.ui.table.Row", multiple : true, singularName : "row", bindable : "bindable"}
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

        Table.prototype._createRows = function () {
            var aCols = this.getColumns(),
                oTemplate = new Row(this.getId() + '-rows'),
                oBinding = this.getBinding('rows'), //function not implemented yet
                oBindingInfo = this.getBindingInfo('rows'); //function not implemented yet


        };

        return Table;
    }, true);
