import { PrismaClient } from "@prisma/client";
import { IUser } from "../../intefaces";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  await prisma.applicants.create({
    data: {
      id: "6",
      name: "Richie Blackmore",
      currentJob: "Software Developer",
      location: "Leeds",
      email: "richie.blackmore@domain.com",
      phoneNumber: "07745777454",
      cvLink: "www.somelocation.com",
    },
  });
  const applicant = await prisma.applicants.findMany();
  console.log(applicant);
}

main();
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
