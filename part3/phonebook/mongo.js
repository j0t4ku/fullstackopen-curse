const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Provide the password as an argument for the connection')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://j0t4ku:${password}@cluster0.emxgppp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(() => {
        console.log(`addedd ${name} number: ${number} to phonebook`)
        mongoose.connection.close()
    })
}