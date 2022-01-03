const mongodb = require('mongodb');
const mongoConnect = require('../utils/dbcon');


class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save() {
        const db = mongoConnect.getDb();
        return db.collection('users').insertOne(this);
    }
}

module.exports = User;