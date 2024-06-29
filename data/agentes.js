const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUsers() {
    return [
        { id: 1, email: 'user1@example.com', password: await bcrypt.hash('password1', saltRounds) },
        { id: 2, email: 'user2@example.com', password: await bcrypt.hash('password2', saltRounds) },
        { id: 3, email: 'user3@example.com', password: await bcrypt.hash('password3', saltRounds) }
    ];
}

module.exports = createUsers;  // Nota que estamos exportando la función, no su ejecución
