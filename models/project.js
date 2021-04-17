const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)

//for the database
const paperSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})
paperSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { 
            lower:true, strict:true 
        })
    }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

//Paper is the table
module.exports= mongoose.model('Project', paperSchema)