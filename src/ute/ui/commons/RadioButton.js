/*global sap*/
    // Provides control sap.ui.commons.RadioButton.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control'],
    function (jQuery, library, Control) {
        "use strict";
        var RadioButton = Control.extend("ute.ui.commons.RadioButton", {
            metadata : {
                library : "ute.ui.commons",
                properties : {
                    /**
                     * Defines the text displayed next to the radio button.
                     */
                    text : {type : "string", group : "Data", defaultValue : null},

                    /**
                     *
                     * Disabled controls are displayed in another color, depending on the customer settings.
                     */
                    enabled : {type : "boolean", group : "Behavior", defaultValue : true},

                    /**
                     * Specifies the select state of the radio button
                     */
                    selected : {type : "boolean", group : "Data", defaultValue : false},
                    /**
                     * The control width depends on the text length. Alternatively, CSS-sizes in % or px can be set.
                     */
                    width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},

                    /**
                     * Name of the radio button group the current radio button belongs to. You can define a new name for the group.
                     * If no new name is specified, this radio button belongs to the sapUiRbDefaultGroup per default. Default behavior of a radio button
                     * in a group is that when one of the radio buttons in a group is selected, all others are unselected.
                     */
                    groupName : {type : "string", group : "Behavior", defaultValue : 'sapUiRbDefaultGroup'}
                },
                events : {

                    /**
                     * Event is triggered when the user makes a change on the radio button.
                     */
                    select : {}
                }
            }
        });

        /**
         * Event handler called when the radio button is clicked.
         *
         * @param {jQuery.Event} oEvent
         * @private
         */
        RadioButton.prototype.onclick = function (oEvent) {

            if (this.getEnabled() && oEvent.target.id === (this.getId() + "-RB")) {
                this.focus();
            }

            this.userSelect(oEvent);
        };

        /**
         * This method is used internally only, whenever the user somehow selects the RadioButton.
         * It is responsible for event cancellation and for firing the select event.
         *
         * @param {jQuery.Event} oEvent
         * @private
         */
        RadioButton.prototype.userSelect = function (oEvent) {
            //	oEvent.preventDefault();
            // the control should not stop browser event propagation
            // Example: table control needs to catch and handle the event as well
            //oEvent.stopPropagation();

            if (this.getEnabled() && this.getEditable()) {
                var selected = this.getSelected();
                if (!selected) {
                    this.setSelected(true);
                    this.fireSelect({/* no parameters */});
                }
            } else {
                // readOnly or disabled -> don't allow browser to switch RadioButton on
                oEvent.preventDefault();
            }
        };

        // #############################################################################
        // Overwritten methods that are also generated in RadioButton.API.js
        // #############################################################################

        /*
         * Overwrite the definition from RadioButton.API.js
         */
        RadioButton.prototype.setSelected = function (bSelected) {

            var bSelectedOld = this.getSelected();

            this.setProperty("selected", bSelected, true); // No re-rendering
            bSelected = this.getSelected();

            if (bSelected) { // If this radio button is selected, explicitly deselect the other radio buttons of the same group
                if (this.getGroupName() && (this.getGroupName() !== "")) { // Do it only if groupName is set
                    // TODO: Add control references to some static list when they are constructed, in order to avoid searching every time
                    var others = document.getElementsByName(this.getGroupName());
                    for (var i = 0; i < others.length; i++) {
                        var other = others[i];
                        // Recommendation is that the HTML radio button has an ID ending with "-RB"
                        if (other.id && (other.id.length > 3) && (other.id.substr(other.id.length - 3) === "-RB")) {
                            // The SAPUI5 control is known by an ID without the "-RB" suffix
                            var oControl = sap.ui.getCore().getElementById(other.id.substr(0, other.id.length - 3));
                            if (oControl instanceof RadioButton && (oControl != this)) {
                                oControl.setSelected(false);
                            }
                        }
                    }
                }
            }
            if ((bSelectedOld != bSelected) && this.getDomRef() && this.getRenderer().setSelected) {
                this.getRenderer().setSelected(this, bSelected);
            }

            return this;
        };
        return RadioButton;

}, /* bExport= */ true);
