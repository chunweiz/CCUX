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
                
			},
			aggregations: {
				
			},
			defaultAggregation : 'content',
			events: {
				
			}
		}
	});
    
}