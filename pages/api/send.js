const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
    .write()

export default (req, res) => {
    db.get('users')
        .push({ id: 2, title: 'lowdb is awesome'})
        .write()
    res.statusCode = 200
    res.json(    db.get('users')
        .push({ id: 3, title: new Date()})
        .write())
}