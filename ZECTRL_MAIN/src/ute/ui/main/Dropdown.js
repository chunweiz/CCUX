/*global sap, ute, document*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'ute/ui/main/Checkbox',
        'ute/ui/main/DropdownItem'
    ],

    function (jQuery, Control, Checkbox, DropdownItem) {
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

                    _headerExpander: { type: 'ute.ui.main.Checkbox', multiple: false, visibility: 'hidden' },
                    _headerContent: { type: 'ute.ui.main.DropdownItem', multiple: false, visibility: 'hidden' }
                },

                defaultAggregation: 'content',

                events: {
                    select: {
                        parameters: {
                            selectedKey: { type: 'string' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype._autoClose = function (oEvent) {
            this.$().find('.uteMDd-picker').removeClass('uteMDd-picker-active');
            jQuery(document).off('click', this._autoClose);
            this._getHeaderExpander().setChecked(false);
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
            if (oControlEvent.getSource().getChecked()) {
                this.$().find('.uteMDd-picker').addClass('uteMDd-picker-active');
                jQuery(document).on('click', jQuery.proxy(this._autoClose, this));
            } else {
                this.$().find('.uteMDd-picker').removeClass('uteMDd-picker-active');
                jQuery(document).off('click', this._autoClose);
            }
        };

        CustomControl.prototype.setSelectedKey = function (sKey) {
            var aContent = this.getContent() || [];

            aContent.forEach(function (oContent) {
                if (oContent.getKey() === sKey) {
                    oContent.data('selected', 'selected', true);
                } else {
                    oContent.data('selected', null);
                }
            });

            this.setProperty('selectedKey', sKey);
            this._syncHeaderContent();

            return this;
        };

        CustomControl.prototype.addContent = function (oContent) {
            oContent.attachPress(this._onDropdownItemPress, this);

            this.addAggregation('content', oContent);
            return this;
        };

        CustomControl.prototype.insertContent = function (oContent, iIndex) {
            oContent.attachPress(this._onDropdownItemPress, this);

            this.insertAggregation('content', oContent, iIndex);
            return this;
        };

        CustomControl.prototype._onDropdownItemPress = function (oControlEvent) {
            if (this.getSelectedKey() !== oControlEvent.getSource().getKey()) {
                this.setSelectedKey(oControlEvent.getSource().getKey());
                this.fireSelect({
                    selectedKey: this.getSelectedKey()
                });
            }
        };

        CustomControl.prototype._syncHeaderContent = function () {
            var aContent = this.getContent() || [];

            this.removeAggregation('_headerContent');

            aContent.forEach(function (oContent) {
                if (oContent.getKey() === this.getSelectedKey()) {
                    this.setAggregation('_headerContent', oContent);
                }

            }.bind(this));
        };

        return CustomControl;
    },

    true
);
