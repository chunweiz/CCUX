/*globals sap */
// Provides control sap.ui.commons.Button.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/EnabledPropagator', 'sap/ui/core/IconPool'],
	function (jQuery, library, Control, EnabledPropagator, IconPool) {
	    "use strict";


	
	/**
	 * Constructor for a new Button.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Enables users to trigger actions such as save or print. For the button UI, you can define some text or an icon, or both.
	 * @extends sap.ui.core.Control
	 * @implements sap.ui.commons.ToolbarItem
	 *
	 * @author SAP SE
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @alias sap.ui.commons.Button
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
        var ToggleButton = Control.extend("ute.ui.commons.ToggleButton", /** @lends sap.ui.commons.Button.prototype */ { metadata : {

            interfaces : [
                "sap.ui.commons.ToolbarItem"
            ],
            library : "ute.ui.commons",
            properties : {
                /**
                 * 
                 * Button text displayed at runtime.
                 */
                leftBtnText : {type : "string", group : "Appearance", defaultValue : ''},
                
                rightBtnText : {type : "string", group : "Appearance", defaultValue : ''},
                
                /** 
                 * Boolean property to enable the control (default is true). Buttons that are disabled have other colors than                    * enabled ones, depending on custom settings.
                 * In toggle button we only keeo one "enable" property
                 */
                enabled : {type : "boolean", group : "Behavior", defaultValue : true},

                /**
                 * 
                 * Control width as common CSS-size (px or % as unit, for example)
                 */
                leftBtnWidth : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "249px"},
                
                rightBtnWidth : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "249px"},

                /**
                 * 
                 * Unique identifier used for help service
                 */
                helpId : {type : "string", group : "Behavior", defaultValue : ''},

                /**
                 * Specifies the button height. If this property is set, the height which is specified by the underlying theme is not used any longer.
                 */
                height : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null}
                
                
            },
            associations : {

                /**
                 * Association to controls / ids which describe this control (see WAI-ARIA attribute aria-describedby).
                 */
                ariaDescribedBy : {type : "sap.ui.core.Control", multiple : true, singularName : "ariaDescribedBy"},

                /**
                 * Association to controls / ids which label this control (see WAI-ARIA attribute aria-labelledby).
                 */
                ariaLabelledBy : {type : "sap.ui.core.Control", multiple : true, singularName : "ariaLabelledBy"}
            },
            events : {

                /**
                 * 
                 * Event is fired when the user presses the control.
                 */
                press : {}
            }
        }});


        /**
         * Puts the focus to the button.
         *
         * @name sap.ui.commons.Button#focus
         * @function
         * @type void
         * @public
         * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
         */
    

        EnabledPropagator.call(ToggleButton.prototype);

        /**
         * Function is called when button is clicked.
         *
         * @param {jQuery.Event} oEvent
         * @private
         */
        ToggleButton.prototype.onclick = function (oEvent) {
            if (this.getEnabled()) {
                this.firePress({/* no parameters */});
                this.getRenderer().toggle( this ) ;
                    
            }

            oEvent.preventDefault();
            oEvent.stopPropagation();
        };

        

        return ToggleButton;

    }, /* bExport= */ true);