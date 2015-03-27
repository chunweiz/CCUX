/*globals jQuery, nrg*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.controller.helper.AppHeader');
    
    nrg.controller.helper.AppHeader = function (idAppHdr, controller) {
        this._oController = controller;
        this._oAppHdr = this._oController.getView().byId(idAppHdr);
    };
    
    nrg.controller.helper.AppHeader.prototype.initialize = function () {
        this._oNavElem = this._oAppHdr.getDomRef();
        this._aListItem = [].slice.call(this._oNavElem.querySelectorAll('ul > li'));
        this._aMenuItem = [].slice.call(this._oNavElem.querySelectorAll('ul > li > span'));
        this._nCurrent = -1;
        
        this._aListItem.forEach(function (oElem) {
            oElem.addEventListener('click', function (oEvent) {
                oEvent.stopPropagation();
            });
        });

        this._aMenuItem.forEach(this._addMenuItemListener, this);
    };
    
    nrg.controller.helper.AppHeader.prototype._addMenuItemListener = function (oElem) {
        var self = this;
        oElem.addEventListener('click', function (oEvent) {
            if (oElem.parentElement.dataset.nrgType === 'menuitem') {
                self._openSubMenu(oEvent);
                
            } else if (oElem.parentElement.dataset.nrgType === 'link') {
                self._openLink(oEvent);
                
            } else if (oElem.parentElement.dataset.nrgType === 'action') {
                self._execAction(oEvent);
            }
        });
    };
    
    nrg.controller.helper.AppHeader.prototype._openLink = function (oEvent) {
        window.open(oEvent.target.parentElement.dataset.nrgHref);
    };
    
    nrg.controller.helper.AppHeader.prototype._execAction = function (oEvent) {
        
    };
    
    nrg.controller.helper.AppHeader.prototype._openSubMenu = function (oEvent) {
        var nIdx;

        if (this._nCurrent !== -1) {
            this._aListItem[this._nCurrent].classList.remove('nrgAppHdrMenuOpen');
        }

        for (nIdx = 0; nIdx < this._aListItem.length; nIdx = nIdx + 1) {
            if (this._aListItem[nIdx] === oEvent.target.parentElement) {
                break;
            }
        }

        if (this._nCurrent === nIdx) {
            oEvent.target.parentElement.classList.remove('nrgAppHdrMenuOpen');
            this._nCurrent = -1;
        
        } else {
            oEvent.target.parentElement.classList.add('nrgAppHdrMenuOpen');
            this._nCurrent = nIdx;
        }
    };
    
    nrg.controller.helper.AppHeader.prototype._closeSubMenu = function (oEvent) {
        this._aListItem[this._nCurrent].classList.remove('nrgAppHdrMenuOpen');
        this._nCurrent = -1;
    };
    
}());