import express from "express";
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
import { Request, Response } from "express";
import { IApplicantCard } from "./database/applicants";
import { applicants } from "./database/applicants";
import { vacancies } from "./database/vacancies";
import { users } from "./database/users";
import { PrismaClient, User, Vacancy } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

interface IGetUserAuthInfoRequest extends Request {
  user: object;
}

const authenticate = async (
  req: IGetUserAuthInfoRequest,
  res: any,
  next: any
) => {
  const token = req.cookies["accessToken"];
  const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  if (decoded) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: decoded },
      });
      if (user) {
        console.log("we are alive");
        req.user = user;
        next();
      } else {
        res.status(403).send("Token invalid");
      }
      console.log(decoded);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).send("Token not found");
  }
};

// Test Server
app.get("/", (req, res) => {
  res.send("<h1>Server Online</h1>");
});

app.listen(PORT, () => console.log(`hosting @${PORT}`));

// Test Get all users
app.get("/user", authenticate, async (req: any, res: any) => {
  const allUsers = await prisma.user.findMany();
  console.log(req.user);
  res.send(allUsers);
});

// Create new user
app.post("/user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        email: `${req.body.email}`,
        password: `${hashedPassword}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Authenticate & login user
app.post("/user/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (await bcrypt.compare(req.body.password, user?.password)) {
      const user = req.body.email;
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      res.cookie("accessToken", accessToken, { maxAge: 9000, httpOnly: true });
      res.cookie("refreshToken", refreshToken);
      res.send("cookie Set");
    } else {
      res.send("incorrect");
    }
  } catch (err) {
    console.log(err);
  }
});

// May not be used ************************
app.get("/candidates", async (req, res) => {
  const allApplicants = await prisma.applicants.findMany();
  console.log(allApplicants);
  if (allApplicants) {
    res.send(allApplicants);
  }
});

// May not be used ************************
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

// Update a vacancy
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

// Delete a vacancy
app.delete("/vacancies/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await prisma.vacancy.delete({
      where: { id: `${id}` },
    });
    console.log("Vacancy Deleted");
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:userName", (req, res) => {
  let userName = req.params.userName;
  const currentUser = users.find((user) => user.userName === userName);
  res.send(currentUser);
});
