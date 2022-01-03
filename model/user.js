const mongodb = require('mongodb');
const mongoConnect = require('../utils/dbcon');


class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        const db = mongoConnect.getDb();

        let user = await User.fetchByEmail(this.email);

        if (!user) {
            return db.collection('users').insertOne(this);
        } else {
            throw 'User already exists';
        }
    }

    static fetchByEmail(email) {
        const db = mongoConnect.getDb();

        return db.collection('users').findOne({ email: email });
    }
}

module.exports = User;