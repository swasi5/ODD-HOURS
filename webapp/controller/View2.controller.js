sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/TablePersoController",
	"sap/m/MessageBox",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageToast",
	"ZODD_HOURS_S2D/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, TablePersoController, MessageBox, Export, ExportTypeCSV, MessageToast, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("ZODD_HOURS_S2D.controller.View2", {
		/**
		 *@memberOf ODD_HOURS.controller.View1
		 */
		formatter: formatter,

		onInit: function() {
			// MessageToast.show("REPORT");
			this.readData();
		},

		readData: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("Model");
			//Converting odata model to JSON Model
			var mParams = {
				async: true,
				success: function(odata) {
					var data = odata.results;
					var jm = new sap.ui.model.json.JSONModel();
					jm.setData(data);
					that.getView().setModel(jm);
				}
			};
			var eset = "/ODD_DETAILSSet";
			oModel.read(eset, mParams);
		},
		onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {
			var oExport = new Export({
				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),
				// Pass in the model created above
				models: this.getOwnerComponent().getModel("Model"),
				// binding information for the rows aggregation
				rows: {
					path: "/ODD_DETAILSSet"
				},
				// column definitions with column name and binding info for the content
				columns: [{
					name: "Employee ID",
					template: {
						content: "{EMP_ID}"
					}
				}, {
					name: "Date",
					template: {
						content: "{DATE}"
					}
				}, {
					name: "Employee Name",
					template: {
						content: "{EMP_NAME}"
					}
				}, {
					name: "Email ID",
					template: {
						content: "{EMP_EMAIL_ID}"
					}
				}, {
					name: "Hours",
					template: {
						content: "{HOURS}"
					}
				}, {
					name: "WBS Code",
					template: {
						content: "{WBS_CODE}"
					}
				}, {
					name: "STATUS",
					template: {
						content: "{STATUS}"
					}
				}, {
					name: "Project",
					template: {
						content: "{PROJECT}"
					}
				}, {
					name: "Portfolio",
					template: {
						content: "{PORTFOLIO}"
					}
				}, {
					name: "Offering",
					template: {
						content: "{OFFERING}"
					}
				}]
			});
			// download exported file
			//	oExport.saveFile();
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},
		handleChange: function(oEvent) {

			var afilter = [],
				sQuery,
				oList = this.getView().byId("itable"),
				oBinding = oList.getBinding("items");
			var dataf = this.getView().byId("DRS2").getFrom();
			var datat = this.getView().byId("DRS2").getTo();
			if (dataf != null && datat != null) {
				var fy = oEvent.getParameter("from").getFullYear();
				var fm = oEvent.getParameter("from").getMonth() + 1;
				var fd = oEvent.getParameter("from").getDate();
				var ty = oEvent.getParameter("to").getFullYear();
				var tm = oEvent.getParameter("to").getMonth() + 1;
				var td = oEvent.getParameter("to").getDate();

				if (fm < 10) {
					var str = "";
					str = fm;
					str = "0" + str;
					fm = str;
				}
				if (fd < 10) {
					var tmp = "";
					tmp = fd;
					tmp = "0" + tmp;
					fd = tmp;
				}

				if (tm < 10) {
					str = "";
					str = tm;
					str = "0" + str;
					tm = str;
				}
				if (td < 10) {
					tmp = "";
					tmp = td;
					tmp = "0" + tmp;
					td = tmp;
				}
				fy = fy.toString();
				fm = fm.toString();
				fd = fd.toString();

				ty = ty.toString();
				tm = tm.toString();
				td = td.toString();

				var fdate = "",
					tdate = "";
				fdate = fy + fm + fd;
				tdate = ty + tm + td;
			} else {
				fdate = "";
				tdate = "";
			}

			var oModel = this.getOwnerComponent().getModel("Model");
			sQuery = oModel.sServiceUrl;
			if (sQuery) {
				afilter.push(new Filter("DATE", FilterOperator.BT, fdate, tdate, sQuery));
			}
			oBinding.filter(afilter);
		},
		/*
				var sFrom = oEvent.getParameter("from");
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyyMMdd"
				});
				var from = dateFormat.format(new Date(sFrom));

				var sTo = oEvent.getParameter("to");

			},
			/**
			 *@memberOf ODD_HOURS.controller.View2
			 */
		goBack: function() {
			//This code was generated by the layout editor.
			jQuery.sap.history.back();
		}
	});
});