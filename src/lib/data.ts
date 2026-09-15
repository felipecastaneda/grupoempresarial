import type { Employee, Announcement, Payroll, PolicyDocument, Project } from './types';

export const employees: Employee[] = [
  // Corporate
  { id: '1', name: 'Felipe Castañeda', email: 'castaneda.felipe@gmail.com', department: 'Corporate', roles: ['Administrator'], title: 'Developer', avatar: 'avatar1' },
  { id: '2', name: 'Paul Hassan Admin', email: 'phassan-admin@test.com', department: 'Corporate', roles: ['Administrator'], title: 'CEO', avatar: 'phassan' },

  // IT
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@appintel.com', department: 'IT', roles: ['Department Head'], title: 'IT Manager', avatar: 'avatar3' },
  { id: '4', name: 'Diana Miller', email: 'diana.m@appintel.com', department: 'IT', roles: ['Department Employee'], title: 'Frontend Developer', avatar: 'avatar4' },
  { id: '5', name: 'Paul Hassan User', email: 'phassan-user@test.com', department: 'IT', roles: ['Department Employee'], title: 'Backend Developer', avatar: 'phassan' },
  
  // HR
  { id: '6', name: 'Fiona Garcia', email: 'fiona.g@appintel.com', department: 'HR', roles: ['Department Head'], title: 'HR Director', avatar: 'avatar6' },
  { id: '7', name: 'George Rodriguez', email: 'george.r@appintel.com', department: 'HR', roles: ['Department Employee'], title: 'HR Generalist', avatar: 'avatar7' },

  // Call Center
  { id: '8', name: 'Hannah Smith', email: 'hannah.s@appintel.com', department: 'Call Center', roles: ['Department Head'], title: 'Support Lead', avatar: 'avatar8' },
  { id: '9', name: 'Ian Taylor', email: 'ian.t@appintel.com', department: 'Call Center', roles: ['Department Employee'], title: 'Support Specialist', avatar: 'avatar9' },
  { id: '10', name: 'Jane Anderson', email: 'jane.a@appintel.com', department: 'Call Center', roles: ['Department Employee'], title: 'Support Specialist', avatar: 'avatar10' },
  { id: '11', name: 'Kevin Thomas', email: 'kevin.t@appintel.com', department: 'Call Center', roles: ['Department Employee'], title: 'Support Specialist', avatar: 'avatar11' },
  
  // Accounting
  { id: '12', name: 'Laura Hernandez', email: 'laura.h@appintel.com', department: 'Accounting', roles: ['Department Head'], title: 'Finance Manager', avatar: 'avatar12' },
  { id: '13', name: 'Mike Moore', email: 'mike.m@appintel.com', department: 'Accounting', roles: ['Department Employee'], title: 'Accountant', avatar: 'avatar13' },
  { id: '14', name: 'Nora Martin', email: 'nora.m@appintel.com', department: 'Accounting', roles: ['Department Employee'], title: 'Accountant', avatar: 'avatar14' },
  { id: '15', name: 'Oscar Lee', email: 'oscar.l@appintel.com', department: 'IT', roles: ['Department Employee', 'Department Head'], title: 'UI/UX Designer', avatar: 'avatar15' },
];

export const announcements: Announcement[] = [
  { id: '1', title: 'Q3 Town Hall Meeting', content: 'Join us for the Q3 town hall this Friday at 3 PM in the main conference room. We will discuss our quarterly performance and future goals.', date: '2023-09-15', imageId: 'announcement1' },
  { id: '2', title: 'New Office Health & Safety Guidelines', content: 'Please review the updated health and safety guidelines available on the intranet. Your cooperation is essential to maintaining a safe workplace.', date: '2023-09-10', imageId: 'announcement2' },
  { id: '3', title: 'Annual Company Picnic', content: 'Get ready for some fun in the sun! The annual company picnic will be held on October 7th at Green Park. More details to follow.', date: '2023-09-05', imageId: 'announcement3' },
];

