/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'ute/ui/main/Checkbox',
        'sap/m/Popover',
        'ute/ui/main/TabBar',
        'ute/ui/main/TabBarItem'
    ],

    function (jQuery, Control, Checkbox, Popover, TabBar, TabBarItem) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Dropdown', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.DropdownDesign', defaultValue: ute.ui.main.DropdownDesign.Default },
                    enabled: { type: 'boolean', defaultValue: true },
                    placeholder: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' },

                    _headerContent: { type: 'sap.ui.core.Control', multiple: true, visibility: 'hidden' },
                    _headerExpander: { type: 'ute.ui.main.Checkbox', multiple: false, visibility: 'hidden' },

                    _picker: { type: 'sap.m.Popover', multiple: false, visibility: 'hidden' },
                    _selectedItem: { type: 'ute.ui.main.TabBarItem' }
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
            var oPicker = this._getPicker();

            if (oControlEvent.getSource().getChecked()) {
                oPicker.open();
            } else {
                if (oPicker.isOpen()) {
                    oPicker.close();
                }
            }
        };

        CustomControl.prototype._getPicker = function () {
            var oPicker = this.getAggregation('_picker');

            if (oPicker) {
                return oPicker;
            }

            oPicker = new Popover({
                showHeader: false,
				placement: sap.m.PlacementType.Vertical,
				offsetX: 0,
				offsetY: 0,
				bounce: false
            });

            oPicker.setHorizontalScrolling(false);
            oPicker.addStyleClass('uteMDd-picker');
            oPicker.addContent(this._getPickerList());

            this._enhancePicker(oPicker);
            this._listenToPicker(oPicker);

            this.setAggregation('_picker', oPicker);
            return oPicker;
        };

        CustomControl.prototype._getPickerList = function () {
            var oPickList = new TabBar();

            oPickList.attachSelect(this._onPickerListSelect, this);

            oPickList.addContent(new TabBarItem({
                selected: true,
                key: 'key001',
                content: new sap.ui.core.HTML({ content: '<span>value001</span>' })
            }));

            oPickList.addContent(new TabBarItem({
                key: 'key002',
                content: new sap.ui.core.HTML({ content: '<span>value002</span>' })
            }));

            oPickList.addContent(new TabBarItem({
                key: 'key003',
                content: new sap.ui.core.HTML({ content: '<span>value003</span>' })
            }));

            return oPickList;
        };

        CustomControl.prototype._onPickerListSelect = function (oControlEvent) {
            var oPicker = this._getPicker();

            if (oPicker.isOpen()) {
                oPicker.close();
            }
        };

        CustomControl.prototype._enhancePicker = function (oPicker) {
            var self = this;

            oPicker._removeArrow = function () {
				this._marginTop = 0;
				this._marginLeft = 0;
				this._marginRight = 0;
				this._marginBottom = 0;
				this._arrowOffset = 0;
				this._offsets = ['0 0', '0 0', '0 0', '0 0'];
			};

            oPicker._setPosition = function () {
				this._myPositions = ['begin bottom', 'begin center', 'begin top', 'end center'];
				this._atPositions = ['begin top', 'end center', 'begin bottom', 'begin center'];
			};

			oPicker._setArrowPosition = function () {};

			oPicker.open = function () {
				return this.openBy(self.getFocusDomRef());
			};
        };

        CustomControl.prototype._listenToPicker = function (oPicker) {
            oPicker.attachBeforeOpen(this._onBeforeOpenPicker, this);
            oPicker.attachBeforeClose(this._onBeforeClosePicker, this);

            oPicker.addEventDelegate({
                onAfterRendering: this._onAfterRenderingPicker
            }, this);
        };

        CustomControl.prototype._onAfterRenderingPicker = function () {
            var oPicker = this._getPicker();

            oPicker._removeArrow();
            oPicker._setPosition();
        };

        CustomControl.prototype._onBeforeOpenPicker = function () {

        };

        CustomControl.prototype._onBeforeClosePicker = function () {
            var oHdrExpander = this._getHeaderExpander();

            if (oHdrExpander.getChecked()) {
                oHdrExpander.setChecked(false);
            }
        };

        CustomControl.prototype.onBeforeRendering = function () {
//            this.synchronizeSelection();
//			this._clearList();
//			this._fillList(this.getItems());
        };

        return CustomControl;
    },

    true
);
