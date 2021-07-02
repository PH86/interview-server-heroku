import express from 'express';
const cors = require('cors');
import { applicants } from './database/applicants';
import { vacancies } from './database/vacancies';
import { users } from './database/users';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/",(req, res) =>{
    res.send("<h1>Server Online</h1>");
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));

app.get('/candidates', (req, res) => {
    res.send(applicants)
});

app.get('/candidates/:id', (req, res) => {
    let id = req.params.id
    const selectedCandidate = applicants.find(candidate => candidate.id === id)
    res.send(selectedCandidate);
});

app.get('/vacancies', (req, res) => {
    res.send(vacancies)
});

app.get('/vacancies/:id', (req, res) => {
    let id = req.params.id
    const singleVacancy = vacancies.find(vacancy => vacancy.id === id)
    res.send(singleVacancy);
});

app.get('/vacancies/:id/candidates', (req, res) => {
    res.send(req.params);
});

app.post('/vacancies', (req, res) => {
    const newVacancy = req.body
    console.log(newVacancy);
    res.status(201).send('Test successful')
});

app.put('/vacancies/:id', (req, res) => {
    const updatedVacancy = req.body
    console.log(updatedVacancy);
    res.status(201).send('Test successful')
});

app.delete('/vacancies/:id', (req, res) => {

});

app.get('/users', (req, res) => {
    res.send(users)
});

app.get('/users/:userName', (req, res) => {
    res.send(users)
});