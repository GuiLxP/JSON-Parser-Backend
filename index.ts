import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import csvtojson from 'csvtojson';
import { Parser } from 'json2csv';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
  const { data, type } = req.body;

  try {
    if (type === 'csv-to-json') {
      const jsonData = await csvtojson().fromString(data);
      res.json(jsonData);
    } else if (type === 'json-to-csv') {
      const parser = new Parser();
      const csvData = parser.parse(JSON.parse(data));
      res.send(csvData);
    } else {
      res.status(400).send('Invalid conversion type');
    }
  } catch (error) {
    res.status(500).send('Error processing data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
