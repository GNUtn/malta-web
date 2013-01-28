function Report(name, filename, colsInfo, sortInfo, filterInfo) {
	this.name = name;
	this.filename = filename;
	this.colsInfo = colsInfo;
	this.sortInfo = sortInfo;
	this.filterInfo = filterInfo;
}

Report.myRender = function (data, type, full) {
	if (type == 'display' && data && data.length > 50) {
		return data.substring(0, 50) + '<a href="#" rel="tooltip" data-placement="bottom" data-original-title="' + data + '">...</a>';
	}
	return data;
};

Report.Global = function() {
	report = new Report(
		'Globales',
		'global.json',
		[
			{ "mData": "trafico", "sTitle": "Tr�fico" },
			{ "mData": "peticiones", "sTitle": "Peticiones" },
		],
		[[ 0, "desc" ]],
		[ 
			null,
			null
		]
	);
	return report;
};

Report.CategoriasDenegadas = function() {
	report = new Report(
		'Categor�as denegadas',
		'categorias.json',
		[
			{ "mData": "categoria", "sTitle": "Categor�a" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "select" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.CategoriaUsuario = function() {
	report = new Report(
		'Categor�as por Usuario',
		'categoria_usuario.json',
		[
			{ "mData": "usuario", "sTitle": "Usuario" },
			{ "mData": "categoria", "sTitle": "Categor�a" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 2, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "select" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.CategoriaUsuarioPagina = function() {
	report = new Report(
		'Categor�as por Usuario y P�gina',
		'categoria_usuario_pagina.json',
		[
			{ "mData": "pagina", "sTitle": "P�gina", mRender: Report.myRender },
			{ "mData": "usuario", "sTitle": "Usuario" },
			{ "mData": "categoria", "sTitle": "Categor�a" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 3, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "text" },
			{ type: "select" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.CodigosEstado = function() {
	report = new Report(
		'C�digos de estado',
		'status.json',
		[
			{ "mData": "categoria", "sTitle": "Categor�a" },
			{ "mData": "status", "sTitle": "Estado" },
			{ "mData": "descripcion", "sTitle": "Descripci�n", "mRender": Report.myRender },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 3, "desc" ]],
		[ 
			{ type: "select" },
			{ type: "number" },
			{ type: "text" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Busquedas = function() {
	report = new Report(
		'B�squedas',
		'searchs.json',
		[
			{ "mData": "query", "sTitle": "B�squeda" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Paginas = function() {
	report = new Report(
		'P�ginas',
		'paginas.json',
		[
			{ "mData": "destino", "sTitle": "P�gina", "mRender": Report.myRender },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
			{ "mData": "trafico", "sTitle": "Tr�fico" },
		],
		[[ 2, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.PaginasUsuario = function() {
	report = new Report(
		'P�ginas por Usuario',
		'pagina_usuario.json',
		[
			{ "mData": "pagina", "sTitle": "P�gina", "mRender": Report.myRender },
			{ "mData": "usuario", "sTitle": "Usuario" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
			{ "mData": "trafico", "sTitle": "Tr�fico" },
		],
		[[ 3, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "text" },
			{ type: "number-range" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.TraficoUsuario = function() {
	report = new Report(
		'Tr�fico por Usuario',
		'usuarios_trafico.json',
		[
			{ "mData": "usuario", "sTitle": "Usuario" },
			{ "mData": "trafico", "sTitle": "Tr�fico" },
			{ "mData": "peticiones", "sTitle": "Peticiones" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Descargas = function() {
	report = new Report(
		'Descargas',
		'descargas.json',
		[
			{ "mData": "archivo", "sTitle": "Archivo", "mRender": Report.myRender },
			{ "mData": "transferencia", "sTitle": "Tr�fico" },
			{ "mData": "descargas", "sTitle": "Descargas" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Protocolos = function() {
	report = new Report(
		'Protocolos',
		'protocolos.json',
		[
			{ "mData": "puerto", "sTitle": "Puerto" },
			{ "mData": "protocolo", "sTitle": "Protocolo" },
			{ "mData": "trafico", "sTitle": "Tr�fico" },
		],
		[[ 2, "desc" ]],
		[ 
			{ type: "number" },
			{ type: "select" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Browsers = function() {
	report = new Report(
		'Navegadores',
		'browsers.json',
		[
			{ "mData": "categoria", "sTitle": "Navegador" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.Clientes = function() {
	report = new Report(
		'Clientes �nicos',
		'clients.json',
		[
			{ "mData": "categoria", "sTitle": "Cliente" },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
		],
		[[ 1, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" }
		]
	);
	return report;
};

Report.NoCategorizados = function() {
	report = new Report(
		'Sitios no categorizados',
		'no_categorized.json',
		[
			{ "mData": "categoria", "sTitle": "Sitio", "mRender": Report.myRender },
			{ "mData": "ocurrencias", "sTitle": "Ocurrencias" },
			{ "mData": "trafico", "sTitle": "Trafico" },
		],
		[[ 2, "desc" ]],
		[ 
			{ type: "text" },
			{ type: "number-range" },
			{ type: "number-range" }
		]
	);
	return report;
};