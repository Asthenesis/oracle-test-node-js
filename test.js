const express = require("express");
const app = express();
const bodyParser = require()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static("./public-method"));

const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.get("/api", (req, res) => {
  const fetchData = async () => {
    try {
      const conn = await oracledb.getConnection({
        user: "irfan",
        password: "irfan",
        connectString: "localhost/orcl",
      });
      const result = await conn.execute(`SELECT * FROM PLAYER`);
      return result.rows;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  fetchData()
    .then((dbRes) => {
      res.status(200).send(dbRes);
      console.log(dbRes.map((dbres) => dbres.SPORT));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// app.post("/input", (req, res) => {
//   var body = req.body;
//   const insertData = async () => {
//     let conn;
//     try {
//       conn = oracledb.getConnection({
//         user: "irfan",  
//         password: "irfan",
//         connectString: "localhost/orcl",
//       });
//       await conn.execute(
//         `INSERT INTO TestForm (eventName, waktuMulai, waktuBerakhir, partisipan) VALUES (:eventname, :waktumulai, :waktuberakhir, :partisipan)`,
//         [body.eventname, body.waktumulai, body.waktuberakhir, body.partisipan]
//       );
//       conn.commit();
//       return res.status(200).send("Berhasil");
//     } catch (err) {
//       console.log(err);
//       return err;
//     } finally {
//       if (conn) {
//         try {
//           await conn.close();
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     }
//     insertData();
//   };

//   // const { eventname, waktumulai, waktuberakhir, partisipan } = req.body
//   // if (eventname && waktumulai && waktuberakhir && partisipan) {
//   //   return res.status(200).send(`Jadwal Anda:  ${eventname}, ${waktumulai}, ${waktuberakhir}, ${partisipan}`);
//   // }

//   // res.status(401).send("Coba Lagi");
// });

app.listen(5001, () => {
  console.log(`Server is listening on localhost:5000`);
});

// const fun = async () => {
//   let conn;

//   try {
//     conn = await oracledb.getConnection({
//       user: "irfan",
//       password: "irfan",
//       connectString: "localhost/orcl",
//     });

//     const data = await conn.execute(`SELECT * FROM PLAYER`);

//     console.log(data.rows);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// fun();
