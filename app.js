const fs = require('fs');
const path = require('path');

const users = [
    {name: 'olya', gender: 'female', age: 20},
    {name: 'taras', gender: 'male', age: 27},
    {name: 'karina', gender: 'female', age: 18},
    {name: 'ruslan', gender: 'male', age: 22},
    {name: 'tamara', gender: 'female', age: 23},
    {name: 'max', gender: 'male', age: 27},
    {name: 'yana', gender: 'female', age: 19},
    {name: 'arsen', gender: 'male', age: 18},
    {name: 'sofia', gender: 'female', age: 26},
    {name: 'ivan', gender: 'male', age: 19}
]

function mkDir(diectory) {
    fs.mkdir(path.join(__dirname, diectory), (err => {
        if (err)
            return console.log(err);
    }))
}

mkDir('manOlder20');
mkDir('manYounger20');
mkDir('womanOlder20');
mkDir('womanYounger20');
mkDir('users');

function creatFile() {
    users.map(item => fs.appendFile(path.join(__dirname, 'users', `${item.name}.txt`), `${JSON.stringify(item)}`, (err => {
                if (err) {
                    console.log(err);
                    return
                }
            }
        )
        )
    )
}

creatFile();

function sortUsers() {
    fs.readdir(path.join(__dirname, 'users'), (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        if (files.length > 0) {
            return files.map(file => {
                fs.readFile(path.join(__dirname, 'users', file), ((err, data) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (JSON.parse(data).gender === 'female' && JSON.parse(data).age >= 20) {
                        return fs.rename(path.join(__dirname, 'users', file),
                            path.join(__dirname, 'womanOlder20', file), (err => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            }));
                    }

                    if (JSON.parse(data).gender === 'female' && JSON.parse(data).age < 20) {
                        return fs.rename(path.join(__dirname, 'users', file),
                            path.join(__dirname, 'womanYounger20', file), (err => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            }));
                    }

                    if (JSON.parse(data).gender === 'male' && JSON.parse(data).age >= 20) {
                        return fs.rename(path.join(__dirname, 'users', file),
                            path.join(__dirname, 'manOlder20', file), (err => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            }));
                    }

                    fs.rename(path.join(__dirname, 'users', file),
                        path.join(__dirname, 'manYounger20', file), (err => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        }));


                }));
            });
        }
    });
}

sortUsers();