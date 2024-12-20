sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/thirdparty/jquery"
], function (Controller, Fragment, jQuery) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.App", {
		onInit: function () {
            this._attachHoverEvents();
        },

        _attachHoverEvents: function () {
            var that = this;

            // Panel ID'leri
            var aPanels = ["sofortansichtPanel", "schriftgrossePanel"];

            aPanels.forEach(function (sPanelId) {
                var oPanel = that.byId(sPanelId);

                if (oPanel) {
                    var $panelDomRef = oPanel.$();

                    $panelDomRef.on("mouseover", function () {
                        var sInfo = oPanel.getCustomData()[0].getValue();
                        that._showHoverPopover(oPanel, sInfo);
                    });

                    $panelDomRef.on("mouseout", function () {
                        that._hideHoverPopover();
                    });
                }
            });
        },

        _showHoverPopover: function (oSource, sText) {
            if (!this._oHoverPopover) {
                this._oHoverPopover = new Popover({
                    placement: sap.m.PlacementType.Left,
                    content: new Text({ text: sText })
                });
                this.getView().addDependent(this._oHoverPopover);
            } else {
                this._oHoverPopover.getContent()[0].setText(sText);
            }

            this._oHoverPopover.openBy(oSource);
        },

        _hideHoverPopover: function () {
            if (this._oHoverPopover) {
                this._oHoverPopover.close();
            }
        },

        handlePopoverPress: function (oEvent) {
            if (!this._oPopover) {
                Fragment.load({
                    name: "ui5.walkthrough.view.fragments.popover",
                    controller: this
                }).then(function (oPopover) {
                    this._oPopover = oPopover;
                    this.getView().addDependent(this._oPopover);
                    this._oPopover.openBy(oEvent.getSource());
                    this._attachHoverEvents(); // Popover yüklendikten sonra çağır
                }.bind(this));
            } else {
                this._oPopover.openBy(oEvent.getSource());
                this._attachHoverEvents();
            }
        },
    });
});
