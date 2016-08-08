sap.ui.define(["nrg/base/view/BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","jquery.sap.global","sap/ui/model/json/JSONModel"],function(a,b,c,d,e){"use strict";var f=a.extend("nrg.module.billing.view.FeeAdjustments");return f.prototype.onBeforeRendering=function(){var a,b,c,d,f,g,h=new e({discNoticefee:!1,discRecovfee:!0,Latefee:!0,Reconnectfee:!0,feeDateDD:!0,reasonDD:!1,ok:!1,feeSelected:!1,textArea:!1}),i=this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),j=this.getView().byId("idnrgFeeAdj-DropDownCA"),k=this.getView().byId("idnrgFeeAdj-DropDownCA-temp"),l=this.getView().byId("idnrgFeeAdj-DropDownDate"),m=this.getView().byId("idnrgFeeAdj-DropDownDate-temp"),n=this;this._sContract=i.parameters.coNum,this._sBP=i.parameters.bpNum,this._sCA=i.parameters.caNum,this.getView().setModel(h,"view-feeAdj"),a=["BP"],b=["2473499"],c=this._createSearchFilterObject(a,b),d="/ContractAcctS",g=function(){var e=j.getContent();e&&e.length>0&&(j.setSelectedKey(e[0].getKey()),a=["CA"],b=["000004014634"],c=n._createSearchFilterObject(a,b),d="/DiscNoticeFeeS",f={model:"comp-feeAdjs",path:d,template:m,filters:c},l.bindAggregation("content",f))},f={model:"comp-feeAdjs",path:d,template:k,filters:c,events:{dataReceived:g}},j.bindAggregation("content",f)},f.prototype._createSearchFilterObject=function(a,d){var e,f=[];for(e=0;e<a.length;e+=1)f.push(new b(a[e],c.EQ,d[e],""));return f},f.prototype.onSubmit=function(){var a=this.getOwnerComponent().getModel("comp-feeAdjs"),b=this.getView().byId("idnrgFeeAdj-DropDownCA"),c=this.getView().byId("idnrgFeeAdj-textArea"),d=this.getView().byId("idnrgFeeAdj-DropDownDate"),e=this.getView().byId("idnrgFeeAdj-DropDownReason"),f={method:"POST",urlParameters:{Amount:"25",CA:b.getSelectedKey(),DocNum:d.getSelectedKey(),Reason:e.getSelectedKey(),Text:c.getValue()},success:function(){}.bind(this),error:function(){}.bind(this)};a.callFunction("/RemoveFee",f)},f.prototype.onDiscNoticeFee=function(){var a,b,c,d,e,f=this.getView().getModel("view-feeAdj"),g=this.getView().byId("idnrgFeeAdj-DropDownDate"),h=this.getView().byId("idnrgFeeAdj-DropDownDate-temp"),i=this.getView().byId("idnrgFeeAdj-DropDownCA");f.setProperty("/discNoticefee",!1),f.setProperty("/discRecovfee",!0),f.setProperty("/Latefee",!0),f.setProperty("/Reconnectfee",!0),f.setProperty("/reasonDD",!1),a=["CA"],b=[i.getSelectedKey()],c=this._createSearchFilterObject(a,b),d="/DiscNoticeFeeS",e={model:"comp-feeAdjs",path:d,template:h,filters:c},g.bindAggregation("content",e)},f.prototype.onDiscRecovFee=function(){var a,b,c,d,e,f=this.getView().getModel("view-feeAdj"),g=this.getView().byId("idnrgFeeAdj-DropDownDate"),h=this.getView().byId("idnrgFeeAdj-DropDownDate-temp"),i=this.getView().byId("idnrgFeeAdj-DropDownCA");f.setProperty("/discNoticefee",!0),f.setProperty("/discRecovfee",!1),f.setProperty("/Latefee",!0),f.setProperty("/Reconnectfee",!0),f.setProperty("/reasonDD",!1),a=["CA"],b=[i.getSelectedKey()],c=this._createSearchFilterObject(a,b),d="/DiscRecovFeeS",e={model:"comp-feeAdjs",path:d,template:h,filters:c},g.bindAggregation("content",e)},f.prototype.onLateFee=function(){var a,b,c,d,e,f=this.getView().getModel("view-feeAdj"),g=this.getView().byId("idnrgFeeAdj-DropDownDate"),h=this.getView().byId("idnrgFeeAdj-DropDownDate-temp"),i=this.getView().byId("idnrgFeeAdj-DropDownCA"),j=this.getView().byId("idnrgFeeAdj-DropDownReason"),k=this.getView().byId("idnrgFeeAdj-DropDownReason-temp");f.setProperty("/discNoticefee",!0),f.setProperty("/discRecovfee",!0),f.setProperty("/Latefee",!1),f.setProperty("/Reconnectfee",!0),f.setProperty("/reasonDD",!0),a=["CA"],b=[i.getSelectedKey()],c=this._createSearchFilterObject(a,b),d="/LateFeeS",e={model:"comp-feeAdjs",path:d,template:h,filters:c},g.bindAggregation("content",e),d="/RemovalReasonS",e={model:"comp-feeAdjs",path:d,template:k},j.bindAggregation("content",e)},f.prototype.onReconnectFee=function(){var a=this.getView().getModel("view-feeAdj");a.setProperty("/discNoticefee",!0),a.setProperty("/discRecovfee",!0),a.setProperty("/Latefee",!0),a.setProperty("/Reconnectfee",!1),a.setProperty("/reasonDD",!1)},f});