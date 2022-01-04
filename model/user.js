const mongodb = require('mongodb');
const mongoConnect = require('../utils/dbcon');


class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.notes = [];
    }

    async save() {
        const db = mongoConnect.getDb();

        let user = await User.fetchByEmail(this.email);

        if (!user) {
            return db.collection('users').insertOne(this);
        }
            
        throw 'User already exists!';
    }

    async addNote(note) {
        const db = mongoConnect.getDb();

        this.notes.push(note);

        if (!user) {
            throw 'User does not exist!';
        }

        return db.collection('user').updateOne({ 
            email: this.email 
        }, { 
            $push: { notes: note } 
        });
    }

    static fetchByEmail(email) {
        const db = mongoConnect.getDb();

        return db.collection('users').findOne({ email: email });
    }

    static async checkLogin(email, password) {
        let user = await User.fetchByEmail(email);

        if (!user) {
            throw 'Account does not exist, please register!';
        } else if (user.password !== password) {
            throw 'Incorrect credentials!';
        } else {
            return user;
        }
    }
}

module.exports = User;