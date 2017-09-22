var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db;
var url= "mongodb://hector:mongo@ds139884.mlab.com:39884/mordorplanet";
var industrias;
var recursos;
var formulas;
var num=1;

function operacion(){
	getFromMongo((state)=>{
		industrias = state[0].recursos;
		getFromMongo((state2)=>{
			recursos = state2[0].recursos;
			getFromMongo((state3)=>{	
				formulas = state3;

				//cantidad de personas trabajando en alimentos
				var industriasAlimentos=industrias[0].cantidad_recurso;
				//cantidad de personas trabajando en industria
				var industriasIndustria=industrias[1].cantidad_recurso;
				//cantidad de personas trabajando en investigacion
				var industriasInvestigacion=industrias[2].cantidad_recurso;
				//cantidad de personas trabajando en construccion
				var industriasConstruccion=industrias[3].cantidad_recurso;


				//cantidad de personas
				var recursosPersonas=recursos[0].cantidad_recurso;
				//cantidad de Salud
				var recursosSalud=recursos[1].cantidad_recurso;
				//cantidad de contaminacion
				var recursosContaminacion=recursos[2].cantidad_recurso;
				//cantidad de bienes
				var recursosBienes=recursos[3].cantidad_recurso;
				//cantidad de comida
				var recursosComida=recursos[4].cantidad_recurso;
				//cantidad de viviendas
				var recursosVivienda=recursos[5].cantidad_recurso;

				//Cantidad de alimento que consume cada persona por unidad de tiempo
				var cantidadConsumo=formulas[4].comida;
				//Cantidad de personas que pueden habitar una vivienda.
				var cantidadPoblacion=formulas[4].vivienda;
				//Salud minima antes de que la mortalidad empiece a afectar.
				var cantidadSalud=formulas[4].salud;
				//Natalidad basada en relacion a la poblacion
				var relacionReproduccion=formulas[4].reproduccion.relacion;
				//Unidad de tiempo para efectuar las modificaciones a la poblacion.
				var tiempoReproduccion=formulas[4].reproduccion.tiempo;
				//cantidad de personas necesarias trabajando para producir una unidad de Alimento
				var cantidadAlimento=formulas[2].cantidad;
				//Unidad de tiempo necesario para producir una unidad de Alimento.
				var tiempoAlimento=formulas[2].tiempo;
				//cantidad de personas necesarias trabajando para producir una unidad de Vivienda
				var cantidadVivienda=formulas[1].cantidad;
				//Unidad de tiempo necesario para producir una unidad de Vivienda.
				var tiempoVivienda=formulas[1].tiempo;
				//cantidad de personas necesarias trabajando para producir una unidad de Bienes/Contaminacion y
				//reducir en una unidad la salud.
				var cantidadIndustria=formulas[0].cantidad;
				//cantidad de personas necesarias trabajando para producir una unidad de Bienes/Contaminacion y
				//reducir en una unidad la salud.
				var tiempoIndustria=formulas[0].tiempo;
				//cantidad de personas necesarias trabajando para producir una unidad de salud y reducir en una
				//unidad la contaminacion
				var cantidadInvestigacion=formulas[3].cantidad;
				//cantidad de personas necesarias trabajando para producir una unidad de salud y reducir en una
				//unidad la contaminacion
				var tiempoInvestigacion=formulas[3].tiempo;

				recursosComida += ((industriasAlimentos/cantidadAlimento)/tiempoAlimento);
				recursosBienes += ((industriasIndustria/cantidadIndustria)/tiempoIndustria);
				recursosSalud += (((industriasInvestigacion/cantidadInvestigacion)/tiempoInvestigacion) - 
					((industriasIndustria/cantidadIndustria)/tiempoIndustria));
				recursosContaminacion += ((industriasIndustria/cantidadIndustria)/tiempoIndustria)-
				((industriasInvestigacion/cantidadInvestigacion)/tiempoInvestigacion);
				recursosVivienda += ((industriasConstruccion/cantidadVivienda)/tiempoVivienda);
				if(recursosContaminacion > 65){
					recursosSalud -= recursosSalud * ((65 - recursosContaminacion)/100);
				}

				if(recursosSalud < cantidadSalud)
				{
					recursosPersonas -= recursosPersonas * ((cantidadSalud - recursosSalud)/100);
				}
				var desnutricion = recursosComida - (recursosPersonas*cantidadConsumo)/tiempoReproduccion;
				if(desnutricion < 0){
					recursosComida = 0;
					recursosPersonas += recursosPersonas * (desnutricion/500);
					recursosSalud += recursosSalud * (desnutricion/800);
				}
				else
					recursosComida = desnutricion;


				recursosPersonas += ((recursosPersonas/relacionReproduccion)/tiempoReproduccion);

				var sobrepoblacion = (recursosPersonas*cantidadPoblacion)-recursosVivienda;

				if(sobrepoblacion > 0){
					recursosPersonas -= recursosPersonas * (sobrepoblacion/100);
					recursosContaminacion += (recursosContaminacion + 1) * (sobrepoblacion/100);
					recursosSalud -= (recursosSalud + 1) * (sobrepoblacion/100);
				}


				if(recursosComida<0)
					recursosComida = 0;

				if(recursosContaminacion<0)
					recursosContaminacion = 0;

				if(recursosVivienda<0)
					recursosVivienda = 0;

				if(recursosBienes<0)
					recursosBienes = 0;

				if(recursosSalud<0)
					recursosSalud = 0;

				if(recursosPersonas<0)
					recursosPersonas = 0;

				if(recursosComida>10000)
					recursosComida = 10000;

				if(recursosContaminacion>100)
					recursosContaminacion = 100;

				if(recursosVivienda>1000)
					recursosVivienda = 1000;

				if(recursosSalud>100)
					recursosSalud = 100;

				var trabajadores = industriasIndustria + industriasAlimentos + industriasInvestigacion + industriasConstruccion;

				if(trabajadores > recursosPersonas){
					var despidos = trabajadores - recursosPersonas;
					if(despidos > industriasConstruccion){
						despidos -= industriasConstruccion;
						industriasConstruccion=0;
					}				
					else{
						industriasConstruccion -= despidos;
						despidos = 0;
					}
					if(despidos > industriasAlimentos){
						despidos -= industriasAlimentos;
						industriasAlimentos = 0;
					}
					else{
						industriasAlimentos -= despidos;	
						despidos = 0;
					}
					if(despidos > industriasInvestigacion){
						despidos -= industriasInvestigacion;
						industriasInvestigacion=0;
					}
					else{
						industriasInvestigacion -= despidos;
						despidos = 0;
					}

					if(despidos > industriasIndustria){
						despidos -= industriasIndustria;
						industriasIndustria=0;
					}				
					else{
						industriasIndustria -= despidos;
						despidos = 0;
					}

				}

				var estado = db.collection("estado");

				estado.update({
					"nombre":"recursos",
				},
				{
					"$set":
					{
						"recursos.0.cantidad_recurso":recursosPersonas,
						"recursos.1.cantidad_recurso":recursosSalud,
						"recursos.2.cantidad_recurso":recursosContaminacion,
						"recursos.3.cantidad_recurso":recursosBienes,
						"recursos.4.cantidad_recurso":recursosComida,
						"recursos.5.cantidad_recurso":recursosVivienda
					}
				}, (callback=>{
					estado.update({
						"nombre":"industrias",
					},
					{
						"$set":
						{
							"recursos.0.cantidad_recurso":industriasAlimentos,
							"recursos.1.cantidad_recurso":industriasIndustria,
							"recursos.2.cantidad_recurso":industriasInvestigacion,
							"recursos.3.cantidad_recurso":industriasConstruccion
						}
					}
					);
				})
				);
				

				if(recursosPersonas > 0){
					continuar = false;
				}
				
			}, "formulas", "","");
}, "estado", "nombre", "recursos");
}, "estado", "nombre", "industrias");

setTimeout(operacion, 40000);
}


