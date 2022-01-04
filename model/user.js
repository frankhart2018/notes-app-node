const mongodb = require('mongodb');
const mongoConnect = require('../utils/dbcon');


class User {
    constructor(name, email, password, notes=[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.notes = notes;
    }

    async save() {
        const db = mongoConnect.getDb();

        let user = await User.fetchByEmail(this.email);

        if (!user) {
            return db.collection('users').insertOne(this);
        }
            
        throw 'User already exists!';
    }

    addNote(note) {
        const db = mongoConnect.getDb();

        this.notes.push(note);

        return db.collection('users').updateOne({ 
            email: this.email 
        }, { 
            $push: { notes: note } 
        });
    }

    getAllNotes() {
        const db = mongoConnect.getDb();

        return db.collection('users').findOne({ email: this.email });
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