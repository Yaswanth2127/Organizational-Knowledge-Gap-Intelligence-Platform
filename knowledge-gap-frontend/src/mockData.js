// src/mockData.js
export const mockUsers = [
  {
    id: 1,
    fullName: "Aarav Sharma",
    email: "aarav.sharma@company.com",
    phoneNumber: "+91-98765-43210",
    departmentName: "Engineering",
    jobRoleName: "Senior Software Engineer",
    managerName: "Priya Patel",
    isActive: true,
    emailVerified: true,
    profileImageUrl: null,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-12-10T14:20:00Z"
  },
  {
    id: 2,
    fullName: "Priya Patel",
    email: "priya.patel@company.com",
    phoneNumber: "+91-98765-43211",
    departmentName: "Engineering",
    jobRoleName: "Engineering Manager",
    managerName: "Rahul Verma",
    isActive: true,
    emailVerified: true,
    profileImageUrl: null,
    createdAt: "2023-06-01T09:00:00Z",
    updatedAt: "2024-11-25T16:45:00Z"
  },
  {
    id: 3,
    fullName: "Rahul Verma",
    email: "rahul.verma@company.com",
    phoneNumber: "+91-98765-43212",
    departmentName: "Product",
    jobRoleName: "Product Director",
    managerName: null,
    isActive: true,
    emailVerified: true,
    profileImageUrl: null,
    createdAt: "2022-09-10T11:15:00Z",
    updatedAt: "2024-12-01T12:00:00Z"
  },
  {
    id: 4,
    fullName: "Sneha Reddy",
    email: "sneha.reddy@company.com",
    phoneNumber: "+91-98765-43213",
    departmentName: "Data Science",
    jobRoleName: "Data Analyst",
    managerName: "Aarav Sharma",
    isActive: true,
    emailVerified: false,
    profileImageUrl: null,
    createdAt: "2024-08-20T08:30:00Z",
    updatedAt: "2024-12-05T09:10:00Z"
  },
  {
    id: 5,
    fullName: "Vikram Singh",
    email: "vikram.singh@company.com",
    phoneNumber: "+91-98765-43214",
    departmentName: "Engineering",
    jobRoleName: "DevOps Engineer",
    managerName: "Priya Patel",
    isActive: false,
    emailVerified: true,
    profileImageUrl: null,
    createdAt: "2023-11-01T13:00:00Z",
    updatedAt: "2024-09-30T10:00:00Z"
  },
  {
    id: 6,
    fullName: "Ananya Desai",
    email: "ananya.desai@company.com",
    phoneNumber: "+91-98765-43215",
    departmentName: "Human Resources",
    jobRoleName: "HR Specialist",
    managerName: "Rahul Verma",
    isActive: true,
    emailVerified: true,
    profileImageUrl: null,
    createdAt: "2024-03-10T12:00:00Z",
    updatedAt: "2024-12-12T11:30:00Z"
  }
];

export const mockDepartments = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Product" },
  { id: 3, name: "Data Science" },
  { id: 4, name: "Human Resources" },
  { id: 5, name: "Sales" }
];

export const mockJobRoles = [
  { id: 1, title: "Software Engineer", departmentId: 1 },
  { id: 2, title: "Senior Software Engineer", departmentId: 1 },
  { id: 3, title: "Engineering Manager", departmentId: 1 },
  { id: 4, title: "Product Manager", departmentId: 2 },
  { id: 5, title: "Product Director", departmentId: 2 },
  { id: 6, title: "Data Analyst", departmentId: 3 },
  { id: 7, title: "Data Scientist", departmentId: 3 },
  { id: 8, title: "HR Specialist", departmentId: 4 },
  { id: 9, title: "DevOps Engineer", departmentId: 1 }
];

export const mockSkills = [
  { id: 1, name: "React.js", categoryId: 1, description: "Frontend framework" },
  { id: 2, name: "Spring Boot", categoryId: 2, description: "Backend microservices" },
  { id: 3, name: "PostgreSQL", categoryId: 3, description: "Relational database" },
  { id: 4, name: "Tailwind CSS", categoryId: 1, description: "CSS framework" },
  { id: 5, name: "AWS", categoryId: 2, description: "Cloud services" },
  { id: 6, name: "Python", categoryId: 2, description: "Programming language" },
  { id: 7, name: "Docker", categoryId: 2, description: "Containerization" },
  { id: 8, name: "Kubernetes", categoryId: 2, description: "Orchestration" },
  { id: 9, name: "Figma", categoryId: 1, description: "Design tool" },
  { id: 10, name: "SQL", categoryId: 3, description: "Query language" }
];