openMongo();


function openMongo(){
	mongodb.connect(url, (err, dbs) =>{
		if(err) 
		{
			throw err;
		}
		db = dbs;
		//resetMundo();
		operacion();
	});
}

function resetMundo(){
	var estado = db.collection("estado");

	estado.update({
		"nombre":"recursos",
	},
	{
		"$set":
		{
			"recursos.0.cantidad_recurso":100,
			"recursos.1.cantidad_recurso":60,
			"recursos.2.cantidad_recurso":0,
			"recursos.3.cantidad_recurso":0,
			"recursos.4.cantidad_recurso":400,
			"recursos.5.cantidad_recurso":20
		}
	}, (callback=>{
		estado.update({
			"nombre":"industrias",
		},
		{
			"$set":
			{
				"recursos.0.cantidad_recurso":35,
				"recursos.1.cantidad_recurso":15,
				"recursos.2.cantidad_recurso":25,
				"recursos.3.cantidad_recurso":25
			}
		}
		);
	})
	);

}

/** 
Función que busca en la base de datos
Callback -> Función que recibe un parámetro de getState cuando usa el metodo callback();
search -> Variable que define el valor que se quiere buscar.
parameter -> Variable que define el atributo a buscar.
collection -> Nombre de la collection a buscar en la db.
*/
function getFromMongo(callback, collection, parameter, search){
	var estado = db.collection(collection);
	var query = {};
	if(parameter === "")
		query= {};
	else
		query[parameter] = search;
	estado.find(query).toArray(function(err, estado){
		if(err) throw err;
		callback(estado);
	});
}

