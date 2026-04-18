const bcrypt = require('bcrypt');
bcrypt.hash('Domiciano16', 10).then(hash => console.log("NOVO HASH:", hash));