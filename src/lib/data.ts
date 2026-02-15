import type { Employee, Announcement, Payroll, PolicyDocument, Project } from './types';

export const employees: Employee[] = [
  // Corporate
  { id: '1', name: 'Admin User', email: 'admin@applicationintelligence.ai', department: 'Corporate', role: 'Administrator', title: 'CEO', avatar: 'avatar1' },
  { id: '2', name: 'Bob Williams', email: 'bob.w@appintel.com', department: 'Corporate', role: 'Department Head', title: 'CTO', avatar: 'avatar2' },

  // IT
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@appintel.com', department: 'IT', role: 'Department Head', title: 'IT Manager', avatar: 'avatar3' },
  { id: '4', name: 'Diana Miller', email: 'diana.m@appintel.com', department: 'IT', role: 'Department Employee', title: 'Frontend Developer', avatar: 'avatar4' },
  { id: '5', name: 'Ethan Davis', email: 'ethan.d@appintel.com', department: 'IT', role: 'Department Employee', title: 'Backend Developer', avatar: 'avatar5' },
  
  // HR
  { id: '6', name: 'Fiona Garcia', email: 'fiona.g@appintel.com', department: 'HR', role: 'Department Head', title: 'HR Director', avatar: 'avatar6' },
  { id: '7', name: 'George Rodriguez', email: 'george.r@appintel.com', department: 'HR', role: 'Department Employee', title: 'HR Generalist', avatar: 'avatar7' },

  // Call Center
  { id: '8', name: 'Hannah Smith', email: 'hannah.s@appintel.com', department: 'Call Center', role: 'Department Head', title: 'Support Lead', avatar: 'avatar8' },
  { id: '9', name: 'Ian Taylor', email: 'ian.t@appintel.com', department: 'Call Center', role: 'Department Employee', title: 'Support Specialist', avatar: 'avatar9' },
  { id: '10', name: 'Jane Anderson', email: 'jane.a@appintel.com', department: 'Call Center', role: 'Department Employee', title: 'Support Specialist', avatar: 'avatar10' },
  { id: '11', name: 'Kevin Thomas', email: 'kevin.t@appintel.com', department: 'Call Center', role: 'Department Employee', title: 'Support Specialist', avatar: 'avatar11' },
  
  // Accounting
  { id: '12', name: 'Laura Hernandez', email: 'laura.h@appintel.com', department: 'Accounting', role: 'Department Head', title: 'Finance Manager', avatar: 'avatar12' },
  { id: '13', name: 'Mike Moore', email: 'mike.m@appintel.com', department: 'Accounting', role: 'Department Employee', title: 'Accountant', avatar: 'avatar13' },
  { id: '14', name: 'Nora Martin', email: 'nora.m@appintel.com', department: 'Accounting', role: 'Department Employee', title: 'Accountant', avatar: 'avatar14' },
  { id: '15', name: 'Oscar Lee', email: 'oscar.l@appintel.com', department: 'IT', role: 'Department Employee', title: 'UI/UX Designer', avatar: 'avatar15' },
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
}

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
    title: 'Travelogis',
    description: 'A multi-faceted web application that combines two distinct business verticals under one platform: a Travel Agency and a Cargo Logistics service. It is designed with a sophisticated role-based access system, providing tailored experiences for Customers, Agents, Supervisors, and Administrators. The application leverages a modern tech stack, including Next.js and React, and heavily integrates Generative AI (via Genkit) to power many of its unique features. It is also fully internationalized, supporting both English and Spanish.',
    imageUrlId: 'project-travelogis',
    projectUrl: 'http://travelogis.com',
  },
  {
    id: '2',
    title: 'EstimateMyJunk',
    description: 'EstimateMyJunk (also referred to as JunkSnap Estimator) is a sophisticated, full-stack junk removal platform designed to automate the process of providing service estimates using artificial intelligence. The app streamlines the interaction between people who have junk to remove and the service providers who pick it up. It removes the friction of "calling for a quote" by allowing users to get an instant, AI-driven price estimate just by taking a photo of their trash.',
    imageUrlId: 'project-estimatemyjunk',
    projectUrl: 'http://estimatemyjunk.ai',
  },
];