function getFromMongoLastRegister(callback, collection, parameter, search){
	var estado = db.collection(collection);
	var query = {};
	if(parameter === "")
		query= {};
	else
		query[parameter] = search;
	estado.find(query).sort({$natural:-1}).limit(5).toArray(function(err, estado){
		if(err) throw err;
		callback(estado);
	});
}


router.get('/estadoRecursos', function(req, res) {
	console.log(recursos);
	res.json(recursos);
});
router.get('/estadoAcciones', function(req, res){
	getFromMongoLastRegister(state=>{
		console.log(state);
		res.json(state);
	}, "log", "", "");
});

router.get('/estadoIndustrias', function(req, res) {
	res.json(industrias);
});

router.get('/necesidades', (req, res)=>{
	var formulas;
	var personas;
	getFromMongo((state)=>{
		formulas = state[0];
		getFromMongo((state2)=>{
			personas = state2[0].recursos[0].cantidad_recurso;
			console.log(formulas);
			var comida = formulas.comida * personas;
			var vivienda = formulas.vivienda * personas;
			var salud = formulas.salud;
			var natalidad = Math.floor(personas/formulas.reproduccion.relacion);
			var rta = "[{comida:" + comida +"}, {vivienda:"+vivienda+"}, {salud:"+salud+"}, {natalidad:"+natalidad+"}]";
			rta = eval("(" + rta + ")");
			res.json(rta);
		},"estado", "nombre", "recursos");
	},"formulas", "nombre", "persona");
});


router.post('/estado', (req, res)=>{
	var personas = req.body.personas;
	var salud = req.body.salud;
	var contaminacion = req.body.contaminacion;

});

router.post("/alias", (req,res)=>{
	var alias = req.body.alias;
	db.collection("log").insert({"alias":alias, "evento":"ingreso"});
})

router.post("/aumento", (req, res)=>{
	console.log(req);

	var alias = req.body.alias;
	var cantidad = req.body.cantidad;
	var industria = req.body.industria;

	industrias.map((t,i)=>{
		if(t.nombre_recuros === industria){
			var tmp = t.cantidad_recurso + cantidad;
			if (tmp < 0){
				tmp = cantidad;
				cantidad = 0;
			}
			else{
				cantidad = tmp;
			}
			var evento = "Se modificaron en " + tmp + " los trabajadores de " + industria + ", quedando " + cantidad + "trabajadores";
			db.collection("log").insert({"alias":alias, "evento":evento});
			var donde = "recursos." + i + "cantidad_recurso";
			db.collection("estado").update({"nombre":"industrias"}, {"$set":{donde:cantidad}});
		}
	});
})





module.exports = router;
