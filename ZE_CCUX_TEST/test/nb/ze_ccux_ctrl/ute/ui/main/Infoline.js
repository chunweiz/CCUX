/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator',
        './Checkbox'
    ],

    function (Control, EnabledPropagator, Checkbox) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.Infoline', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.InfolineDesign', defaultValue: nb.ui.main.InfolineDesign.Default },
                    expanded: { type: 'boolean', defaultValue: false }
                },

                aggregations: {
                    headerContent: { type: 'sap.ui.core.Control', multiple: true, singularName: 'headerContent' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' },

                    _headerExpander: { type: 'sap.ui.core.Control', multiple: false, visibility: 'hidden' }
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

        CustomControl.prototype.onBeforeRendering = function () {
            if (this._oHdrExpander) {
                return;
            }

            this._oHdrExpander = new Checkbox({
                design: ute.ui.main.CheckboxDesign.None,
                select: jQuery.proxy(this._onHdrExpanderSelected, this),
                checked: this.getExpanded()
            });

            this.setAggregation('_headerExpander', this._oHdrExpander);
        };

        CustomControl.prototype._onHdrExpanderSelected = function (oControlEvent) {
            var bExpand = oControlEvent.getParameter('checked');
            this.setExpanded(bExpand);
            this.firePress({ expanded: bExpand });
        };

        CustomControl.prototype.setExpanded = function (bValue) {
            this.$('.uteMIl-body').toggleClass('uteMIl-body-hidden');

            this.setProperty('expanded', bValue);
            return this;
        };

        CustomControl.prototype.exit = function () {
            if (this._oHdrExpander) {
                this._oHdrExpander.destroy();
                this._oHdrExpander = null;
            }
        };

        return CustomControl;
    },

    true
);