export const mockCertifications = [
  {
    id: 1,
    userId: 1,
    skillId: 2,
    name: "AWS Certified Developer",
    issuer: "Amazon",
    issueDate: "2024-02-15",
    expiryDate: "2027-02-15",
    credentialUrl: "https://aws.amazon.com/certification"
  },
  {
    id: 2,
    userId: 1,
    skillId: 1,
    name: "React Certification",
    issuer: "Meta",
    issueDate: "2023-08-10",
    expiryDate: "2025-08-10"
  },
  {
    id: 3,
    userId: 2,
    skillId: 5,
    name: "AWS Solutions Architect",
    issuer: "Amazon",
    issueDate: "2023-12-01",
    expiryDate: "2026-12-01"
  },
  {
    id: 4,
    userId: 4,
    skillId: 6,
    name: "Python Data Science",
    issuer: "Coursera",
    issueDate: "2024-09-20",
    expiryDate: null
  }
];

export const mockEmployeeSkills = [
  { id: 1, userId: 1, skillId: 1, selfRating: "ADVANCED", peerRating: "EXPERT", managerRating: "ADVANCED", finalRating: "ADVANCED" },
  { id: 2, userId: 1, skillId: 2, selfRating: "INTERMEDIATE", peerRating: "INTERMEDIATE", managerRating: "ADVANCED", finalRating: "INTERMEDIATE" },
  { id: 3, userId: 1, skillId: 3, selfRating: "BEGINNER", peerRating: "BEGINNER", managerRating: "INTERMEDIATE", finalRating: "BEGINNER" },
  { id: 4, userId: 2, skillId: 5, selfRating: "EXPERT", peerRating: "EXPERT", managerRating: "EXPERT", finalRating: "EXPERT" },
  { id: 5, userId: 2, skillId: 7, selfRating: "ADVANCED", peerRating: "ADVANCED", managerRating: "ADVANCED", finalRating: "ADVANCED" },
  { id: 6, userId: 4, skillId: 6, selfRating: "INTERMEDIATE", peerRating: null, managerRating: null, finalRating: "INTERMEDIATE" },
  { id: 7, userId: 5, skillId: 1, selfRating: "BEGINNER", peerRating: "BEGINNER", managerRating: "BEGINNER", finalRating: "BEGINNER" },
  { id: 8, userId: 5, skillId: 4, selfRating: "ADVANCED", peerRating: "ADVANCED", managerRating: "INTERMEDIATE", finalRating: "ADVANCED" },
  { id: 9, userId: 6, skillId: 10, selfRating: "EXPERT", peerRating: "EXPERT", managerRating: "EXPERT", finalRating: "EXPERT" },
  { id: 10, userId: 6, skillId: 2, selfRating: "UNAWARE", peerRating: "UNAWARE", managerRating: "UNAWARE", finalRating: "UNAWARE" }
];

// Helper to combine user with skills
export const getEmployeeWithSkills = (userId) => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return null;
  const skills = mockEmployeeSkills.filter(es => es.userId === userId).map(es => {
    const skill = mockSkills.find(s => s.id === es.skillId);
    return { ...es, skillName: skill ? skill.name : 'Unknown' };
  });
  return { ...user, skills };
};

export const getAllEmployeeSkills = () => {
  return mockEmployeeSkills.map(es => {
    const user = mockUsers.find(u => u.id === es.userId);
    const skill = mockSkills.find(s => s.id === es.skillId);
    return {
      ...es,
      userName: user ? user.fullName : 'Unknown',
      profileImageUrl: user ? user.profileImageUrl : null,
      departmentName: user ? user.departmentName : null,
      jobRoleName: user ? user.jobRoleName : null,
      skillName: skill ? skill.name : 'Unknown'
    };
  });
};