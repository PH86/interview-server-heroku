export interface IUser {
  id: String;
  email: String;
  firstName: String;
  sirname: String;
  company: String;
  subscription: String;
  vacancies?: IVacancy[];
}

export interface IVacancy {
  id: String;
  createdAt: string;
  title: String;
  company: String;
  location: String;
  salary: number;
  applicants: String[];
  endDate: String;
  jobDescription: String;
  companyDescription: String;
  salaryMin: number;
  salaryMax: number;
  requirementEssential: String[];
  requirementDesired: String[];
  responsibilities: String[];
  author: IUser;
  authorId: String;
}

export interface IApplicants {
  id: String;
  name: String;
  currentJob: String;
  location: String;
  email: String;
  phoneNumber: String;
  cvLink: String;
}
