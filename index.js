const Joi = require('joi');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const characterList = (text) => {
    let characterArray = text.toLowerCase().split("").filter(e => /[a-z]/.test(e))
    characterArray.sort();

    const characters = [];
    let counter = 0;
    for (let i = 0; i < characterArray.length; i++) {
        let character = characterArray[i]

        counter++
        let nextCharacter = characterArray[i + 1]

        if (character.localeCompare(nextCharacter)) {
            characters.push({ [character]: counter })
            counter = 0;
        }
    }
    return characters;
}

app.post('/api/analyze', (req, res) => {
    const { error } = validateCharacterListItem(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);

    const { text } = req.body;

    const textWithoutSpaces = text.replace(/\ /g, "")
    const textLength = {
        withSpaces: text.length,
        withoutSpaces: textWithoutSpaces.length
    };

    let splitText = text.split(" ").filter(String);
    const countWord = splitText.length;

    const characterCount = characterList(text);

    const result = {
        textLength: textLength,
        countWord: countWord,
        characterCount: characterCount
    };
    
  res.send( result );
});


// Joi validation was not needed for this task but I have just added it for validation purpose of my own practice.
function validateCharacterListItem(text) {
    const schema = {
        text: Joi.string().min(3).max(500).required()
    };

    return Joi.validate(text, schema);
    //console.log(result);
}


const port = process.env.PORT || 3000; //export PORT=8585
app.listen(port, () => console.log( `Listening to Port ${port}...` ));