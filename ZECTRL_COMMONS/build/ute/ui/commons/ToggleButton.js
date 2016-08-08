sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool"],function(a,b,c){"use strict";var d=c.extend("ute.ui.commons.ToggleButton",{metadata:{library:"ute.ui.commons",properties:{leftBtnText:{type:"string",group:"Appearance",defaultValue:""},rightBtnText:{type:"string",group:"Appearance",defaultValue:""},leftSelected:{type:"boolean",group:"Behavior",defaultValue:!0},enabled:{type:"boolean",group:"Behavior",defaultValue:!0},leftBtnWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"262px"},rightBtnWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"262px"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},design:{type:"ute.ui.commons.ToggleButtonDesign",group:"Appearance",defaultValue:"ToggleCampaign"}},events:{press:{}}}});return d.prototype.onclick=function(a){this.getEnabled()&&(this.setLeftSelected(this.getLeftSelected()?!1:!0),this.firePress({}),a.preventDefault(),a.stopPropagation())},d},!0);