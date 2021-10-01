const fs = require('fs');
const path = require('path');


const boysDirPath = path.join(__dirname, 'boys');
const girlsDirPath = path.join(__dirname, 'girls');

function sortByGender(directory, file) {
    fs.readFile(`${__dirname}/${directory}/${file}`, ((err, data) => {
        if (err) {
            console.log(err);
            return
        } else if (JSON.parse(data).gender === 'female') {
            fs.rename(path.join(__dirname, directory, file),
                path.join(girlsDirPath, file),
                err => {
                    console.log(err)
                }
            )
        } else
            fs.rename(path.join(__dirname, directory, file),
                path.join(boysDirPath, file),
                err => {
                    console.log(err)
                }
            )
    }))
}

sortByGender('boys', 'Polina.json');
sortByGender('boys', 'Alina.json');
sortByGender('boys', 'Karina.json');
sortByGender('boys', 'Oleg.json');
sortByGender('boys', 'Viktor.json');
sortByGender('girls', 'Max.json');
sortByGender('girls', 'Ruslan.json');
sortByGender('girls', 'Sofia.json');
sortByGender('girls', 'Taras.json');
sortByGender('girls', 'Vika.json');
