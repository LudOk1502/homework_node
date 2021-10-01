const fs = require('fs');
const path = require('path');


const boysDirPath = path.join(__dirname, 'boys');
const girlsDirPath = path.join(__dirname, 'girls');

function sortByGender(directory, new_directory, file) {
    fs.readFile(`${__dirname}/${directory}/${file}`, ((err, data) => {
        if (err) {
            console.log(err);
            return
        } else if (JSON.parse(data).gender === 'female') {
            fs.rename(path.join(__dirname, directory),
                path.join(__dirname, new_directory, file),
                err => {
                    console.log(err)
                }
            )
        }
    }))
}


sortByGender('boys', 'girls', 'Polina.json')
