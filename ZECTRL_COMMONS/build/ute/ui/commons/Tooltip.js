sap.ui.define(["jquery.sap.global","sap/ui/commons/CalloutBase"],function(a,b){"use strict";var c=b.extend("ute.ui.commons.Tooltip",{metadata:{library:"ute.ui.commons",properties:{tooltipDesign:{type:"ute.ui.commons.TooltipDesign",group:"Appearance",defaultValue:"Black"}},aggregations:{content:{type:"sap.ui.core.Control",multiple:!0,singularName:"content"}},defaultAggregation:"content"}});return c},!0);