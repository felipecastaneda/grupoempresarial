"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'es';

export const translations = {
  en: {
    brand: 'Grupo Empresarial',
    tagline: 'A connected intranet for the full business ecosystem.',
    login: 'Employee Login',
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
    heroButton: 'Access the intranet',
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
    businessUnits: 'Business units',
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
    login: 'Acceso de empleado',
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
    heroButton: 'Acceder al intranet',
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
    businessUnits: 'Unidades de negocio',
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
  const [language, setLanguageState] = useState<Language>('en');

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
