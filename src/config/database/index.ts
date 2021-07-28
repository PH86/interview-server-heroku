import { PrismaClient } from "@prisma/client";
import { IUser } from "../../intefaces";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  await prisma.vacancy.create({
    data: {
      title: "Manager",
      company: "Interview",
      location: "Manchester",
      salary: 60000,
      applicants: ["1", "3", "4"],
      endDate: "11/11/2021",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      companyDescription:
        "Company description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      salaryMin: 55000,
      salaryMax: 60000,
      requirementEssential: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
      ],
      requirementDesired: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
      ],
      responsibilities: [
        "Lorem ipsum dolor sit amet",
        "consectetur adipiscing elit",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        "Ut enim ad minim veniam",
      ],
      author: {
        connect: { id: "ckrg9ir070000s3q5r1h2ddk7" },
      },
    },
  });
  const applicant = await prisma.applicants.findMany();
  console.log(applicant);
}
// Get user by ID?

// get user vacancies
// take a user id as property - get the vacancy ids for the users - get the vacancies for the user

// get all applicants
export const getApplicants = async () => {
  const allUsers = await prisma.applicants.findMany();
  console.log(allUsers);
  if (allUsers) {
    return allUsers;
  }
};
// get single vacancy

// get single applicant

// add new vacancy

// update current vacancy

// delete vacancy

// get all users

// get single user
