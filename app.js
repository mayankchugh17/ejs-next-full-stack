const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
app.set("layout", "layouts/boilerplate"); 
const dotenv = require('dotenv');
dotenv.config();

// Routes
const adminRouter = require('./routes/adminRoutes');

const port = process.env.PORT;
console.log(port);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine('ejs', ejsMate);
app.use(bodyParser.json());

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use("/admin", adminRouter);


// DB connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/dashboard', (req, res) => {
    res.render('pages/index.ejs');
});

