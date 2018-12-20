const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());
 
const realData = [];

app.get('/api/analyze', (req, res) => {
    //Getting data from Database but in this case, only focusing on endpoint
  res.send(realData)
});


app.post('/api/analyze', (req, res) => {
    const { error } = validateDataItem(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);


    const dataItem = {
        //id: realData.length + 1,
        content: req.body.content
    };
    realData.push(dataItem);
    
  res.send( dataItem);
});


// app.put('/api/analyze', (req, res) => {
//     const dataItem = realData.find(dataItem => dataItem.id === parseInt(req.params.id));
//     if (!dataItem) return res.status(404).send('The Item does not Exist!');
    
//     //const result = validateCourse(req.body);
//     const { error } = validateDataItem(req.body); //result.error
//     if (error) return res.status(400).send(error.details[0].message);

//     dataItem.name = req.body.name;
//     res.send(dataItem);
// });

function validateDataItem(dataItem) {
    const schema = {
        content: Joi.string().min(3).required()
    };

    return Joi.validate(dataItem, schema);
    //console.log(result);
}
 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log( `Listening to port ${port}...` ));