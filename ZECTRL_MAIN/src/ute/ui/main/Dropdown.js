/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'ute/ui/main/Checkbox'
    ],

    function (jQuery, Control, Checkbox) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Dropdown', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.DropdownDesign', defaultValue: ute.ui.main.DropdownDesign.Default },
                    enabled: { type: 'boolean', defaultValue: true },
                    selectedKey: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    content: { type: 'ute.ui.main.DropdownItem', multiple: true, singularName: 'content' },

                    _headerContent: { type: 'sap.ui.core.Control', multiple: true, visibility: 'hidden' },
                    _headerExpander: { type: 'ute.ui.main.Checkbox', multiple: false, visibility: 'hidden' },
                    _picker: { type: 'sap.m.Popover', multiple: false, visibility: 'hidden' }
                },

                defaultAggregation: 'content',

                events: {
                    select: {
                        parameters: {
                            selectedItem: { type: 'ute.ui.main.DropdownItem' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype.init = function () {

        };

        CustomControl.prototype._getHeaderExpander = function () {
            var oExpander = this.getAggregation('_headerExpander');

            if (oExpander) {
                return oExpander;
            }

            oExpander = new Checkbox(this.getId() + '-hdrExpander', {
                design: ute.ui.main.CheckboxDesign.None,
                checked: false
            });

            oExpander.attachSelect(this._onHeaderExpanderSelect, this);

            this.setAggregation('_headerExpander', oExpander);
            return oExpander;
        };

        CustomControl.prototype._onHeaderExpanderSelect = function (oControlEvent) {
            /*
            ** TODO: Show picker
            */
        };

        CustomControl.prototype._getPicker = function () {
            var oPicker = this.getAggregation('_picker');

            if (oPicker) {
                return oPicker;
            }



            this.setAggregation('_picker', oPicker);
            return oPicker;
        };

        return CustomControl;
    },

    true
);
