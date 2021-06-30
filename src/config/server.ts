import express from 'express';
const cors = require('cors');
import { applicants } from './database/applicants';
import { vacancies } from './database/vacancies';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(cors());

app.get("/",(req, res) =>{
    res.send("<h1>Server Online</h1>");
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));

app.get('/candidates', (req, res) => {
    res.send(applicants)
});

app.get('/vacancies', (req, res) => {
    res.send(vacancies)
});
