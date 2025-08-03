const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', '..', 'public', 'images');
const outputFile = path.join(__dirname, '..', '..', 'public', 'images.json');

const files = fs.readdirSync(imagesDir);
const result = [];

// File Name Format: monthday_time2400_location_isDead_speckled

const directions = {
  "SW": "Southwest",
  "AP": "Apiary",
  "CM": "Compost",
  "FD": "Field"
}

const isDead = {
  "D" : "Dead",
  "A" : "Alive"
}

const speckled = {
  "NO": "None",
  "SO": "Some",
  "FE": "Few",
  "MA": "Many"
}

files.forEach((file) => {
  if (path.extname(file).toLowerCase() === '.png') {
    const name = path.basename(file, '.png');
    const parts = name.split('_');
    if (parts.length >= 2) {
        let date = parts[0].split("");
        date.splice(4,0," ");
        date[0] = date[0].toUpperCase();
        date.push(", 2025")

        let time = parts[1].split("");
        time.splice(2,0,":");

        result.push({
            filename: file,
            time: time.join(""),
            date: date.join(""),
            comments: "",
            location: directions[parts[2]],
            alive: isDead[parts[3]],
            speckled: speckled[parts[4]],
            tags: []
        });
    }
  }
});

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
