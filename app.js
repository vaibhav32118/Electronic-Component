const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const Component = require('./models/component')
const Project = require('./models/project')
const Datasheet = require('./models/datasheet');
const Video = require('./models/video');
const articlesRouter = require('./routes/articles');
const componentRouter = require('./routes/component');
const projectRouter = require('./routes/project');
const dataRouter = require('./routes/datasheet');
const videoRouter = require('./routes/video');
const methodOverride = require('method-override');
const path = require("path");
const app = express()
const conn_str = "mongodb://localhost/Eweb"

mongoose.connect(conn_str, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongo'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

// app.use(express.static('static'))
// app.use("/static", express.static('./static/'));
app.use(express.static(path.join(__dirname, 'static/')));

app.get('/', async(req, res) => {
    res.render('index')
})

app.get('/component', async(req, res) => {
    const component = await Component.find().sort({
        createdAt: 'desc'
    })
    res.render('component/index', { component: component})
})
app.use('/component', componentRouter)

// app.get('/articles', async(req, res) => {
//     const articles = await Article.find().sort({
//         createdAt: 'desc'
//     })
//     res.render('articles/index', { articles: articles})
// })
// app.use('/articles', articlesRouter)

app.get('/project', async(req, res) => {
    const project = await Project.find().sort({
        createdAt: 'desc'
    })
    res.render('project/index', { project: project})
})
app.use('/project', projectRouter)

app.get('/datasheet', async(req, res) => {
    const datasheet = await Datasheet.find().sort({
        createdAt: 'desc'
    })
    res.render('datasheet/index', { datasheet: datasheet})
})
app.use('/datasheet', dataRouter)

app.get('/video', async(req, res) => {
    const video = await Video.find().sort({
        createdAt: 'desc'
    })
    res.render('video/index', { video: video})
})
app.use('/video', videoRouter)


app.listen(8000)
