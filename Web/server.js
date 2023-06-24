var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const axios = require('axios')
require('dotenv').config()
const router = express.Router();

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


var port = process.env.PORT

let num_of_sentences_in_summary = 3
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var Api = require('./routes/api')
app.use('/api', Api)

var Users = require('./routes/User')
app.use('/users', Users)

const Article = require('./models/article');
const Source = require('./models/source');

var config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
}

//process.env.MONGO_DB_NAME
mongoose.connect("mongodb://localhost:27017/shortifai", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(() => console.log(`database connected successfully`))
  )
  .catch((error) => console.log(`${error} did not connect`));

async function fetchData() {
    if (process.env.REPEAT == "FALSE") {//This is added to control sever on-off status
        console.log('start')
        try {
            const response = await axios.post(process.env.FLASK_URL + "summarize")
            const articles = response.data.articles;
            for (const article of articles) {
                try {
                    // Check if the source ID already exists in the "sources" table
                    let redundantsource = await Source.findOne({ source_id: article.source_id });
                    if (!redundantsource) {
                        const sourceCount = await Source.countDocuments({});
                        console.log('sourceCount:' + sourceCount);
                        // If it doesn't exist, create a new source object and save it to the database
                        const source = new Source({
                            source_id: article.source_id,
                            unique_id: sourceCount.toString()
                        });
                        await source.save();
                    }
                    let redundant = await Article.findOne({ title: article.title });
                    if (!redundant) {
                        // Check if the title already exists in the "article" table
                        const documentCount = await Article.countDocuments({});
                        console.log('documentCount:' + documentCount);
                        const newArticle = new Article({
                            url: article.link,
                            source_id: article.source_id,
                            title: article.title,
                            text: article.summary,
                            top_image: article.image_url,
                            description: article.description,
                            video_url: article.video_url,
                            pub_date: article.pub_date,
                            category: article.category,
                            content: article.content,
                            unique_id: documentCount.toString()
                        });
                        await newArticle.save();
                    }
                } catch (err) {
                    console.log('Error while saving article:', err);
                }
            }
            console.log()
            console.log('Will be Called after every 3 hours!')
            console.log('Articles saved to the database');
        } catch (err) {
            console.log('Error while fetching articles:', err);
        }
    } else {
        console.log('Server is off');
    }
}

async function startFetching() {
    if (process.env.REPEAT == "TRUE") {//This is added to control sever on-off status
        console.log('start')
        await fetchData();
        setInterval(fetchData, 10800000);
    } else {
        console.log('Server is off');
    }
}

startFetching();

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
    console.log('Server is running on port: ' + process.env.PORT)
})