/*globals jQuery, nrg*/
/*jslint nomen: true*/

(function () {
    'use strict';

    jQuery.sap.declare('nrg.controller.helper.AppHeaderQuickLink');

    nrg.controller.helper.AppHeaderQuickLink = function (viewId, header) {
        this._oHeader = header;
        this._oController = this._oHeader.getController();
        this._oAppHdrQuickLink = this._oController.getView().byId(viewId);
    };

    nrg.controller.helper.AppHeaderQuickLink.prototype.initialize = function () {
        this._oAppHdrQuickLinkElem = this._oAppHdrQuickLink.getDomRef();
        this._aQuickLinkElem = [].slice.call(this._oAppHdrQuickLinkElem.querySelectorAll('ul > li'));
        this._aQuickLinkElem.forEach(this._addQuickLinkListener, this);
    };

    nrg.controller.helper.AppHeaderQuickLink.prototype._addQuickLinkListener = function (elem) {
        elem.addEventListener('click', function (event) {
            var sQuickLinkId = event.target.id.replace(this._oController.getView().getId() + '--', '');

            /*
                TODO: routing required when the agent picks a quick link!!!
            */

            this._oHeader.closeSubMenu();
        }.bind(this));
    };

}());
