/*global sap*/
/*jslint nomen:true*/


sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/ValueStateSupport'], function (jQuery, library, Control, ValueStateSupport) {
    "use strict";

    var Dropdown = Control.extend('nb.control.lib.ui.Dropdown', {
            metadata : {library: 'nb.control.lib.ui',
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

                // Color of the dropdown arrow : Possible values - Grey or Blue
                    arrowcolor : {type : "string", group : "Appearance", defaultValue : "" },

                // Background Color: If true then white background otherwise transparent
                    whitebackground : {type : "boolean", group : "Behavior", defaultValue : false },

                //If the dropdownfield has border ( border color - grey )
                    border : {type : "boolean", group : "Behavior", defaultValue : false},

                    /**
* The property is “true” when the control is toggled. The default state of this property is "false".
*/
                    clicked : {type : "boolean", group : "Data", defaultValue : false}


                },

                defaultAggregation : "items",
                aggregations : {
/**

* Getter for aggregation items. Allows setting ListItems (see sap.ui.core.ListBox) that shall be displayed in the list.
*/
                items :
                    {
                        type : "sap.ui.core.ListItem",
                        multiple : true,
                        singularName : "item",
                        bindable: "bindable"
                    }
            },
            associations : {

			/**
			 * Using this method, you provide a listbox control. This allows reuse of item lists in different controls. Either a control id can be used as new target, or a control instance.
			 * The ListBox must not be rendered somewhere in the UI. But if you want to bind the ListBox Items to a model it must be in the control tree. So we suggest to add it as dependent somewhere (e.g. to the view or the first used ComboBox). If it is not set as child or dependant to an other control it will be automatically set as dependent to the first ComboBox where it is assigned.
			 */
			listBox : {type : "sap.ui.commons.ListBox", multiple : false}
		}

                /*events: {
                    press: {
                        parameters: {
                            expanded: { type: 'boolean' }
                        }
                    }
                }*/

     }});



    Dropdown.prototype.onclick = function (oEvent) {

        var obj = this;


        if(this.getEnabled()){

        $("div.uteDD").toggleClass('active');
        //this.opts = $("div").find('ul.uteDD-list > li');
        this.opts = $(oEvent.target).find('ul.uteDD-list > li');

        this.opts.on('click', function () {

            var opt = $(this);
            obj.setTitle(opt.text());


        });
      /*oEvent.preventDefault();
            oEvent.stopPropagation();      */
        }
    };

    return Dropdown;
},

    true
);
