const express = require('express');
const chrono = require('chrono-node');
const moment = require('moment-timezone');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/process', (req, res) => {
  const timezone = req.body.timezone;
  const originalText = req.body.text;

  let parsedText = originalText;
  const parsedResults = chrono.parse(originalText);
  console.log("parsedResults", parsedResults);

  parsedResults.forEach(result => {
    const dateMoment = moment(result.start.date()).tz(timezone);
    const unixTime = dateMoment.unix();
    console.log("dateMoment", dateMoment, unixTime);
    parsedText = parsedText.replace(result.text, `<t:${unixTime}>`);
  });

  res.send({ result: parsedText });
});

app.listen(3000, () => console.log('Server is running on port 3000.'));
