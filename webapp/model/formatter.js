sap.ui.define([], function() {
	"use strict";
	return {
		statusText: function(sStatus) {
			switch (sStatus) {
				case "INAPPROVAL":
					return "Warning";
				case "APPROVED":
					return "Success";
				case "REJECTED":
					return "Error";
				default:
					return sStatus;
			}
		},
		statusIcon: function(sStatus) {
			switch (sStatus) {
				case "INAPPROVAL":
					return "sap-icon://pending";

				case "APPROVED":
					return "sap-icon://accept";
				case "REJECTED":
					return "sap-icon://decline";
				default:
					return "sap-icon://pending";
			}
		},
		changeDate: function(sStatus) {
			var year = sStatus.substr(0, 4);
			var month = sStatus.substr(4, 2);
			// month = ((+month) + 1).toString();
			if (month < 10) {
				month = "0" + month;
			}
			var day = sStatus.substr(6, 2);
			if (day < 10) {
				day = "0" + day;
			}

			var date = year + "/" + month + "/" + day;
			var nStatus = new Date(date);
			return nStatus.toDateString();
		}

	};
});