/*global sap, jQuery*/
/*jslint nomen: true */

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (CoreControl) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.ScrollContainer', {
            metadata: {
                library: 'tm.control.lib.ui',

                properties: {
                    width: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: 'auto'
                    },
                    height: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: 'auto'
                    },
                    horizontal: {
                        type: 'boolean',
                        defaultValue: true
                    },
                    vertical: {
                        type: 'boolean',
                        defaultValue: false
                    },
                    focusable: {
                        type : 'boolean',
                        defaultValue : false
                    }
                },

                defaultAggregation: 'content',
                aggregations: {
                    content: {
                        type: 'sap.ui.core.Control',
                        multiple: true,
                        singularName: 'content'
                    }
                }
            }
        });

        Control.prototype.init = function () {
            jQuery.sap.require('sap.ui.core.delegate.ScrollEnablement');
            this._oScroller = new sap.ui.core.delegate.ScrollEnablement(this, this.getId() + "-scroll", {
                horizontal: true,
                vertical: false,
                iscroll: true,
                scrollbarClass: 'uteScrollContainer'
            });
        };

        Control.prototype.onBeforeRendering = function () {
            this._oScroller.setHorizontal(this.getHorizontal());
            this._oScroller.setVertical(this.getVertical());
        };

        Control.prototype.exit = function () {
            if (this._oScroller) {
                this._oScroller.destroy();
                this._oScroller = null;
            }
        };

        Control.prototype.getScrollDelegate = function () {
            return this._oScroller;
        };

        Control.prototype.scrollTo = function (x, y, time) {
            if (this._oScroller) {

                var oDomRef = this.getDomRef();
                if (oDomRef) { // only if rendered
                    if (sap.ui.getCore().getConfiguration().getRTL()) {
                        x = jQuery.sap.denormalizeScrollBeginRTL(x, oDomRef);
                    }
                    this._oScroller.scrollTo(x, y, time);
                } else {
                    this._oScroller._scrollX = x;
                    this._oScroller._scrollY = y;
                }
            }
            return this;
        };

        Control.prototype.setHorizontal = function (horizontal) {
            this._oScroller.setHorizontal(horizontal);
            this.setProperty('horizontal', horizontal, true);
        };

        Control.prototype.setVertical = function (vertical) {
            this._oScroller.setVertical(vertical);
            this.setProperty('vertical', vertical, true);
        };

        return Control;
    },

    true
);