export const payrolls: Payroll[] = [
  { id: '1', period: '2023-08-15 - 2023-08-31', gross: 2500, deductions: 400, net: 2100, status: 'Paid' },
  { id: '2', period: '2023-08-01 - 2023-08-15', gross: 2500, deductions: 400, net: 2100, status: 'Paid' },
  { id: '3', period: '2023-07-15 - 2023-07-31', gross: 2450, deductions: 390, net: 2060, status: 'Paid' },
  { id: '4', period: '2023-09-01 - 2023-09-15', gross: 2500, deductions: 400, net: 2100, status: 'Pending' },
];

export const performanceData = {
    "IT": "Metrics: 15 projects completed, 95% on-time delivery, 3 major features launched, team morale at 8/10. Challenges: Unexpected scope creep in Project Phoenix. Successes: Successful launch of the new mobile app, which received positive user feedback.",
    "Call Center": "Metrics: 92% customer satisfaction rate, average response time of 45 seconds, 5% decrease in call volume due to better documentation. Challenges: High volume of calls during the new feature launch. Successes: Implemented a new ticketing system that improved efficiency by 15%."
};

export const personalPerformanceData: Record<string, string> = {
    "castaneda.felipe@gmail.com": "Felipe is developing this intranet and is responsible for the platform architecture, user experience, and delivery flow. He is focused on building a stable, polished experience for the business and should continue documenting key decisions and technical direction.",
    "diana.m@appintel.com": "Diana has been a top performer, consistently delivering high-quality code for the frontend team. She exceeded expectations on the mobile app project, contributing significantly to its successful launch. Areas for improvement include taking more initiative in code reviews.",
    "ian.t@appintel.com": "Ian demonstrates excellent customer service skills and has received positive feedback from clients. His average response time is well below the team average. He could improve by taking on more complex support tickets.",
    "charlie.b@appintel.com": "As IT Manager, Charlie has successfully overseen all major projects this quarter. His leadership on the mobile app deployment was critical. He needs to delegate more tasks to his team to avoid burnout."
};

export const policies: PolicyDocument[] = [
  {
    id: '1',
    title: 'Code of Conduct',
    description: 'Our principles for ethical and professional behavior.',
    imageId: 'policy-conduct',
    pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/company-website-ba4a8.firebasestorage.app/o/policies_procedures%2FCode%20of%20Conduct%20Policy%20%E2%80%93%20Remote%20Work%20Edition.pdf?alt=media&token=3a2ebea1-76f6-4c61-9a84-1932f22d4737',
  },
  {
    id: '2',
    title: 'Remote Work Policy',
    description: 'Guidelines and best practices for working from home.',
    imageId: 'policy-remote',
    pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/company-website-ba4a8.firebasestorage.app/o/policies_procedures%2FRemote%20Work%20Policy.pdf?alt=media&token=f0ae0728-e03f-4e8b-a7c9-e8b7cbd09e61',
  },
  {
    id: '3',
    title: 'Data Security Policy',
    description: 'How we protect company and customer data.',
    imageId: 'policy-security',
    pdfUrl: 'https://firebasestorage.googleapis.com/v0/b/company-website-ba4a8.firebasestorage.app/o/policies_procedures%2FData%20Security%20Policy.pdf?alt=media&token=b1a228b9-437d-4eaa-a152-44ecb6775589',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Snacks',
    description: 'Healthy snacks made with carefully selected ingredients for convenient, flavorful nutrition.',
    imageUrlId: 'project-travelogis',
    projectUrl: '/dashboard/current-projects',
  },
  {
    id: '2',
    title: 'Dehidrated Products',
    description: 'Dehydrated vegetables, spices, and fruits that preserve flavor and quality for everyday use.',
    imageUrlId: 'project-estimatemyjunk',
    projectUrl: '/dashboard/current-projects',
  },
];
