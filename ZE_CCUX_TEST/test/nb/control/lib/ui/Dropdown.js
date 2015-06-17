/*global sap*/
/*jslint nomen:true*/


sap.ui.define(['jquery.sap.global', './library', 'sap/ui/core/Control', 'sap/ui/core/ValueStateSupport'], function (jQuery, library, Control, ValueStateSupport) {
    "use strict";

    var Dropdown = Control.extend('nb.control.lib.ui.Dropdown', {
            metadata : {library: 'nb.control.lib.ui',
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
                        type : 'nb.control.lib.ui.DropdownArrowColor',
                        group : 'Appearance',
                        defaultValue : 'Grey'
                    },
            /*Color of the dropdown arrow, check the enumeration DropdownArrowColor for possible values*/
                    arrowType : {
                        type : 'nb.control.lib.ui.DropdownArrowType',
                        group : 'Appearance',
                        defaultValue : 'Solid'
                    },

                /* Background Color of the dropdown field and the dropdown list,
                    check the enumeration    DropdownBackground  for possible values*/
                    background : {
                        type : 'nb.control.lib.ui.DropdownBackground',
                        group : 'Appearance',
                        defaultValue : 'Transparent'
                    },

                /*Decides if the Dropdwon field should have border,
                    check the enumeration DropdownBorder for possible values*/
                    border : {
                        type : 'nb.control.lib.ui.DropdownBorder',
                        group : 'Appearance',
                        defaultValue : 'All'
                    },
                       maxItems : {
                        type : 'int',
                        group : 'Dimension',
                           default: 5

                    }
                },

                defaultAggregation : 'DropdownListItems',
                aggregations : {
/**

* Getter for aggregation items. Allows setting ListItems (see sap.ui.core.ListBox) that shall be displayed in the list.
*/
                DropdownListItems :
                    {
                      // type : "sap.ui.core.ListItem",
                       type : "nb.control.lib.ui.DropdownListItem",
                        multiple : true,
                        singularName : 'DropdownListItem',
                        bindable: 'bindable'
                    }
            },


     }});



    Dropdown.prototype.onclick = function (oEvent) {

        var obj = this;


        if(this.getEnabled()){

     //   $("div.uteDD").toggleClass('active');
            $(document.getElementById(this.sId)).toggleClass('active');


        //this.opts = $("div").find('ul.uteDD-list > li');
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

    $(window).on("load resize",function() {
    var winHeight = $(window).height();
   /* $('#scrollerCa').css({
        'max-height' : (winHeight)-100 + "px",
        'overflow-y' : "auto",
        'overflow-x' : "hidden",
    });*/
        alert(winHeight);
});

    return Dropdown;
},

    true
);
