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
    currentProjects: 'Current Projects',
    directory: 'Directory',
    documents: 'Documents',
    healthAndSafety: 'Health and Safety',
    legal: 'Legal',
    officeOfTheCEO: 'Office of the CEO',
    payroll: 'Payroll',
    performance: 'Performance',
    policiesAndProcedures: 'Policies & Procedures',
    onboarding: 'Onboarding',
    users: 'Users',
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
    currentProjects: 'Proyectos actuales',
    directory: 'Directorio',
    documents: 'Documentos',
    healthAndSafety: 'Salud y seguridad',
    legal: 'Legal',
    officeOfTheCEO: 'Oficina del CEO',
    payroll: 'Nómina',
    performance: 'Desempeño',
    policiesAndProcedures: 'Políticas y procedimientos',
    onboarding: 'Incorporación',
    users: 'Usuarios',
  },
} as const;

type TranslationKey = keyof (typeof translations)['en'];

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
