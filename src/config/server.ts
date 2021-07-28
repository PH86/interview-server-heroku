import express from "express";
const cors = require("cors");
import { IApplicantCard } from "./database/applicants";
import { applicants } from "./database/applicants";
import { vacancies } from "./database/vacancies";
import { users } from "./database/users";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Server Online</h1>");
});

app.listen(PORT, () => console.log(`hosting @${PORT}`));

app.get("/candidates", async (req, res) => {
  const allApplicants = await prisma.applicants.findMany();
  console.log(allApplicants);
  if (allApplicants) {
    res.send(allApplicants);
  }
});

app.get("/candidates/:id", (req, res) => {
  let id = req.params.id;
  const selectedCandidate = applicants.find((candidate) => candidate.id === id);
  res.send(selectedCandidate);
});

app.get("/vacancies", async (req, res) => {
  const allVacancies = await prisma.vacancy.findMany({
    where: { authorId: "ckrg9ir070000s3q5r1h2ddk7" },
  });
  res.send(allVacancies);
});

app.get("/vacancies/:id", (req, res) => {
  let id = req.params.id;
  let singleVacancy = vacancies.find((vacancy) => vacancy.id === id);
  res.send(singleVacancy);
});

app.get("/vacancies/:id/candidates", (req, res) => {
  let id = req.params.id;
  let singleVacancy = vacancies.find((vacancy) => vacancy.id === id);
  let returnedCandidates: (IApplicantCard | undefined)[] = [];
  singleVacancy?.applicants.forEach((applicant) => {
    let returnedCandidate = applicants.find(
      (candidate) => candidate.id === applicant
    );
    returnedCandidates.push(returnedCandidate);
  });
  res.send(returnedCandidates);
});

app.post("/vacancies", (req, res) => {
  let newVacancy = req.body;
  const idString = vacancies.length + 1;
  const newID = { id: idString.toString() };
  newVacancy = { ...newID, ...newVacancy };
  vacancies.push(newVacancy);
  res.status(201).send("Test successful");
});

app.put("/vacancies/:id", (req, res) => {
  let id = req.params.id;
  const updatedVacancy = req.body;
  let vacancyIndex = vacancies.findIndex((vacancy) => vacancy.id === id);
  vacancies[vacancyIndex] = updatedVacancy;
  res.status(201).send("Test successful");
});

app.delete("/vacancies/:id", (req, res) => {
  let id = req.params.id;
  let vacancyIndex = vacancies.findIndex((vacancy) => vacancy.id === id);
  vacancies.splice(vacancyIndex, 1);
  console.log(vacancies);
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:userName", (req, res) => {
  let userName = req.params.userName;
  const currentUser = users.find((user) => user.userName === userName);
  res.send(currentUser);
});
