/*global sap*/
/*jslint nomen:true*/


sap.ui.define(['sap/ui/core/Control'], function (Control) {
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

                   //Placeholder value of a string before the input
                    //placeholder : {type : "string", group : "Appearance", defaultValue : null},

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
                        type : "sap.ui.core.ListItem",
                        multiple : true,
                        singularName : "item",
                        bindable: "bindable"
                    }
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

        var obj = this;

        $("div.uteDD").toggleClass('active');
        //this.opts = $("div").find('ul.uteDD-list > li');
        this.opts = $(oEvent.target).find('ul.uteDD-list > li');

        this.opts.on('click', function () {

            var opt = $(this);
            obj.setTitle(opt.text());

        });
      /*oEvent.preventDefault();
            oEvent.stopPropagation();      */

    };

    return Dropdown;
},

    true
);
