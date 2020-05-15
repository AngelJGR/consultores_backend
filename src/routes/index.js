const express = require("express");
const pool = require("../database");
const { consulta, sqlData, meses, getAnio } = require("../lib/utility");
const router = express.Router();


router.get("/", async (req, res) => {
	try{
		const rango_fechas = await pool.query("SELECT MIN(data_emissao) AS fecha_minima, MAX(data_emissao) AS fecha_maxima FROM cao_fatura;");
		const consultores = await pool.query(consulta);
		res.json({consultores, rango_fechas});
	} catch (error) {
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		});
	}
});


router.post("/", async (req, res) => {
	try {
		const { seleccionados, dateMin, dateMax } = req.body;
		const dateMinArray = dateMin.split("-");
		const dateMaxArray = dateMax.split("-");
		const resultado = await pool.query(sqlData, [dateMinArray[1], dateMaxArray[1], dateMinArray[0], dateMaxArray[0], seleccionados ]);
		res.json({resultado, meses});

	} catch (error) {
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		});	
	}
});

module.exports = router;