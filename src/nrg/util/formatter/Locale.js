/*globals jQuery, nrg*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.util.formatter.Locale');
    
    nrg.util.formatter.Locale = {
        /*
            Replace placeholders with texts .. first entry in the array will be the template with placeholders

            Example
            =======
            <ute:Tag type="span" text="{
                parts: [{path: 'i18n>bpPageTitle'},{path: 'data>/firstname'},{path: 'data>/lastname'}],
                formatter: 'nrg.util.formatter.Locale.getText'
            }" />
        */
        getText: function () {
            var aArgs = [].slice.call(arguments),
                sKey = aArgs.shift();
            
            return jQuery.sap.formatMessage(sKey, aArgs);
        }
    };
    
}());
