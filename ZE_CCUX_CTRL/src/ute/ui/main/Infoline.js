/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator',
        './Label',
        './Checkbox'
    ],

    function (Control, EnabledPropagator, Label, Checkbox) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Infoline', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.InfolineDesign', defaultValue: ute.ui.main.InfolineDesign.Default }
                },

                aggregations: {
                    headerContent: { type: 'sap.ui.core.Control', multiple: true, singularName: 'headerContent', visibility: 'hidden' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {
                        parameters: {
                            expanded: { type: 'boolean' }
                        }
                    }
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype.init = function () {
            this.addAggregation('headerContent', new Checkbox());
        };

        CustomControl.prototype._addHeader = function (oRm) {
//            this._oHdrContent = new Label({
//                labelFor: this.getId() + '-hdrExpander'
//            });
//
//            this._oHdrContent.addStyleClass('uteMIl-hdrContent');
//
//            oRm.renderControl(this._oHdrContent);
        };

        CustomControl.prototype._addHeaderExpander = function (oRm) {
            this.getAggregation('headerContent').forEach(function(oControl) {
                oRm.renderControl(oControl);
            }.bind(this));
        };

        CustomControl.prototype._addContent = function (oRm) {
            this.getContent().forEach(function(oControl) {
                oRm.renderControl(oControl);
            }.bind(this));
        };

        return CustomControl;
    },

    true
);
