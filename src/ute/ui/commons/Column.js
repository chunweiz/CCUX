/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Element', 'sap/ui/core/RenderManager', 'sap/ui/model/Filter', 'sap/ui/model/Sorter', 'sap/ui/model/Type', 'sap/ui/model/type/String', './library'],
	function (jQuery, Element, RenderManager, Filter, Sorter, Type, String, library) {
        "use strict";

        var Column = Element.extend('ute.ui.commons.Column', { metadata: {
            library: 'ute.ui.commons.table',
            properties: {
                /* Width of the column.*/
                width: {type: 'sap.ui.core.CSSSize', group: 'Dimension', defaultValue: null},

                /*flag, if the column is sorted or not (displays the sorting indicator, does not trigger the sort method!)*/
                sorte: {type: 'boolean', group: 'Appearance', defaultValue: false},

                /* Sort order for this column. @see sap.ui.table.SortOrder (default value: "Ascending")*/
                sortOrder: {type: 'sap.ui.table.SortOrder', group: 'Appearance', defaultValue: sap.ui.table.SortOrder.Ascending},

                /*Specifies the binding property on which the column will sort.*/
                sortProperty: {type: 'string', group: 'Behavior', defaultValue: null},

                /*flag, if the column is filtered or not (displays the filter indicator, does not trigger the filter method!)*/
                filtered: {type: 'boolean', group: 'Appearance', defaultValue: false},

                /*Specifies the binding property on which the column will filter.*/
                filterProperty : {type : "string", group : "Behavior", defaultValue : null},

                /*Specifies the value of the filter as string (will be converted into the propert data type).*/
    			filterValue : {type : "string", group : "Behavior", defaultValue : null},

			/**
			 * Filter operator to use when filtering this column.
			 * @see sap.ui.model.FilterOperator (default value: "Contains")
			 */
			filterOperator : {type : "string", group : "Behavior", defaultValue : null}

            }
        }});

        return Column;

    }, true);
