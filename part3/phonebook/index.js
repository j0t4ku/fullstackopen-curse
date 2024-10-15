const express = require('express')
const app = express()
var morgan = require('morgan')

const Person = require('./models/person')

let { phonebook } = require('./const.js')
const { default: mongoose } = require('mongoose')

app.use(express.static('dist'))

app.use(express.json())

app.use(morgan(function (tokens, req, res) {

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))


app.get("/", (req, res) => {
    res.send('<h1>Hello world!!!</h1>')
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

app.get("/api/persons/:id", (req, res) => {
    const id = String(req.params.id)
    const person = Person.findById(id).then((person) => {
        res.json(person)
    })

})

app.post("/api/persons", (req, res) => {
    const person = req.body
    const maxId = Math.floor(Math.random() * 1000)
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }
    if (phonebook.some(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'Name already exist'
        })
    }

    person.id = maxId
    phonebook = phonebook.concat(person)
    console.log(person)
    res.json(person)
})



app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(typeof (phonebook))
    phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})

app.get("/info", (req, res) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const total = phonebook.length
    const html = `<p>Phonebook has info for ${total} people</p>
                    <p> ${currentDate} (${timeZone})</p>
    `
    res.send(html)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`)
})
