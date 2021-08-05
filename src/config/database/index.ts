import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  await prisma.vacancy.create({
    data: {
      title: "Test Customer Service Advisor",
      company: "Green",
      location: "Newcastle",
      salary: 25000,
      endDate: "11/11/2021",
      jobDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      companyDescription:
        "Company description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      salaryMin: 20000,
      salaryMax: 25000,
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
        connect: { id: "ckrnho6n80000icq5qtsk8z" },
      },
    },
  });
  console.log("added");
}
// Get user by ID?

// take a user id as property - get the vacancy ids for the users - get the vacancies for the user

// get all applicants
export const getApplicants = async () => {
  const allUsers = await prisma.applicants.findMany();
  console.log(allUsers);
  if (allUsers) {
    return allUsers;
  }
};

// DONE update current vacancy

// DONE delete vacancy

// DONE user creation

// DONE user password encryption

// user authentication

// server loading component

// user settings

// billing and payments

// Delete user and all data (deleteMany)

// Admin - to do later
// get all users

// get single user
