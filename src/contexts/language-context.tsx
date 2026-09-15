"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'es';

export const translations = {
  en: {
    brand: 'Grupo Empresarial',
    tagline: 'A connected intranet for the full business ecosystem.',
    login: 'Employee Portal',
    customerPortal: 'Customer Portal',
    customerLoginTitle: 'Customer Portal',
    customerLoginDescription: 'Sign in to access your shared documents, requests, and conversations with our team.',
    customerLoginButton: 'Sign in to customer portal',
    customerLoginError: 'This account is configured for employee access. Use the Employee Portal instead.',
    customerWelcome: 'Welcome to your customer portal',
    customerWelcomeText: 'Your shared documents, requests, and conversations will appear here.',
    customerSignOut: 'Sign out',
    myPortal: 'My Portal',
    logout: 'Logout',
    welcome: 'Welcome to Grupo Empresarial',
    subtitle: 'Integrated operations across every business unit and department.',
    companyOverview: 'Company overview',
    companyOverviewText:
      'Grupo Empresarial brings together the main operating units of the organization under one shared hub so teams can collaborate, manage operations, and share critical information across all businesses.',
    businessUnits: 'Business units',
    coreDepartments: 'Core departments',
    viewPortal: 'View portal',
    heroEyebrow: 'Grupo Empresarial',
    heroTitle: 'Building better businesses, together.',
    heroDescription: 'A connected group of companies creating practical solutions, strong partnerships, and lasting value across every operation.',
    trustLabel: 'One group. Different capabilities. Shared standards.',
    aboutEyebrow: 'Our approach',
    aboutTitle: 'Independent businesses, one shared direction.',
    aboutText: 'We bring together people, capabilities, and operating discipline to help each business move with clarity and confidence.',
    capabilitiesEyebrow: 'What we bring',
    capabilitiesTitle: 'Built for the work behind growth.',
    capabilityOperations: 'Operational discipline',
    capabilityOperationsText: 'Reliable processes and practical systems that keep teams moving.',
    capabilityPeople: 'People and culture',
    capabilityPeopleText: 'Teams aligned around accountability, care, and continuous improvement.',
    capabilityPartnerships: 'Long-term partnerships',
    capabilityPartnershipsText: 'Relationships built on quality, responsiveness, and shared ambition.',
    contactEyebrow: 'Start a conversation',
    contactTitle: 'Let’s build what comes next.',
    contactText: 'Tell us what you are working on. Our team will connect you with the right business unit.',
    contactButton: 'Contact our team',
    navAbout: 'Our approach',
    navCapabilities: 'Capabilities',
    navContact: 'Contact',
    unitBodeguitas: 'Bodeguitas Personales',
    unitSnacks: 'Snacks',
    unitDesihratados: 'Desihratados',
    unitAdministracion: 'Administracion',
    departmentHR: 'Human Resources',
    departmentCalendar: 'Calendar',
    departmentSafety: 'Health & Safety',
    departmentPolicies: 'Policies & Procedures',
    departmentPayroll: 'Payroll',
    departmentPerformance: 'Performance',
    departmentLegal: 'Legal',
    departmentDocuments: 'Documents',
    departmentDirectory: 'Directory',
    departmentProjects: 'Current Projects',
    dashboard: 'Dashboard',
    activitiesCalendar: 'Activities Calendar',
    announcements: 'Announcements',
    askMe: 'Ask Me',
    currentProjects: 'Products',
    currentProjectsIntro: 'Explore the products made by Grupo Empresarial for healthier everyday choices.',
    snacksTitle: 'Snacks',
    snacksDescription: 'Healthy snacks made with carefully selected ingredients for convenient, flavorful nutrition.',
    dehydratedProductsTitle: 'Dehidrated Products',
    dehydratedProductsDescription: 'Dehydrated vegetables, spices, and fruits that preserve flavor and quality for everyday use.',
    productCategories: 'Product categories',
    vegetables: 'Vegetables',
    spices: 'Spices',
    fruits: 'Fruits',
    directory: 'Directory',
    documents: 'Documents',
    healthAndSafety: 'Health and Safety',
    legal: 'Legal',
    payroll: 'Payroll',
    performance: 'Performance',
    policiesAndProcedures: 'Policies & Procedures',
    onboarding: 'Onboarding',
    users: 'Users',
    unitDashboardIntro: 'A focused view of this business unit and its day-to-day operations.',
    unitPeople: 'People',
    unitDepartments: 'Departments',
    unitOpenItems: 'Open items',
    unitAnnouncements: 'Latest announcements',
    unitQuickAccess: 'Quick access',
  },
  es: {
    brand: 'Grupo Empresarial',
    tagline: 'Un intranet conectado para todo el ecosistema empresarial.',
    login: 'Portal de empleados',
    customerPortal: 'Portal de clientes',
    customerLoginTitle: 'Portal de clientes',
    customerLoginDescription: 'Ingresa para consultar documentos compartidos, solicitudes y conversaciones con nuestro equipo.',
    customerLoginButton: 'Ingresar al portal de clientes',
    customerLoginError: 'Esta cuenta está configurada para acceso de empleados. Usa el Portal de empleados.',
    customerWelcome: 'Bienvenido a tu portal de cliente',
    customerWelcomeText: 'Aquí aparecerán tus documentos compartidos, solicitudes y conversaciones.',
    customerSignOut: 'Cerrar sesión',
    myPortal: 'Mi portal',
    logout: 'Cerrar sesión',
    welcome: 'Bienvenido a Grupo Empresarial',
    subtitle: 'Operaciones integradas en cada unidad de negocio y departamento.',
    companyOverview: 'Resumen de la empresa',
    companyOverviewText:
      'Grupo Empresarial reúne las principales unidades de negocio de la organización en un mismo hub para que los equipos colaboren, gestionen operaciones y compartan información clave en todas las compañías.',
    businessUnits: 'Unidades de negocio',
    coreDepartments: 'Departamentos principales',
    viewPortal: 'Ver portal',
    heroEyebrow: 'Grupo Empresarial',
    heroTitle: 'Construimos mejores negocios, juntos.',
    heroDescription: 'Un grupo conectado que crea soluciones prácticas, alianzas sólidas y valor duradero en cada operación.',
    trustLabel: 'Un grupo. Distintas capacidades. Estándares compartidos.',
    aboutEyebrow: 'Nuestra forma de trabajar',
    aboutTitle: 'Negocios independientes, una dirección compartida.',
    aboutText: 'Conectamos personas, capacidades y disciplina operativa para que cada negocio avance con claridad y confianza.',
    capabilitiesEyebrow: 'Lo que aportamos',
    capabilitiesTitle: 'La base detrás del crecimiento.',
    capabilityOperations: 'Disciplina operativa',
    capabilityOperationsText: 'Procesos confiables y sistemas prácticos que mantienen a los equipos avanzando.',
    capabilityPeople: 'Personas y cultura',
    capabilityPeopleText: 'Equipos alineados alrededor de la responsabilidad, el cuidado y la mejora continua.',
    capabilityPartnerships: 'Alianzas de largo plazo',
    capabilityPartnershipsText: 'Relaciones construidas con calidad, respuesta y ambición compartida.',
    contactEyebrow: 'Iniciemos una conversación',
    contactTitle: 'Construyamos lo que sigue.',
    contactText: 'Cuéntanos en qué estás trabajando. Te conectaremos con la unidad de negocio adecuada.',
    contactButton: 'Contactar al equipo',
    navAbout: 'Nuestra forma de trabajar',
    navCapabilities: 'Capacidades',
    navContact: 'Contacto',
    unitBodeguitas: 'Bodeguitas Personales',
    unitSnacks: 'Snacks',
    unitDesihratados: 'Desihratados',
    unitAdministracion: 'Administracion',
    departmentHR: 'Recursos Humanos',
    departmentCalendar: 'Calendario',
    departmentSafety: 'Salud y Seguridad',
    departmentPolicies: 'Políticas y procedimientos',
    departmentPayroll: 'Nómina',
    departmentPerformance: 'Desempeño',
    departmentDocuments: 'Documentos',
    departmentDirectory: 'Directorio',
    departmentProjects: 'Proyectos actuales',
    departmentLegal: 'Legal',
    dashboard: 'Panel principal',
    activitiesCalendar: 'Calendario de actividades',
    announcements: 'Anuncios',
    askMe: 'Pregúntame',
    currentProjects: 'Productos',
    currentProjectsIntro: 'Conoce los productos que Grupo Empresarial crea para elecciones más saludables cada día.',
    snacksTitle: 'Snacks',
    snacksDescription: 'Snacks saludables elaborados con ingredientes cuidadosamente seleccionados para una nutrición práctica y sabrosa.',
    dehydratedProductsTitle: 'Dehidrated Products',
    dehydratedProductsDescription: 'Vegetales, especias y frutas deshidratados que conservan su sabor y calidad para el uso diario.',
    productCategories: 'Categorías de productos',
    vegetables: 'Vegetales',
    spices: 'Especias',
    fruits: 'Frutas',
    directory: 'Directorio',
    documents: 'Documentos',
    healthAndSafety: 'Salud y seguridad',
    legal: 'Legal',
    payroll: 'Nómina',
    performance: 'Desempeño',
    policiesAndProcedures: 'Políticas y procedimientos',
    onboarding: 'Incorporación',
    users: 'Usuarios',
    unitDashboardIntro: 'Una vista enfocada en esta unidad de negocio y sus operaciones diarias.',
    unitPeople: 'Personas',
    unitDepartments: 'Departamentos',
    unitOpenItems: 'Pendientes',
    unitAnnouncements: 'Últimos anuncios',
    unitQuickAccess: 'Accesos rápidos',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Record<TranslationKey, string>;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const stored = window.localStorage.getItem('grupo-empresarial-language') as Language | null;
    if (stored === 'en' || stored === 'es') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('grupo-empresarial-language', nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
