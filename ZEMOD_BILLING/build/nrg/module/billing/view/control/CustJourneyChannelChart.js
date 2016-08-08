sap.ui.define(["sap/ui/core/Control","sap/ui/thirdparty/d3"],function(a){"use strict";var b=a.extend("nrg.module.billing.view.control.CustJourneyChannelChart",{metadata:{properties:{width:{type:"int",defaultValue:500},height:{type:"int",defaultValue:300}},events:{totalDoublePress:{},sliceDoublePress:{parameters:{channel:{type:"string"}}}}},renderer:function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("nrgCustJCChart"),a.writeClasses(),a.write(">"),a.write("</div>")}});return b.prototype.onInit=function(){},b.prototype.onBeforeRendering=function(){},b.prototype.onAfterRendering=function(){this._createChart()},b.prototype.onExit=function(){this._oDataModel=null},b.prototype.refreshChart=function(){this.rerender()},b.prototype.setDataModel=function(a){return this._oDataModel=a,this},b.prototype.getDataModel=function(){return this._oDataModel},b.prototype._createChart=function(){function a(a){return a.Channel}function b(a){return a.Count}function c(a){return a.startAngle+(a.endAngle-a.startAngle)/2}var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=this,t=this.getWidth(),u=this.getHeight(),v=Math.min(t,u)/3;this.getDataModel()&&this.getDataModel().getData()&&this.getDataModel().getData().results&&this.getDataModel().getData().results.length>0&&(d=this.getDataModel().getData().results,e=d3.select("#"+this.getId()).append("svg").attr("width",t).attr("height",u).append("g").attr("transform","translate("+[t/2,u/2]+")"),f=d3.scale.ordinal().domain(d,a).range(["#2AA6DF","#FDD20A","#E80E89","#a6df2a","#59308c","#449646","#f15a24"]),g=e.append("g"),g.append("circle").attr("r",.95*v).style("fill","none").style("stroke","black").style("stroke-width",2),g.append("circle").attr("r",.8*v),h=e.append("g"),h.append("circle").attr("r",.35*v).attr("class","nrgCustJCChart-totalOuterBg"),h.append("circle").attr("r",.25*v).attr("class","nrgCustJCChart-totalInnerBg"),h.append("text").text(d3.sum(d,b)).attr("dy","0.35em").attr("class","nrgCustJCChart-totalText"),h.on("dblclick",function(){s.fireTotalDoublePress()}),i=d3.layout.pie().sort(null).value(b),j=d3.svg.arc().outerRadius(.6*v).innerRadius(.35*v),l=e.append("g"),k=l.append("g").selectAll("path.nrgCustJCChart-slice").data(i(d)).enter().append("path").attr("d",j).attr("class","nrgCustJCChart-slice").style("fill",function(b){return f(a(b.data))}),k.on("dblclick",function(a){s.fireSliceDoublePress({channel:a.data.Channel})}),m=l.append("g").selectAll("text.nrgCustJCChart-sliceValue").data(i(d)).enter().append("text").text(function(a){return b(a.data)}).attr("dy","0.35em").attr("transform",function(a){return"translate("+j.centroid(a)+")"}).attr("class","nrgCustJCChart-sliceValue"),m.on("dblclick",function(a){s.fireSliceDoublePress({channel:a.data.Channel})}),n=d3.svg.arc().outerRadius(.7*v).innerRadius(.7*v),o=d3.svg.arc().outerRadius(v).innerRadius(v),p=e.append("g").selectAll("polyline.nrgCustJCChart-line").data(i(d)).enter().append("polyline").attr("points",function(a){var b=o.centroid(a);return b[0]=1.1*v*(c(a)<Math.PI?1:-1),[n.centroid(a),o.centroid(a),b]}).attr("stroke",function(b){return f(a(b.data))}).attr("class","nrgCustJCChart-line"),q=e.append("g").selectAll("circle").data(i(d)).enter().append("circle").attr("r",.03*v).attr("fill","#ffffff").attr("stroke-width",2).attr("stroke",function(b){return f(a(b.data))}).attr("cx",function(a){return n.centroid(a)[0]}).attr("cy",function(a){return n.centroid(a)[1]}),r=e.append("g").selectAll("text.nrgCustJCChart-label").data(i(d)).enter().append("text").attr("dy","0.35em").attr("class","nrgCustJCChart-text").attr("transform",function(a){var b=o.centroid(a);return b[0]=1.2*v*(c(a)<Math.PI?1:-1),"translate("+b+")"}).style("text-anchor",function(a){return c(a)<Math.PI?"start":"end"}).text(function(b){return a(b.data)}))},b});