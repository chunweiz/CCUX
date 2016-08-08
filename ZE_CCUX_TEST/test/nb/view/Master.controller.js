sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

    /*
	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
    */

    onButtonClick : function(evt) {
        var oDialogFragment = sap.ui.xmlfragment("sap.ui.demo.myFiori.view.MasterFragment",this);
        oDialogFragment.open();
    },

    testFunc:function(evt){
        alert("clicked") ;
    },

    testInputChange: function(evt){
        alert("yes changed") ;
    },

    whyThisWork: function(evt){
        alert("why why why") ;
    },

    testCheckBox: function(evt){
        alert("Checkbox Checked or Unchecked") ;
    },
    onGoToTestPage: function(evt){
        this.nav.to("Detail");
    }
});
