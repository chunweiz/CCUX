/*global sap*/
/*jslint nomen:true*/

sap.ui.define([
    'sap/ui/core/Control'
],
    function (Control) {
        "use strict";

        var Dropdown = Control.extend('ute.ui.commons.Dropdown', {
            metadata : {library: 'ute.ui.commons',
                properties: {
                //Value the textfield
                    value : {type : "string", group : "Data", defaultValue : '', bindable : "bindable"},

                //Initial text when no option has been selected
                    title: {type: 'string', defaultValue: ''},

                //Not implemented, if enabled = flase will grey out
                    enabled : {type : "boolean", group : "Behavior", defaultValue : true},

//CSS type width of the Dropdown field, the min width is set to 200px.
                    width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "200px" },

                    //CSS type padding of the Dropdown field, the min width is set to 10px.
                    padding : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : "10px" },

                // Color of the dropdown arrow : Possible values - Grey or Blue
                    arrowcolor : {type : "string", group : "Appearance", defaultValue : "" },

                // Background Color: If true then white background otherwise transparent
                    whitebackground : {type : "boolean", group : "Behavior", defaultValue : false },

                //If the dropdownfield has border ( border color - grey )
                    border : {type : "boolean", group : "Behavior", defaultValue : false}
                },

                defaultAggregation : 'DropdownListItems',
                aggregations : {
/**

* Getter for aggregation DropdownListitems.
*/
                    DropdownListItems :
                        {
                            type : "ute.ui.commons.DropdownListItem",
                            multiple : true,
                            singularName : "DropdownListItem",
                            bindable: "bindable"
                        }
                }
                }
        });

/*Event handling when dropdown arrow is clicked or the value from the list has been selected*/
        Dropdown.prototype.onclick = function (oEvent) {

            var obj = this;

            if (this.getEnabled()) {

                $(document.getElementById(this.sId)).toggleClass('active');

                this.opts = $(oEvent.target).find('ul.uteDD-list > li');

                this.opts.on('click', function () {

                    var opt = $(this);
                    obj.setValue(opt.text());
                    $(this).parents('.uteDD').find('.uteDD-value').html(opt.html());


                });
      /*oEvent.preventDefault();
            oEvent.stopPropagation();      */
            }
        };

        return Dropdown;
    },

    true
    );
