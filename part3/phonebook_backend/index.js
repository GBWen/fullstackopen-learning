require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const morgan = require('morgan')
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

let persons = [
    [
        {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    response.send(
        `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    const person = persons[0].filter(p => p.id.toString() === request.params.id)
    if (person.length > 0) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = persons[0].filter(p => p.id.toString() === request.params.id)
    if (person.length > 0) {
        person[0].name = request.body.name
        person[0].number = request.body.number
        response.status(200).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const personName = body.name
    const personNumber = body.number

    if (personName.length <= 0) {
        response.status(403).send({ error: 'personName length = 0' })
    }

    persons[0].push({
        id: Math.floor(Math.random() * 10000 + 1),
        name: personName,
        number: personNumber
    })

    response.status(200).end()
})

app.delete('/api/persons/:id', (request, response, next) => {
    const person = persons[0].filter(p => p.id.toString() === request.params.id)
    if (person.length > 0) {
        persons[0] = persons[0].filter(p => p.id.toString() !== request.params.id)
        response.status(200).end()
    } else {
        response.status(404).end()
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});