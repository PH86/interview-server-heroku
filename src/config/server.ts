import express from 'express';
import { applicants } from './database/applicants';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.get("/",(req, res) =>{
    res.send("<h1>Server Online</h1>");
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));

app.get('/candidates', (req, res) => {
    res.send(applicants)
});
