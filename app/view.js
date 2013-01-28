function View() {
	var reports = [
		Report.Global(),
		Report.CategoriasDenegadas(),
		Report.CategoriaUsuario(),
		Report.CategoriaUsuarioPagina(),
		Report.CodigosEstado(),
		Report.Busquedas(),
		Report.Paginas(),
		Report.PaginasUsuario(),
		Report.TraficoUsuario(),
		Report.Descargas(),
		Report.Protocolos(),
		Report.Browsers(),
		Report.Clientes(),
		Report.NoCategorizados(),
	];
	this.reports = reports;
	this.selectedFreq = 'Estadísticas Globales';
	var reportNames = $.map(reports, function(elem, i) {
		return elem.name;
	});
	this.reportNames = reportNames;
	this.selectedReport = reports[reportNames.indexOf('Globales')];
	this.controller = new Controller();
}

View.prototype = {
	
	selectReport: function(reportName, freq) {
		var report = this.reports[this.reportNames.indexOf(reportName)];
		this.changeFreq(freq);
		this.changeReport(report);
		if (freq == 'Globales') {
			$('#date-input').hide();
			this.restartTable();
			this.loadValues(undefined);
		} else {
			$('#date-input').show();
			$('#date-text').val(this.getYesterdayDate());
			this.restartTable();
			this.loadValues(this.getYesterdayDate());
		}
	},

	changeFreq: function(freq) {
		this.selectedFreq = freq;
		$('#frecuencia').text('Estadísticas ' + freq);
	},

	changeReport: function(report) {
		this.selectedReport = report;
		$('#reporte').text(report.name);
	},
	
	loadReportsList: function() {
		return $.map(this.reportNames, function(reportName, i) {
			return ('<li><a href="#" onClick="view.selectReport(\'' + reportName + '\', this.parentElement.parentElement.parentElement.children[0].innerText);">' + reportName + '</a></li>');
		});
	},
	
	loadValues: function(date) {
		$('.alert').hide();
		var path = this.controller.get_values(date, this.selectedReport, this.selectedFreq);
		$('#data-table').dataTable({
			"bDestroy": true,
			"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
			"sPaginationType": "bootstrap",
			"sAjaxSource": path,
			"aoColumns": this.selectedReport.colsInfo,
			"oLanguage": {
				"sLengthMenu": "_MENU_ records per page"
			},
			"aaSorting": this.selectedReport.sortInfo,
			"fnServerData": function ( sSource, aoData, fnCallback ) {
				$.ajax( {
					"dataType": 'json',
					"type": "GET",
					"url": sSource,
					"success": fnCallback,
					"error": view.handleAjaxError,
					"statusCode": {
						404: view.handleAjaxError
					}
				} );
			}
		}).columnFilter({aoColumns:this.selectedReport.filterInfo});
	},
	
	handleAjaxError: function ( xhr, textStatus, error ) {
		$('#alert').fadeIn();
	},
	
	restartTable: function() {
		var html = '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="data-table"><tfoot><tr>';
		$.each(this.selectedReport.colsInfo, function(index, col) {
			html += ('<th>' + col.sTitle + '</th>');
		});
		html += '</tr></tfoot></table>';
		$('#table-row').html(html);
	},
	
	getCurrentDate: function() {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth()+1;
		var y = date.getFullYear();
		return '' + y +'/'+ (m<=9?'0'+m:m) +'/'+ (d<=9?'0'+d:d);
	},
	
	getYesterdayDate: function() {
		var date = new Date();
		date.setDate(date.getDate() - 1);
		var d = date.getDate();
		var m = date.getMonth()+1;
		var y = date.getFullYear();
		return '' + y +'/'+ (m<=9?'0'+m:m) +'/'+ (d<=9?'0'+d:d);
	}
}