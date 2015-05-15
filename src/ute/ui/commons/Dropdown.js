/*global sap*/
/*jslint nomen:true*/

sap.ui.define([
    'sap/ui/core/Control'
],
    function (Control) {
        'use strict';

        var Dropdown = Control.extend('ute.ui.commons.Dropdown', {
            metadata : {library: 'ute.ui.commons',
                properties: {
                /*Value of  the dropdown field*/
                    value : {
                        type : 'string',
                        group : 'Data',
                        defaultValue : '',
                        bindable : 'bindable'
                    },

                /*Initial text when no option has been selected*/
                    title: {
                        type: 'string',
                        defaultValue: ''
                    },

                /*If enabled = flase, will grey out*/
                    enabled : {
                        type : 'boolean',
                        group : 'Behavior',
                        defaultValue : true
                    },

               /*CSS type width of the Dropdown field, the min width is set to 200px.*/
                    width : {
                        type : 'sap.ui.core.CSSSize',
                        group : 'Dimension',
                        defaultValue : '200px'
                    },

              /*CSS type padding of the Dropdown field, the min width is set to 10px.*/
                    padding : {
                        type : 'sap.ui.core.CSSSize',
                        group : 'Dimension',
                        defaultValue : '10px'
                    },

             /*Color of the dropdown arrow, check the enumeration DropdownArrowColor for possible values*/
                    arrowcolor : {
                        type : 'ute.ui.commons.DropdownArrowColor',
                        group : 'Appearance',
                        defaultValue : 'Grey'
                    },

                /* Background Color of the dropdown field and the dropdown list,
                    check the enumeration    DropdownBackground  for possible values*/
                    background : {
                        type : 'ute.ui.commons.DropdownBackground',
                        group : 'Appearance',
                        defaultValue : 'Transparent'
                    },

                /*Decides if the Dropdwon field should have border,
                    check the enumeration DropdownBorder for possible values*/
                    border : {
                        type : 'ute.ui.commons.DropdownBorder',
                        group : 'Appearance',
                        defaultValue : 'All'
                    }
                },

                defaultAggregation : 'DropdownListItems',
                aggregations : {
/**

* Getter for aggregation DropdownListitems.
*/
                    DropdownListItems :
                        {
                            type : 'ute.ui.commons.DropdownListItem',
                            multiple : true,
                            singularName : 'DropdownListItem',
                            bindable: 'bindable'
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
