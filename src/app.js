const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();


/*app.get("/", (req, res) => {
	res.json({
		mensaje: "Hola Mundo"
	})
});*/

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Example app listening on port ' + app.get('puerto'));
});
