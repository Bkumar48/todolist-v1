const express = require('express');
const app = express();
const date = require(__dirname + "/date.js");
const items = ["1 hour Flutter development"];
const workItems = [];
app.set('view engine', 'ejs');

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
bodyParser.json();

app.use(express.static("public"));

app.post('/', (req, res) => {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else {
        const item = req.body.newItem;
        items.push(item);
        res.redirect('/');
    }
});

app.post('/work', (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

app.get('/work', (req, res) => {
    res.render("lists", { listTitle: "Work List", newListItems: workItems });
});

app.get('/', (req, res) => {
    const today = date();

    res.render("lists", { listTitle: today, newListItems: items });
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 4000!');
}
);
