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

app.post("/api/persons", (req, res, next) => {
    const data = req.body
    if (!data.name || !data.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const person = new Person({
        name: data.name,
        number: data.number
    })
    person.save()
        .then(personSaved => {
            res.json(personSaved)
        })
        .catch((error) => next(error));
})

app.put("/api/persons/:id", (req, res, next) => {
    const { name, number } = req.body
    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((error) => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.content,
        number: body.important,
    }
    Person.findByIdAndDelete(request.params.id, person, { new: true })
        .then(updatedNote => {
            console.log(updatedNote)
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.get("/info", (req, res) => {
    Person.find({})
        .then((pepol) => {
            res.send((
                `<p>Phonebook has info for ${people.length
                } people</p><p>${new Date()}</p>`
            ))
        })
        .catch((error) => next(error))
})



// Middleware Errors

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`)
})
