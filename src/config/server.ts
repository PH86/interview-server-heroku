import express from "express";
const cors = require("cors");
import { IApplicantCard } from "./database/applicants";
import { applicants } from "./database/applicants";
import { vacancies } from "./database/vacancies";
import { users } from "./database/users";
import { PrismaClient, Vacancy } from "@prisma/client";

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

// Author Id will be passed by front end once ser auth is set up
app.get("/vacancies", async (req, res) => {
  const allVacancies = await prisma.vacancy.findMany({
    where: { authorId: "ckrnfz2x50000acq5ptwvo403" },
  });
  res.send(allVacancies);
});
// Get single vacancy
app.get("/vacancies/:id", async (req, res) => {
  let id = req.params.id;
  let singleVacancy = await prisma.vacancy.findUnique({
    where: { id: id },
  });
  res.send(singleVacancy);
});

// Get candidates for vacancy
app.get("/vacancies/:id/candidates", async (req, res) => {
  let id = req.params.id;
  let returnedCandidates = await prisma.applicants.findMany({
    where: { vacancyId: id },
  });
  res.send(returnedCandidates);
});
// Add new vacancy
// pass the user ID to this function & use body object to populate
app.post("/vacancies", async (req, res) => {
  let newVacancy: Vacancy = req.body;
  try {
    await prisma.vacancy.create({
      data: {
        title: `${newVacancy.title}`,
        company: `${newVacancy.company}`,
        location: `${newVacancy.location}`,
        salary: newVacancy.salary,
        endDate: `${newVacancy.endDate}`,
        jobDescription: `${newVacancy.jobDescription}`,
        companyDescription: `${newVacancy.companyDescription}`,
        salaryMin: newVacancy.salaryMin,
        salaryMax: newVacancy.salaryMax,
        requirementEssential: newVacancy.requirementEssential,
        requirementDesired: newVacancy.requirementDesired,
        responsibilities: newVacancy.responsibilities,
        author: {
          connect: { id: "ckrnfz2x50000acq5ptwvo403" },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/vacancies/:id", async (req, res) => {
  let id = req.params.id;
  const updatedVacancy: Vacancy = req.body;
  try {
    await prisma.vacancy.update({
      where: { id: `${id}` },
      data: {
        title: `${updatedVacancy.title}`,
        company: `${updatedVacancy.company}`,
        location: `${updatedVacancy.location}`,
        salary: updatedVacancy.salary,
        endDate: `${updatedVacancy.endDate}`,
        jobDescription: `${updatedVacancy.jobDescription}`,
        companyDescription: `${updatedVacancy.companyDescription}`,
        salaryMin: updatedVacancy.salaryMin,
        salaryMax: updatedVacancy.salaryMax,
        requirementEssential: updatedVacancy.requirementEssential,
        requirementDesired: updatedVacancy.requirementDesired,
        responsibilities: updatedVacancy.responsibilities,
        author: {
          connect: { id: "ckrnfz2x50000acq5ptwvo403" },
        },
      },
    });
    console.log(updatedVacancy);
  } catch (err) {
    console.log(err);
  }
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
