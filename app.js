const fs = require('fs');
const path = require('path');


const boysDirPath = path.join(__dirname, 'boys');
const girlsDirPath = path.join(__dirname, 'girls');

function sortByGender(directory) {
    fs.readdir(path.join(__dirname, directory), (err, files) => {

        if (err) {
            console.log(err);
            return
        }

        files.forEach(file => {
                fs.readFile(path.join(__dirname, directory, file), ((err, data) => {

                    if (err) {
                        console.log(err);
                        return
                    }

                    if (JSON.parse(data).gender === 'female') {
                        return fs.rename(path.join(__dirname, directory, file),
                            path.join(girlsDirPath, file),
                            err => {
                                if (err) {
                                    console.log(err);
                                    return
                                }
                            }
                        );
                    }

                    fs.rename(path.join(__dirname, directory, file),
                        path.join(boysDirPath, file),
                        err => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                }));
            }
        )
    });
}

sortByGender('boys');
sortByGender('girls');
