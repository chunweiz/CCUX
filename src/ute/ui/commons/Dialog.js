sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/Popup'],
function(jQuery, library, Control, Popup) {
    "use strict";
    
    var Dialog = Control.extend('ute.ui.commons.Dialog', {
		metadata: {
            interfaces: [
                "sap.ui.core.PopupInterface"
            ],
			library: 'ute.ui.commons',
			properties: {
				title: {
					type: 'string',
                    group: 'Misc',
					defaultValue: ''
				},
                width: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },
				/**
                *   Not putting a scrollLeft or scrollTop here compare to original UI5 Dialog
                *   Will add if needed
                */
                applyContentPadding: {
                    type: "boolean",
                    group: "Appearance",
                    defaultValue: true
                },
                resizable: {
                    type: "boolean",
                    group: "Behavior",
                    defaultValue: true
                },
                 minWidth: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },
                minHeight: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },

                maxWidth: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },
                maxHeight: {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: null
                },
                
                /**
                * Specify whether the dialog should be modal, or not. In case of <code>true</code> the focus is kept inside the dialog.
                */
                modal: {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: false
                },

                /**
                * The ARIA role for the control. E.g. for alert-style Dialogs this can be set to "AlertDialog".
                 */
                accessibleRole: {
                    type: "sap.ui.core.AccessibleRole",
                    group: "Accessibility",
                    defaultValue: sap.ui.core.AccessibleRole.Dialog
                },

                /**
                * Whether Dialog movement should be restricted to the visible area of the window. This only affects drag&drop movements                   * by the user. This doesn't affect modal dialogs -> modal dialogs always stay in the window.
                * @since 1.9.0
                */
                keepInWindow: {
                    type: "boolean",
                    group: "Behavior",
                    defaultValue: false
                },
                /**
                * If this property is set to true the Dialog will close if the Dialog loses its focus
                * @since 1.10
                */
                autoClose: {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: false
                }       
			},
            defaultAggregation: "content",
			aggregations: {
                /**
                * Aggregating the buttons to display at the bottom of the dialog, for example OK and Cancel. Association defaultButton                   * can be used for one of the defined buttons.
                */
				buttons: {
                    type: "sap.ui.core.Control",
                    multiple: true,
                    singularName: "button"
                },
                /**
                * Aggregating the content of the dialog (one or more controls).
                *
                * Caveat: when content is added with width given as a percentage, the Dialog itself should have a width set.
                 */
                content: {
                    type: "sap.ui.core.Control",
                    multiple: true,
                    singularName: "content"
                }
                
			},
            associations: {
                /**
                *
                * Defines one of the buttons that have been provided via button aggregation to be the default button. This default button                 * is initially selected, if no control is set via the initialFocus association explicitly. The default button is                         *activated when Enter is pressed in the context of the dialog and when the currently selected element does not handle the                 *Enter event itself.
                */
                defaultButton: {
                    type: "sap.ui.commons.Button",
                    multiple: false
                },

                /**
                *
                * Defines the control that shall get the focus when the dialog is opened.
                */
                initialFocus: {
                    type: "sap.ui.core.Control",
                    multiple: false
                }
            },
            
			events: {
                parameters: {
                    /**
                    * the width of the dialog when closed
                    */
                    width: {
                        type: "int"
                    },
                    /**
                    * the height of the dialog when closed
                    */
                    height: {
                        type: "int"
                    },
                    /**
                    * the top position of the dialog when closed
                    */
                    top: {
                        type: "int"
                    },
                    /**
                    * the left position of the dialog when closed
                    */
                    left: {
                        type: "int"
                    }
                }
			}
		}
	});
    
    /**
     * Initialization hook for the dialog.
     * It creates the instance of the Popup helper service and does some basic configuration for it.
     *
     * @private
     */
    Dialog.prototype.init = function() {
        // do something for initialization...
        this.oPopup = new Popup(this, true, true);
        var eDock = Popup.Dock;
        this.oPopup.setPosition(eDock.CenterCenter, eDock.CenterCenter, window);

        this._minWidth = 64; // the technical minWidth, not the one set via API; will be calculated after rendering
        this._minHeight = 48; // the technical minHeight, not the one set via API; will be calculated after rendering
        // TODO: re-calculate after theme switch?!!

        this.allowTextSelection(false);
        this._mParameters = {};
        this._mParameters.that = this;
        this._mParameters.firstFocusable = this.getId() + "-fhfe";
        this._mParameters.lastFocusable = this.getId() + "-fhee";
    };

    Dialog.prototype.setInitialFocus = function(sId) {
        if (sId != null && typeof sId != "string") {
            sId = sId.getId();
        }
        this.oPopup.setInitialFocusId(sId);
        this.setAssociation("initialFocus", sId, /* suppress invalidate */ true);
    };

    
}