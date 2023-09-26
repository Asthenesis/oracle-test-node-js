const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./public-method"));
const oracledb = require("oracledb");

const dbConfig = {
  user: "irfan",
  password: "irfan",
  connectString: "localhost/orcl",
};

app.post("/input", (req, res) => {
  console.log(req.body.eventname);
  //   console.log(Number(req.body.waktumulai))
  let { eventname, waktumulai, waktuberakhir, partisipan } = req.body;
  //   let { waktumulai, waktuberakhir, partisipan } = Number(req.body);

  oracledb.getConnection(dbConfig, (err, conn) => {
    if (err) {
      console.log(err.message);
      return;
    }

    const query = `INSERT INTO TestForm (eventName, waktuMulai, waktuBerakhir, partisipan) VALUES (:eventname,:waktumulai,:waktuberakhir,:partisipan)`;
    const bindParam = { eventname, waktumulai, waktuberakhir, partisipan };

    conn.execute(query, bindParam, (err, result) => {
      if (err) {
        console.log(err.message);
        conn.close();
        return;
      }
      conn.commit();

      conn.close();
      res.status(200).send("Data Succesfully inserted to database");
    });
  });
});

app.post("/event", (req, res) => {
  let { eventname, tanggalmulai, partisipan } = req.body;

  const formattedDate = new Date(tanggalmulai);

  oracledb.getConnection(dbConfig, (err, conn) => {
    if (err) {
      console.log(err);
      console.log(err.message);
      return;
    }

    const sql = `INSERT INTO CalendarTest(tanggalMulai, partisipan) VALUES (:tanggalmulai, :partisipan)`;
    const bindParam = { tanggalmulai: formattedDate, partisipan };

    conn.execute(sql, bindParam, (err, result) => {
      if (err) {
        console.log(err.message);
        conn.close();
        return;
      }
      conn.commit();

      conn.close();
      res.send("Data successfully inserted to CalendarTest DB");
    });
  });
});



app.listen(5001, () => {
  console.log(`Server is listening on localhost:5001`);
});
