/*globals sap*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'nrg/controller/helper/AppHeaderQuickLink'
    ],
    
    function (AppHdrQL) {
        'use strict';
        
        var AppHdr = function (viewId, controller) {
            this._oController = controller;
            this._oAppHdr = this._oController.getView().byId(viewId.hdr);
            this._oAppHdrQuickLink = new AppHdrQL(viewId.quickLink, this);

            return this;
        };

        AppHdr.prototype.initialize = function () {
            //Initialize menu
            this._oNavElem = this._oAppHdr.getDomRef();
            this._aListItem = [].slice.call(this._oNavElem.querySelectorAll('.nrgAppHdr-listItem'));
            this._aMenuItem = [].slice.call(this._oNavElem.querySelectorAll('.nrgAppHdr-listItemLink'));
            this._nCurrent = -1;

            this._aListItem.forEach(function (oElem) {
                oElem.addEventListener('click', function (oEvent) {
                    oEvent.stopPropagation();
                });
            });

            this._aMenuItem.forEach(this._addMenuItemListener, this);

            //Initialize submenus
            this._oAppHdrQuickLink.initialize();
            return this;
        };
        
        AppHdr.prototype._addMenuItemListener = function (oElem) {
            oElem.addEventListener('click', function (oEvent) {
                if (oElem.parentElement.dataset.nrgType === 'menuitem') {
                    this._openSubMenu(oEvent);

                } else if (oElem.parentElement.dataset.nrgType === 'link') {
                    this._openLink(oEvent);

                } else if (oElem.parentElement.dataset.nrgType === 'action') {
                    this._execAction(oEvent);
                }
            }.bind(this));
        };

        AppHdr.prototype._openLink = function (oEvent) {
            window.open(oEvent.target.parentElement.dataset.nrgHref);
        };

        AppHdr.prototype._execAction = function (oEvent) {

        };

        AppHdr.prototype._openSubMenu = function (oEvent) {
            var nIdx;

            if (this._nCurrent !== -1) {
                this._aListItem[this._nCurrent].classList.remove('nrgAppHdr-listItem-open');
            }

            for (nIdx = 0; nIdx < this._aListItem.length; nIdx = nIdx + 1) {
                if (this._aListItem[nIdx] === oEvent.target.parentElement) {
                    break;
                }
            }

            if (this._nCurrent === nIdx) {
                oEvent.target.parentElement.classList.remove('nrgAppHdr-listItem-open');
                this._nCurrent = -1;

            } else {
                oEvent.target.parentElement.classList.add('nrgAppHdr-listItem-open');
                this._nCurrent = nIdx;
            }
        };

        AppHdr.prototype.closeSubMenu = function () {
            this._aListItem[this._nCurrent].classList.remove('nrgAppHdr-listItem-open');
            this._nCurrent = -1;
        };

        AppHdr.prototype.getController = function () {
            return this._oController;
        };
        
        return AppHdr;
    },
    
    false
);
