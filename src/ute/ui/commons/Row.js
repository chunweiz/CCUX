/*global sap*/

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './library'],
	function (jQuery, Control, library) {
        "use strict";

        var Row = Control.extend('ute.ui.commons.Row', { metadata : {
            library: 'ute.ui.commons',
            properties: {
                iIndex: {type: 'int', group: 'data', defaultValue: null},
                bindingData: {}
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
