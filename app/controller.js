function Controller() {
	this.base_path = 'output/datatables/'
};

Controller.prototype.getValues = function(date, report, freq) {
	return $.ajax( {
				"dataType": 'json',
				"type": "GET",
				"url": this.getPath(date, report, freq),
				"statusCode": {
						404: view.handleAjaxError
				}
			});
};

Controller.prototype.getPath = function(date, report, freq) {
	var path = this.base_path;
	
	if (freq == 'Semanales') {
		path += 'weekly/';
		path += this.getSunday(date) + '/';
		path += report.filename;
		return path;
	} else if (freq == 'Mensuales') {
		path += 'monthly/';
	}
	if ('undefined' != typeof date) {
		path +=  (date + "/"); //diarias
	}
	
	path += report.filename;
	return path;
}

Controller.prototype.getSunday = function(d) {
	d = new Date(d);
	var day = d.getDay(),
	diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
	var fecha = new Date(d.setDate(diff));
	var dia = fecha.getDate();
	var m = fecha.getMonth()+1;
	var y = fecha.getFullYear();
	return '' + y +'/'+ (m<=9?'0'+m:m) +'/'+ (dia<=9?'0'+dia:dia);
};