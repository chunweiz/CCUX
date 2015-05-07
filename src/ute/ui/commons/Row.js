/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Element', './library'],
	function (jQuery, Element, library) {
        "use strict";

        var Row = Element.extend('ute.ui.commons.Row', { metadata : {
            library: 'ute.ui.commons.table',
            defaultAggregation: 'cells',
            aggregations: {
                /*The controls for the cells.*/
                cells: {type : 'sap.ui.core.Control', multiple: true, singularName: 'cell'}
            }
        }});

        Row.prototype.getIndex = function () {
            var oTable = this.getParent(),
                iRowIndex;

            if (oTable) {
                iRowIndex = oTable.indexOfRow(this);
                return iRowIndex;
            } else {
                return -1;
            }
        };

        return Row;
    }, true);
