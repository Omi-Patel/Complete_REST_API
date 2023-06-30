const express = require('express');
require('./db/conn');
const Student = require('./models/students');

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello From the Other Side..BY OM")
})

//Middle-ware
app.use(express.json());

//create a new users -> POST

// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })

//     // res.send("Hello From the Other Side..")
// })


// Using async await -> best way
app.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
})

//get user Data -> GET
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

//get individual data
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const oneStudent = await Student.findById(_id);

        if (!oneStudent) {
            return res.status(404).send();
        } else {
            res.send(oneStudent);
        }

    } catch (e) {
        res.status(500).send(e);
    }
})


//update student data using id -> PATCH

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudent);
    } catch (e) {
        res.status(400).send(e);
    }
})


//delete studentData by id -> DELETE

app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);

        if (!deleteStudent) {
            res.status(400).send();
        } else {
            res.send(deleteStudent);
        }
    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`Connection is setup at port ${port}...`)
});