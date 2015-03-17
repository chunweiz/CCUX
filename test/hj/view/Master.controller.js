sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
    
    onButtonClick : function(evt) {
        var oDialogFragment = sap.ui.xmlfragment("sap.ui.demo.myFiori.view.MasterFragment",this);  
        oDialogFragment.open();  
    }
});