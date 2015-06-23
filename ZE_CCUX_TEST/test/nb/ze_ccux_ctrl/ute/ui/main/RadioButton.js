/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (jQuery, Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.RadioButton', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.RadioButtonDesign', defaultValue: nb.ui.main.RadioButtonDesign.Default },
                    checked: { type: 'boolean', defaultValue: false },
                    group: { type: 'string', defaultValue: null },
                    enabled: { type: 'boolean', defaultValue: true }
                },

               events: {
                    select: {}
                }
            }
        });

      //  EnabledPropagator.call(CustomControl.prototype);
        CustomControl.prototype._groupNames = {};

        CustomControl.prototype.exit = function () {
            this.$().unbind('change', jQuery.proxy(this.onchange));
        };

        CustomControl.prototype.onBeforeRendering = function () {
            this.$().unbind('change', jQuery.proxy(this.onchange));
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$().bind('change', jQuery.proxy(this.onchange, this));
        };

        CustomControl.prototype.onchange = function (oEvent) {
            if (!this.getEnabled()) {
                return;
            }

         this.setChecked(this.getDomRef('intRb').checked);
            this.fireSelect();
        };

        CustomControl.prototype.setChecked = function (bChecked) {

            var bSelectedOld, sGroup, aControlsInGroup;

            bSelectedOld = this.getChecked();
            sGroup = this.getGroup();
            aControlsInGroup = this._groupNames[sGroup] || [];

            this.setProperty('checked', bChecked, true);
            this._changeGroup(sGroup);

            if (bChecked && sGroup && sGroup !== '') {
                aControlsInGroup.forEach(function (oControlInGroup) {
                    if (oControlInGroup instanceof CustomControl && oControlInGroup !== this && oControlInGroup.getChecked()) {
                        oControlInGroup.setChecked(false);
                    }
                }.bind(this));
            }

            if (bSelectedOld !== bChecked && this.getDomRef()) {
                if (bChecked) {
                    this.getDomRef('intRb').checked = true;
                    this.getDomRef('intRb').setAttribute('checked', 'checked');

                } else {
                    this.getDomRef('intRb').checked = false;
				    this.getDomRef('intRb').removeAttribute('checked');
                }
            }

            return this;
        };

        CustomControl.prototype.setEnabled = function (bEnabled) {

            if (this.getDomRef()) {
                if (bEnabled) {
                    this.getDomRef('intRb').disabled = false;
                    this.getDomRef('intRb').removeAttribute('disabled');
                } else {
                    this.getDomRef('intRb').disabled = true;
                    this.getDomRef('intRb').setAttribute('disabled', 'disabled');
                }
            }

            this.setProperty('enabled', bEnabled);
            return this;
        };

   /*     CustomControl._getRadioButtonGroupRegistry = function () {
            if (!this._oRadioButtonGroupRegistry) {
                this._oRadioButtonGroupRegistry = [];
            }

            return this._oRadioButtonGroupRegistry;
        };*/

        CustomControl.prototype.setGroup = function (sGroup) {
            this._changeGroup(sGroup, this.getGroup());

            this.setProperty('group', sGroup, true);
            return this;
        };

        CustomControl.prototype._changeGroup = function (sNewGroup, sOldGroup) {
            var aNewGroup, aOldGroup;

            aNewGroup = this._groupNames[sNewGroup];
            aOldGroup = this._groupNames[sOldGroup];

            if (!aNewGroup) {
                this._groupNames[sNewGroup] = [];
                aNewGroup = this._groupNames[sNewGroup];
            }

            if (aNewGroup.indexOf(this) === -1) {
                aNewGroup.push(this);
            }

            if (aOldGroup && aOldGroup.indexOf(this) !== -1) {
                aOldGroup.splice(aOldGroup.indexOf(this), 1);
            }
        };

        return CustomControl;
    },

    true
);
