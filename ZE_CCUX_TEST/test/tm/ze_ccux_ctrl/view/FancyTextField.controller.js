/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/Control'
    ],

    function (Controller, Control) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.FancyTextField');

        CustomController.prototype.onBeforeRendering = function () {
            var oContainer = this.getView().byId('content');
            var oTextField = this._createFancyTextField();

            oContainer.addContent(oTextField.setValue('value').setPlaceholder('placeholder'));
        };

        CustomController.prototype._createFancyTextField = function () {
            if (!this._CustomFancyTextField) {
                var oControlConfig = {
                    metadata: {
                        properties: {
                            value: { type: 'string', defaultValue: null },
                            placeholder: { type: 'string', defaultValue: null }
                        }
                    }
                };

                function renderValue(oRm, oCustomControl) {
                    oRm.write('<input');
                    oRm.writeAttribute('id', oCustomControl.getId() + '-input');
                    oRm.writeAttribute('type', 'text');
                    oRm.writeAttribute('required', 'required');
                    oRm.writeAttributeEscaped('value', oCustomControl.getValue());
                    oRm.addClass('customFTF-input');
                    oRm.writeClasses();
                    oRm.write(' />');
                };

                function renderPlaceholder(oRm, oCustomControl) {
                    oRm.write('<label');
                    oRm.writeAttribute('for', oCustomControl.getId() + '-input');
                    oRm.addClass('customFTF-placeholder');
                    oRm.writeClasses();
                    oRm.write('>');
                    oRm.writeEscaped(oCustomControl.getPlaceholder());
                    oRm.write('</label>');
                };

                oControlConfig.renderer = function (oRm, oCustomControl) {
                    oRm.write('<div');
                    oRm.writeControlData(oCustomControl);
                    oRm.addClass('customFTF');
                    oRm.writeClasses();
                    oRm.write('>');

                    renderValue(oRm, oCustomControl);
                    renderPlaceholder(oRm, oCustomControl);

                    oRm.write('</div>');
                };

                this._CustomFancyTextField = Control.extend('FancyTextField', oControlConfig);
            }

            return new this._CustomFancyTextField();
        };

        return CustomController;
    }
);
