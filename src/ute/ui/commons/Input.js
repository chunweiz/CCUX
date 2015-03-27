/*!
 * ${copyright}
 */

// Provides control sap.ui.commons.TextField.
sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/ValueStateSupport'],
	function(jQuery, library, Control, ValueStateSupport) {
        "use strict";

        var Input = Control.extend("ute.ui.commons.Input", /** @lends sap.ui.commons.TextField.prototype */ 
        { metadata : {    
            interfaces : [
			"sap.ui.commons.ToolbarItem"
		],
		library : "ute.ui.commons",
        
		properties : {
			value : {type : "string", group : "Data", defaultValue : '', bindable : "bindable"},
			
            enabled : {type : "boolean", group : "Behavior", defaultValue : true},
			
            editable : {type : "boolean", group : "Behavior", defaultValue : true},

			width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "320px" },

			//maxLength : {type : "int", group : "Behavior", defaultValue : 0},

			name : {type : "string", group : "Misc", defaultValue : null},

			placeholder : {type : "string", group : "Appearance", defaultValue : null},
            
            fieldType : { type: "string" , group: "Appearance", defaultValue: "field1" },
            //Two types of inputs, one is "field1" and the other is "field2""
            
            label: { type: "string" , group: "Appearance" , defaultvalue: null }
		},
		events : {
			/**
			 * Event is fired when the text in the field has changed AND the focus leaves the TextField or the Enter key is  pressed.*/
			change : {
				parameters : {

					/**
					 * The new / changed value of the textfield.
					 */
					newValue : {type : "string"}
				}
			}
        }
	}});
    
    Input.prototype.onsapfocusleave = function (oEvent){
        
        this._checkChange(oEvent) ;
        
        oEvent.preventDefault();
        oEvent.stopPropagation();
    };
    
    Input.prototype.onsapenter = function (oEvent){
        oEvent.preventDefault();
        oEvent.stopPropagation();
        
        this._checkChange(oEvent) ;
    }
    
    Input.prototype._checkChange = function(oEvent) {
		var oInput = this.getInputDomRef(),
			newVal = oInput && oInput.value,
			oldVal = this.getValue();

		if (this.getEditable() && this.getEnabled() && (oldVal != newVal)) {
			this.setProperty("value", newVal, true); // suppress rerendering
			this.fireChange({newValue:newVal}); // oldValue is not that easy in ComboBox and anyway not in API... thus skip it
		}
	};
    
    Input.prototype._getRenderOuter = function () {

		if (this.bRenderOuter == undefined) {
			var oRenderer = this.getRenderer();
			if (oRenderer.renderOuterAttributes || oRenderer.renderOuterContentBefore || oRenderer.renderOuterContent) {
				this.bRenderOuter = true;
			} else {
				this.bRenderOuter = false;
			}
		}
		return this.bRenderOuter;
	};
    
    Input.prototype.getInputDomRef = function(){

		if (!this._getRenderOuter()) {
			return this.getDomRef() || null;
		} else {
			return this.getDomRef("input") || null;
		}

	};
    

	return Input;

}, /* bExport= */ true);