/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'ute/ui/main/Checkbox',
        'sap/m/Popover',
        'sap/m/PlacementType',
        'sap/m/ScrollContainer'
    ],

    function (jQuery, Control, Checkbox, Popover, PlacementType, ScrollContainer) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Dropdown', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.DropdownDesign', defaultValue: ute.ui.main.DropdownDesign.Default },
                    enabled: { type: 'boolean', defaultValue: true }
                },

                aggregations: {
                    content: { type: 'ute.ui.main.DropdownItem', multiple: true, singularName: 'content' },

                    _expander: { type: 'ute.ui.main.Checkbox', multiple: false, visibility: 'hidden' },
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

        CustomControl.prototype.onBeforeRendering = function () {

        };

        CustomControl.prototype.onAfterRendering = function () {
            var aContent = this.getContent() || [];

            aContent.forEach(function (oContent) {
                oContent.detachPress(this._handleItemPressed);
                oContent.attachPress(this._handleItemPressed);
            }.bind(this));
        };

        CustomControl.prototype.exit = function () {

        };

        CustomControl.prototype._getExpander = function () {
            var oExpander;

            oExpander = this.getAggregation('_expander');
            if (oExpander) {
                return oExpander;
            }

            oExpander = new Checkbox({
                design: ute.ui.main.CheckboxDesign.None,
                select: jQuery.proxy(this._onExpanderSelected, this),
                checked: false
            });

            this.setAggregation('_expander', oExpander, true);

            return oExpander;
        };

        CustomControl.prototype._onExpanderSelected = function (oControlEvent) {

        };

        CustomControl.prototype._handleItemPressed = function (oControlEvent) {
            this.fireSelect({
                selectedItem: oControlEvent.getSource()
            });
        };

        CustomControl.prototype._getPicker = function () {
            var oPicker, self;

            oPicker = this.getAggregation('_picker');
            if (oPicker) {
                return oPicker;
            }

            self = this;

            /*
            ** Create a new picker
            */
            oPicker = new Popover({
                showHeader: false,
                placement: PlacementType.Vertical,
                offsetX: 0,
                offsetY: 0,
                initialFocus: this,
                bounce: false
            });

            /*
            ** Enhancing picker
            */
            oPicker._setArrowPosition = function () {};

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

            oPicker.open = function () {
				return this.openBy(self.getFocusDomRef());
			};

            /*
            ** Configure picker
            */
            oPicker.setHorizontalScrolling(false);
            oPicker.addStyleClass('uteMDd-picker');

            /*
            ** Add listeners to the picker
            */
            oPicker.attachBeforeOpen(this._onBeforeOpenPicker, this);
            oPicker.attachAfterOpen(this._onAfterOpenPicker, this);
            oPicker.attachBeforeClose(this._onBeforeClosePicker, this);
            oPicker.attachAfterClose(this._onAfterClosePicker, this);
            oPicker.addEventDelegate({
                onAfterRendering: this._onAfterRenderingPicker
            });

            /*
            ** Add the picker as part of control lifecycle
            */
            this.setAggregation('_picker', oPicker, true);

            return oPicker;
        };

        CustomControl.prototype._onAfterRenderingPicker = function () {
            var oPicker = this._getPicker();

			oPicker._removeArrow();
			oPicker._setPosition();
        };

        CustomControl.prototype._onBeforeOpenPicker = function (oControlEvent) {

        };

        CustomControl.prototype._onAfterOpenPicker = function (oControlEvent) {

        };

        CustomControl.prototype._onBeforeClosePicker = function (oControlEvent) {

        };

        CustomControl.prototype._onAfterClosePicker = function (oControlEvent) {

        };

        return CustomControl;
    },

    true
);
