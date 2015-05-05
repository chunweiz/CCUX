/*global sap*/
/*jslint nomen:true*/


sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/ValueStateSupport'], function (jQuery, library, Control, ValueStateSupport) {
    "use strict";

    var Dropdown = Control.extend('ute.ui.commons.Dropdown', {
            metadata : {library: 'ute.ui.commons',
                properties: {
                   //Value the textfield bind with
                    value : {type : "string", group : "Data", defaultValue : '', bindable : "bindable"},

                    title: {type: 'string', defaultValue: ''},

                //Not implemented, if enabled = flase will grey out
                    enabled : {type : "boolean", group : "Behavior", defaultValue : true},

//CSS type width of the Textfield, the min width is set to 168px.
                    width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "200px" },

                    //CSS type width of the Textfield, the min width is set to 168px.
                    padding : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "10px" },

                   //Placeholder value of a string before the input
                    placeholder : {type : "string", group : "Appearance", defaultValue : null},

                // Color of the dropdown arrow : Possible values - Grey or Blue
                    arrowcolor : {type : "string", group : "Appearance", defaultValue : "" },

                // Color of the dropdown arrow : Possible values - Grey or Blue
                    backgroundcolor : {type : "string", group : "Appearance", defaultValue : "" },

                //If the dropdownfield has border ( border color - grey )
                    border : {type : "boolean", group : "Behavior", defaultValue : true},

                    /**
* The property is “true” when the control is toggled. The default state of this property is "false".
*/
                    clicked : {type : "boolean", group : "Data", defaultValue : false}


                },

                defaultAggregation : "items", aggregations : {
/**

			 * Getter for aggregation items. Allows setting ListItems (see sap.ui.core.ListBox) that shall be displayed in the list.
			 */
			items :
            {
                type : "sap.ui.core.ListItem", multiple : true, singularName : "item",             bindable:"bindable"}
            },

                /*events: {
                    press: {
                        parameters: {
                            expanded: { type: 'boolean' }
                        }
                    }
                }*/
        }
    });



  Dropdown.prototype.onclick = function (oEvent) {

      $("div.uteDD").toggleClass('active');
        //this.opts = $("div").find('ul.uteDD-list > li');
        this.opts = $(oEvent.target).find('ul.uteDD-list > li');
       this.itm = $("div").find('ul.uteDD-list > li a');
      this.opts.on('click',function(){
                        alert('item click');
            /*alert(oEvent.target.g);*/
						/*var opt = this.opts;
                        alert((this.itm).text());*/
						/*$("div.uteDD").val = opt._data
						$("div.uteDD").index = opt.index();
						$("div.uteDD").placeholder.text($("div.uteDD").val);*/
					});
      /*oEvent.preventDefault();
            oEvent.stopPropagation();      */



    };

        return Dropdown;
    },

    true
);
