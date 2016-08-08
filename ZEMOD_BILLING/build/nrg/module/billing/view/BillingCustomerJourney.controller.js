sap.ui.define(["nrg/base/view/BaseController","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","jquery.sap.global","sap/ui/core/format/DateFormat"],function(a,b,c,d,e,f){"use strict";var g=a.extend("nrg.module.billing.view.BillingCustomerJourney");return g.prototype.onInit=function(){},g.prototype.onAfterRendering=function(){var a=sap.ui.getCore().getEventBus();a.unsubscribe("nrg.module.dashoard","eAfterConfirmed",this._refreshCJ,this),a.subscribe("nrg.module.dashoard","eAfterConfirmed",this._refreshCJ,this)},g.prototype.onBeforeRendering=function(){var a,c,d,g,h,i=(this.getOwnerComponent().getModel("comp-cj"),this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo()),j=(this.getView().byId("idnrgCustomerRef"),this.getView().byId("idnrgCustomerRef-temp"),this),k=new b({expandAll:!1,piechart:!1,icons:!1,interval1:!1,interval2:!1}),l=this.getView().byId("idnrgCJPieChart");h=new b,this.getView().setModel(h,"Cj-timeline"),g=new b,l.setDataModel(g),this.getView().setModel(g,"Cj-PieChart"),this._sContract=i.parameters.coNum,this._sBP=i.parameters.bpNum,this._sCA=i.parameters.caNum,this._oFormatYyyymmdd=f.getInstance({pattern:"MM/dd/yyyy"}),this.getView().setModel(k,"cj-view"),d=new b,this.getView().setModel(d,"Cj-Date"),c="/CJLifeCycleSet(BP='"+this._sBP+"',CA='"+this._sCA+"')",a={success:function(a){d.setData(a),j._dateHandler(!0,!1,a.FirstButtonEnabled),j._loadIcons(a.StartDate,a.EndDate),j._loadPieChart(a.StartDate,a.EndDate),j._loadReferral(a.StartDate,a.EndDate),e.sap.log.info("Odata Read Successfully:::")}.bind(this),error:function(){e.sap.log.info("Odata Read Error occured")}.bind(this)}},g.prototype._refreshCJ=function(a,b,c){var d,f,g=this.getView().getModel("Cj-Date"),h=this.getOwnerComponent().getModel("comp-cj"),i=this;this._sBP=c.bpNum,this._sCA=c.caNum,d="/CJLifeCycleSet(BP='"+this._sBP+"',CA='"+this._sCA+"')",f={success:function(a){g.setData(a),i._dateHandler(!0,!1,a.FirstButtonEnabled),i._loadIcons(a.StartDate,a.EndDate),i._loadPieChart(a.StartDate,a.EndDate),i._loadReferral(a.StartDate,a.EndDate),e.sap.log.info("Odata Read Successfully:::")}.bind(this),error:function(){e.sap.log.info("Odata Read Error occured")}.bind(this)},h&&h.read(d,f)},g.prototype._loadReferral=function(a,b){var c,d,e,f,g,h=this.getView().byId("idnrgCustomerRef"),i=this.getView().byId("idnrgCustomerRef-temp");e=["BP","CA","StartDate","EndDate"],f=[this._sBP,this._sCA,a,b],g=this._createSearchFilterObject(e,f),c="/CJReferralSet",h.removeAllAggregation("content"),d={model:"comp-cj",path:c,template:i,filters:g},h.bindAggregation("content",d)},g.prototype._loadPieChart=function(a,b){var c,d,f,g,h,i=this.getOwnerComponent().getModel("comp-cj"),j=this.getView().getModel("Cj-PieChart"),k=this.getView().byId("idnrgCJPieChart"),l=this.getView().getModel("cj-view");c="/CJFrequencySet",d=["BP","CA","StartDate","EndDate"],f=[this._sBP,this._sCA,a,b],g=this._createSearchFilterObject(d,f),h={filters:g,success:function(a){j.setData(a),a.results&&a.results.length>0?l.setProperty("/piechart",!1):l.setProperty("/piechart",!0),e.sap.log.info("Odata Read Successfully:::"),k.refreshChart()}.bind(this),error:function(){e.sap.log.info("Odata Read Error occured")}.bind(this)},i&&i.read(c,h)},g.prototype._loadIcons=function(a,b){var c,d,f,g,h,i=this.getOwnerComponent().getModel("comp-cj"),j=this.getView().getModel("Cj-timeline"),k=this,l=this.getView().getModel("cj-view");c="/CJIconsSet",d=["BP","CA","StartDate","EndDate"],f=[this._sBP,this._sCA,a,b],g=this._createSearchFilterObject(d,f),h={filters:g,success:function(a){j.setData(k.convertIcons(a.results)),a.results&&a.results.length>0?l.setProperty("/icons",!1):l.setProperty("/icons",!0),e.sap.log.info("Odata Read Successfully:::"),k.getOwnerComponent().getCcuxApp().setOccupied(!1)}.bind(this),error:function(){e.sap.log.info("Odata Read Error occured"),k.getOwnerComponent().getCcuxApp().setOccupied(!1)}.bind(this)},i&&i.read(c,h)},g.prototype._dateHandler=function(a,b,c){var d=this.getView().byId("idnrgBllCJ-fromDate"),e=this.getView().byId("idnrgBllCJ-toDate"),f=(this.getView().byId("idnrgBllCJ-Interval1"),this.getView().byId("idnrgBllCJ-Interval2"),this.getView().getModel("Cj-Date")),g=new Date,h=this.getView().getModel("cj-view");a&&(e.setMinDate(new Date(1,0,1)),d.setMinDate(new Date(1,0,1))),b?c?(g.setDate(g.getDate()-f.getProperty("/Interval1")),e.setDefaultDate(this._oFormatYyyymmdd.format(new Date,!0)),f.setProperty("/EndDate",new Date),d.setDefaultDate(this._oFormatYyyymmdd.format(g,!0)),f.setProperty("/StartDate",g)):(g.setDate(g.getDate()-f.getProperty("/Interval2")),e.setDefaultDate(this._oFormatYyyymmdd.format(new Date,!0)),f.setProperty("/EndDate",new Date),d.setDefaultDate(this._oFormatYyyymmdd.format(g,!0)),f.setProperty("/StartDate",g)):(f.getProperty("/FirstButtonEnabled")?(h.setProperty("/interval1",!0),h.setProperty("/interval2",!1)):(h.setProperty("/interval1",!1),h.setProperty("/interval2",!0)),e.setDefaultDate(this._oFormatYyyymmdd.format(f.getProperty("/EndDate"),!0)),d.setDefaultDate(this._oFormatYyyymmdd.format(f.getProperty("/StartDate"),!0)))},g.prototype.onInterval1=function(){var a=this.getView().getModel("Cj-Date"),b=this.getView().getModel("cj-view");b.setProperty("/interval1",!1),b.setProperty("/interval2",!0),this._dateHandler(!1,!0,!0),this._loadIcons(a.getProperty("/StartDate"),a.getProperty("/EndDate")),this._loadPieChart(a.getProperty("/StartDate"),a.getProperty("/EndDate")),this._loadReferral(a.getProperty("/StartDate"),a.getProperty("/EndDate"))},g.prototype.onInterval2=function(){var a=this.getView().getModel("Cj-Date"),b=this.getView().getModel("cj-view");b.setProperty("/interval1",!0),b.setProperty("/interval2",!1),this._dateHandler(!1,!0,!1),this._loadIcons(a.getProperty("/StartDate"),a.getProperty("/EndDate")),this._loadPieChart(a.getProperty("/StartDate"),a.getProperty("/EndDate")),this._loadReferral(a.getProperty("/StartDate"),a.getProperty("/EndDate"))},g.prototype.onUpdate=function(){var a=new Date(this.getView().byId("idnrgBllCJ-fromDate").getValue()),b=new Date(this.getView().byId("idnrgBllCJ-toDate").getValue()),c=this.getView().getModel("Cj-Date"),d=this.getView().getModel("cj-view");d.setProperty("/interval1",!0),d.setProperty("/interval2",!0),c.setProperty("/StartDate",a),c.setProperty("/EndDate",b),this._loadIcons(c.getProperty("/StartDate"),c.getProperty("/EndDate")),this._loadPieChart(c.getProperty("/StartDate"),c.getProperty("/EndDate")),this._loadReferral(c.getProperty("/StartDate"),c.getProperty("/EndDate"))},g.prototype._onChannelPress=function(a){a.getSource().setSelected(!a.getSource().getSelected())},g.prototype._onChannelDPress=function(){},g.prototype._onTotalPress=function(){this.onCustomerJourneyModule()},g.prototype._onSlicePress=function(){this.onCustomerJourneyModule()},g.prototype._createSearchFilterObject=function(a,b,e){var f,g=[];if(e||(e=d.EQ),void 0!==a)for(f=0;f<a.length;f+=1)g.push(new c(a[f],d.EQ,b[f],""));return g},g.prototype.onCustomerJourneyModule=function(){var a,c,d,f,g,h,i,j,k,l,m=this,n=this.getOwnerComponent().getModel("comp-cj");l=this.getView().getModel("Cj-Date"),k=new b,this.getOwnerComponent().getCcuxApp().setOccupied(!0),g=["BP","CA","StartDate","EndDate"],h=[this._sBP,this._sCA,l.getProperty("/StartDate"),l.getProperty("/EndDate")],f=this._createSearchFilterObject(g,h),this._oDialogFragment||(this._oDialogFragment=sap.ui.xmlfragment("CustomerJourney","nrg.module.billing.view.CJModule",this)),void 0===this._oCJDialog&&(this._oCJDialog=new ute.ui.main.Popup.create({title:"CUSTOMER JOURNEY MODULE",close:this._handleDialogClosed,content:this._oDialogFragment}),this._oCJDialog.addStyleClass("nrgCJModule-dialog")),this._oDialogFragment.setModel(k,"Cj-module"),a="/CJModuleSet",d=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-table"),d.setModel(k),i=sap.ui.core.Fragment.byId("CustomerJourney","idnrgBllCJ-fromDate"),j=sap.ui.core.Fragment.byId("CustomerJourney","idnrgBllCJ-toDate"),j.setMinDate(new Date(1,0,1)),i.setMinDate(new Date(1,0,1)),j.setDefaultDate(this._oFormatYyyymmdd.format(l.getProperty("/EndDate"),!0)),i.setDefaultDate(this._oFormatYyyymmdd.format(l.getProperty("/StartDate"),!0)),this._oDialogFragment.setModel(new b({data:[{recordIndex:"0",channelIcon:"sap-icon://ute-icon/website",topLabel:"Website",channel:"Website"},{recordIndex:"1",channelIcon:"sap-icon://ute-icon/webchat",topLabel:"Chat",channel:"Chat"},{recordIndex:"2",channelIcon:"sap-icon://ute-icon/survey",topLabel:"Survey",channel:"Survey"},{recordIndex:"3",channelIcon:"sap-icon://ute-icon/agent",topLabel:"Phone",channel:"Phone"},{recordIndex:"4",channelIcon:"sap-icon://ute-icon/ivr",topLabel:"IVR",channel:"IVR"},{recordIndex:"5",channelIcon:"sap-icon://email",topLabel:"Correspondence",channel:"Correspondence"},{recordIndex:"6",channelIcon:"sap-icon://iphone",topLabel:"Mobile",channel:"Mobile"},{recordIndex:"7",channelIcon:"sap-icon://ute-icon/location",topLabel:"Misc",channel:"Misc"},{recordIndex:"7",channelIcon:"sap-icon://multi-select",topLabel:"All",channel:"All"}]}),"timeline"),c={filters:f,success:function(a){k.setData(m.convertCJModuleData(a.results)),m._oCJDialog.open(),m.getOwnerComponent().getCcuxApp().setOccupied(!1),e.sap.log.info("Odata Read Successfully:::")}.bind(this),error:function(){m.getOwnerComponent().getCcuxApp().setOccupied(!1),e.sap.log.info("Odata Read Error occured")}.bind(this)},n&&n.read(a,c)},g.prototype.onModuleRefresh=function(){var a,b,c,d,f,g,h=sap.ui.core.Fragment.byId("CustomerJourney","idnrgBllCJ-fromDate"),i=sap.ui.core.Fragment.byId("CustomerJourney","idnrgBllCJ-toDate"),j=this.getOwnerComponent().getModel("comp-cj"),k=this._oDialogFragment.getModel("Cj-module"),l=this,m="/CJModuleSet",n=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-table"),o=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-DD");this.getOwnerComponent().getCcuxApp().setOccupied(!0),b=["BP","CA","StartDate","EndDate"],c=[this._sBP,this._sCA,new Date(h.getValue()),new Date(i.getValue())],a=this._createSearchFilterObject(b,c),f=o.getSelectedKey(),"All"===f&&(f=""),d={filters:a,success:function(b){k.setData(l.convertCJModuleData(b.results)),g=new sap.ui.model.Filter("ChannelType",sap.ui.model.FilterOperator.Contains,f),a=new sap.ui.model.Filter({filters:[g],and:!1}),n.getBinding("rows").filter(a),l.getOwnerComponent().getCcuxApp().setOccupied(!1),e.sap.log.info("Odata Read Successfully:::")}.bind(this),error:function(){l.getOwnerComponent().getCcuxApp().setOccupied(!1),e.sap.log.info("Odata Read Error occured")}.bind(this)},j&&j.read(m,d)},g.prototype.onCustomerReferral=function(a){var b=this.getOwnerComponent().getCcuxWebUiManager(),c=a.getSource().getText();b.notifyWebUi("openIndex",{LINK_ID:"ZEMMACASE",REF_ID:c})},g.prototype.onContactLogFullView=function(){var a=this.getOwnerComponent().getCcuxWebUiManager();a.notifyWebUi("openIndex",{LINK_ID:"Z_CLFULLVW"})},g.prototype._onSelectIcon=function(a){var b="sap-icon://ute-icon/location";switch(a){case"Website":b="sap-icon://ute-icon/website";break;case"Chat":b="sap-icon://ute-icon/webchat";break;case"Survey":b="sap-icon://ute-icon/survey";break;case"agent":b="sap-icon://ute-icon/agent";break;case"IVR":b="sap-icon://ute-icon/ivr";break;case"Phone":b="sap-icon://ute-icon/agent";break;case"Correspondence":b="sap-icon://email";break;case"Mobile":b="sap-icon://iphone";break;case"MISC":b="sap-icon://ute-icon/location"}return b},g.prototype.convertIcons=function(a){var b,c;for(b=0;b<a.length;b+=1)void 0!==a[b]&&void 0!==a[b].Icon&&(a[b].Channel=a[b].Icon,a[b].Icon=this._onSelectIcon(a[b].Icon));return c={},c.results=a,c},g.prototype.convertCJModuleData=function(a){var b,c,d,e,f,g,h,i=[],j=[];for(c=0;c<a.length;c+=1){if(b=a[c],void 0!==b&&void 0!==b.ColHeaders){for(e=b.ColHeaders.split("~"),d=0;d<e.length;d+=1)i.push({header:e[d]});a[c].headers=i,i=[]}if(void 0!==b&&void 0!==b.ColValues){for(f=b.ColValues.split("~"),g=1,j=[],d=0;d<f.length;d+=1)j.push({value:f[d]});a[c].values=[],a[c].values.push({cells:j})}a[c].expanded=!1}return h={},h.results=a,h},g.prototype._onChannelSelect=function(a){var b,c,d=a.getSource().getChannel(),e=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-table");this.getOwnerComponent().getCcuxApp().setOccupied(!0),a.getSource().setSelected(!a.getSource().getSelected()),"All"===d&&(d=""),b=new sap.ui.model.Filter("ChannelType",sap.ui.model.FilterOperator.Contains,d),c=new sap.ui.model.Filter({filters:[b],and:!1}),e.getBinding("rows").filter(c),this.getOwnerComponent().getCcuxApp().setOccupied(!1)},g.prototype.onExpandAll=function(a){var b,c,d,e,f=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-table").getRows(),g=a.getSource().getParent().getModel("Cj-module"),h=this.getView().getModel("cj-view");for(b=0;b<f.length;b+=1)c=f[b],d=c.getBindingContext("Cj-module"),e=d.getPath(),g.setProperty(e+"/expanded",!d.getProperty(e+"/expanded"));h.getProperty("/expandAll")?(a.getSource().removeStyleClass("nrgCJModule-table-th-contactsel"),h.setProperty("/expandAll",!1)):(a.getSource().addStyleClass("nrgCJModule-table-th-contactsel"),h.setProperty("/expandAll",!0))},g.prototype.onSearch=function(){var a,b,c,d=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-search"),e=sap.ui.core.Fragment.byId("CustomerJourney","idnrgCJModule-table");this.getOwnerComponent().getCcuxApp().setOccupied(!0),a=new sap.ui.model.Filter("SingleMessage",sap.ui.model.FilterOperator.Contains,d.getValue()),b=new sap.ui.model.Filter("ColValues",sap.ui.model.FilterOperator.Contains,d.getValue()),c=new sap.ui.model.Filter({filters:[a,b],and:!1}),e.getBinding("rows").filter(c),this.getOwnerComponent().getCcuxApp().setOccupied(!1)},g});