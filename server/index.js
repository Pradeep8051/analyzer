const express = require('express');
const connectDB = require("./db/mongodb");
const cors = require('cors');
const analayzeSchema = require("./model/analayzeSchema")
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();
// const Analyzer = natural.SentimentAnalyzer;
// const stemmer = natural.PorterStemmer;

const analyzeSchema = require("./model/analayzeSchema")

const Port = 4000;
const app = express();
app.use(express.json());
app.use(cors());
connectDB();


app.post('/analyze-sentiment', async (req, res) => {

  if (!req.body || !req.body.text) {
    return res.status(400).json({ error: 'Missing or invalid request body' });
  }
  const { text } = await req.body;
  const result = await sentiment.analyze(text);

  // const analyzeResult = new analayzeSchema({
  //   score: result.score,
  //   positive:result.positive,
  //   negative: result.negative
  // });
  // await analyzeResult.save();
  // console.log("result here :---", analyzeResult);
  res.json(result);
});

app.get("/get", async (req, res) => {

  try {
    const data = await analyzeSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
})

//   app.post('/analyze-sentiment', (req, res) => {

//     const analyzer = new Analyzer("English", stemmer, "afinn");
//     const { text } =  req.body;
//     const words = tokenizer.tokenize(text);
//     const sentiment = analyzer.getSentiment(words);

//     const response = {
//       sentiment: sentiment
//   };
//     res.status(200).json(response);
// });


// app.use('/api', gameRoutes);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
