/*globals sap, sc */
/*jslint nomen: true */
// Provides control ute.ui.commons.DatePicker.
sap.ui.define(['jquery.sap.global', './library', 'ute/ui/commons/Textfield', 'sap/ui/model/type/Date', './Calendar'],
	function (jQuery, library, TextField, Date1, Calendar) {
	    'use strict';

        var DatePicker = TextField.extend('sc.control.lib.ui.DatePicker', /** @lends sap.ui.commons.Button.prototype */ { metadata : {
            library : 'sc.control.lib.ui',
            properties : {
                defaultDate : {type : "string", group : "Misc", defaultValue : null}
            },
            events : {

            }
        }});
	    (function () {

             /*
             * Initializes DatePicker Values
             * 1) Assuming Default Date format is MM/dd/yyyy for NRG.
             * 2) Setting Min date and Max date for the validation purpose.
             *
             */
            DatePicker.prototype.init = function () {

                this._oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "MM/dd/yyyy", strictParsing: true});
                this._oMinDate = new Date(1, 0, 1);
                this._oMinDate.setFullYear(1); // otherwise year 1 will be converted to year 1901
                this._oMaxDate = new Date(9999, 11, 31);

            };
            /*
             * _getLocale is used to load current locale for Foramtting and parsing Dates.
             *
             *
             *
             */
            function _getLocale(oThis) {
                var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
                return oLocale;

            }
            /*
             * _getFormatter is used to return Date formatter based on the locale.
             *
             *
             *
             */
            function _getFormatter(oThis) {

                var sPattern = "",
                    bRelative = false,
                    oBinding = oThis.getBinding("value"),
                    oLocale,
                    oLocaleData;

                if (oBinding && oBinding.oType && (oBinding.oType instanceof Date1)) {
                    sPattern = oBinding.oType.getOutputPattern();
                    bRelative = !!oBinding.oType.oOutputFormat.oFormatOptions.relative;
                }

                if (!sPattern) {
                    // no databinding is used -> use pattern from locale
                    oLocale = _getLocale(oThis);
                    oLocaleData = sap.ui.core.LocaleData.getInstance(oLocale);
                    sPattern = oLocaleData.getDatePattern("medium");
                }

                if (sPattern !== oThis._sUsedPattern) {
                    oThis._sUsedPattern = sPattern;

                    if (sPattern === "short" || sPattern === "medium" || sPattern === "long") {
                        oThis._oFormat = sap.ui.core.format.DateFormat.getInstance({style: sPattern, strictParsing: true, relative: bRelative}, oLocale);
                    } else {
                        oThis._oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sPattern, strictParsing: true, relative: bRelative}, oLocale);
                    }
                }

                return oThis._oFormat;

            }

            /*
             * _formatValue will format any Date value.
             *
             *
             *
             */
            DatePicker.prototype._formatValue = function (oDate) {

                var that = this,
                    oFormat = _getFormatter(that),
                    sValue = oFormat.format(oDate);
                return sValue;

            };

            /*
             * _selectDate event is called when user selected particular date in Calendar control that need to be displayed in the Date picker field.
             *
             *
             *
             */
            DatePicker.prototype._selectDate = function (oEvent) {
                this._oPopup.close();
                this.focus();
                // do not call this._checkChange(); because we already have the date object and no wrong entry is possible
                var sNewValue = this._formatValue(this._oCalendar._getFocusedDate()),
                    sYyyymmdd,
                    $Input,
                    sOutputValue = "";
                this.setProperty("value", sNewValue, true);
                this._bValueSet = false;
                sYyyymmdd = this._oFormatYyyymmdd.format(this._oCalendar._getFocusedDate());
               // this.setProperty("yyyymmdd", sYyyymmdd, true);
                // set inputs value after properties because of placeholder logic for IE
                $Input = jQuery(this.getDomRef());
                if ($Input.val() !== sNewValue) {
                    $Input.val(sYyyymmdd);
                    this._curpos = sYyyymmdd.length;
                    $Input.cursorPos(this._curpos);
                }
            };

            /*
             * _open is to show the calendar control when user is clicked on icon.
             *
             *
             *
             */
            function _open(oThis) {

                if (!oThis._oPopup) {
                    jQuery.sap.require("sap.ui.core.Popup");
                    oThis._oPopup = new sap.ui.core.Popup();
                    oThis._oPopup.setAutoClose(true);
                    oThis._oPopup.setDurations(0, 0); // no animations
                    //oThis._oPopup.attachClosed(_handleClosed, oThis);
                }
                if (!oThis._oCalendar) {
                    oThis._oCalendar = new Calendar(oThis.getId() + "-cal");
                    oThis._oCalendar.attachEvent("select", oThis._selectDate, oThis);
                    oThis._oPopup.setContent(oThis._oCalendar);
                    oThis._oCalendar.setParent(oThis, undefined, true); // don't invalidate DatePicker
                }
                var eDock = sap.ui.core.Popup.Dock;
                oThis._oPopup.open(0, eDock.BeginTop, eDock.BeginBottom, oThis, null, null, true);

            }
            /*
             * The event to show the calendar control.
             *
             *
             *
             */
            DatePicker.prototype.onsapshow = function (oEvent) {
                var that = this;
                _open(that);
                oEvent.preventDefault(); // otherwise IE opens the address bar history
		    };

            /*
             * Trigger the open event when the user clicked on Date Icon.
             *
             *
             *
             */
            DatePicker.prototype.onclick = function (oEvent) {
                if (jQuery(oEvent.target).hasClass("uteDatePicIcon")) {
                    var that = this;
                    _open(that);
                }
		    };

            /*
             * setDefaultDate is used to select default date to be populated in Date picker field and also Calendar control.
             *
             *
             *
             */
            DatePicker.prototype.setDefaultDate = function (defaultDate) {

                var sOldDefaultDate = this.getDefaultDate(),
                    sValue = "",
                    sOutputValue = "",
                    $Input;
                if (defaultDate === sOldDefaultDate) {
                    return this;
                }
                if (defaultDate) {
                    this._oDate = this._oFormatYyyymmdd.parse(defaultDate);
                    if (!this._oDate || this._oDate.getTime() < this._oMinDate.getTime() || this._oDate.getTime() > this._oMaxDate.getTime()) {
                        this._oDate = undefined;
                        jQuery.sap.log.warning("Value can not be converted to a valid date", this);
                    }
                } else {
                    this._oDate = undefined;
                }

                if (this._oDate) {
                    sValue = this._oFormatYyyymmdd.format(this._oDate);
                }
                this.setProperty("value", sValue, true);
                if (this.getDomRef()) {
                    // update value in input field
                    sOutputValue = "";
                    $Input = jQuery(this.getInputDomRef());
                    // format date again - maybe value uses not the right pattern ???
                    sOutputValue = sValue;
                    $Input.val(sOutputValue);
                }

                return this;

            };
        }());
        return DatePicker;

    }, /* bExport= */ true);
