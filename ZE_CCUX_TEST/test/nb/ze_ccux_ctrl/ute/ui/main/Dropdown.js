/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator',
        './Checkbox',
        'sap/ui/core/Popup',
    ],

    function (Control, EnabledPropagator, Checkbox, Popup) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.Dropdown', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.DropdownDesign', defaultValue: nb.ui.main.DropdownDesign.Default },
                    expanded: { type: 'boolean', defaultValue: false },
                    key: { type: 'string', defaultValue: null },
                    selected: { type: 'boolean', defaultValue: false }
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
                design: nb.ui.main.CheckboxDesign.None,
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
            this.$('.uteMDd-body').toggleClass('uteMDd-body-hidden');

            this.setProperty('expanded', bValue);

            return this;
        };

        CustomControl.prototype.exit = function () {
            if (this._oHdrExpander) {
                this._oHdrExpander.destroy();
                this._oHdrExpander = null;
            }
        };
         CustomControl.prototype.onclick = function (oEvent) {

           // this.opts = oEvent.target

            $(oEvent.target).on('click', function() {
                if (oEvent.target.className === "uteMDd-body"){
                    alert(oEvent.target.innerHTML);
              }
            });


            return this;
        };


        CustomControl.prototype.init = function () {

          this._dropdownPopup = new sap.ui.core.Popup(/*{
        content : [ this ], //complete calendar control which should be displayed on the popup

    }*/);


        };

        return CustomControl;
    },

    true
);
