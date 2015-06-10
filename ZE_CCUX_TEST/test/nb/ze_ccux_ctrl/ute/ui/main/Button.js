/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.Button', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.ButtonDesign', defaultValue: nb.ui.main.ButtonDesign.Default },
                    text: { type: 'string', defaultValue: null },
                    disabled: { type: 'boolean', defaultValue: false }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {}
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype.setDisabled = function (oValue) {
            if (oValue) {
                this.data('disabled', 'true', true);
            } else {
                this.data('disabled', null);
            }

            this.setProperty('disabled', oValue);
            return this;
        };

        CustomControl.prototype.ontap = function (oEvent) {
            if (!this.getDisabled()) {
                this.firePress();
            }
        };

        CustomControl.prototype._addHtmlText = function (oRm) {
            oRm.write('<div');
            oRm.addClass('uteMBtn-text');
            oRm.writeClasses();
            oRm.write('>');
            oRm.writeEscaped(this.getText());
            oRm.write('</div>');
        };

        CustomControl.prototype._addHtmlContent = function (oRm) {
            var aContent = this.getContent() || [];

            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            }.bind(this));
        };

        return CustomControl;
    },

    true
);
