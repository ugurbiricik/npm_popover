sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], (Controller, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.App", {
		onInit : function (evt) {
		},

		handlePopoverPress: function (oEvent) {
            if (!this._oPopover) {
                this._oPopover = sap.ui.xmlfragment(
                    "ui5.walkthrough.view.fragments.popover",
                    this
                );
                this.getView().addDependent(this._oPopover);
            }
            this._oPopover.openBy(oEvent.getSource());
        },

        handleEmailPress: function () {
            sap.m.MessageToast.show("Email button pressed");
        }
	});
});
