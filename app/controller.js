function Controller() {
	this.base_path = 'output/datatables/'
};

Controller.prototype.get_values = function(date, report, freq) {
	var path = this.base_path;
	
	if (freq == 'Semanales') {
		path += 'weekly/';
	} else if (freq == 'Mensuales') {
		path += 'monthly/';
	}
	if ('undefined' != typeof date) {
		path +=  (date + "/"); //diarias
	}
	
	path += report.filename;
	
	return path;
	//return $.getJSON(path)
};