import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  await prisma.user.create({
    data: {
      firstName: "John",
      sirname: "Smith",
      email: "john.smith@green.energy",
      company: "green",
      subscription: "full",
    },
  });
}
// Get user by ID?

// get user vacancies
// take a user id as property - get the vacancy ids for the users - get the vacancies for the user

// get all applicants
export const getApplicants = async () => {
  return await prisma.user.findMany();
};
// get single vacancy

// get single applicant

// add new vacancy

// update current vacancy

// delete vacancy

// get all users

// get single user
