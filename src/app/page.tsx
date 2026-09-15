"use client";

import Image from 'next/image';
import {
  ArrowUpRight,
  Check,
  Handshake,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const { t } = useLanguage();

  const capabilities = [
    { icon: ShieldCheck, title: t.capabilityOperations, text: t.capabilityOperationsText },
    { icon: UsersRound, title: t.capabilityPeople, text: t.capabilityPeopleText },
    { icon: Handshake, title: t.capabilityPartnerships, text: t.capabilityPartnershipsText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative isolate min-h-[640px] overflow-hidden bg-primary text-primary-foreground">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=90"
            alt="Equipo trabajando en una oficina luminosa"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,40,39,0.94)_0%,rgba(15,40,39,0.78)_42%,rgba(15,40,39,0.22)_100%)]" />
          <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
            <div className="max-w-3xl">
              <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-10 bg-accent" />
                {t.heroEyebrow}
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">{t.heroTitle}</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-primary-foreground/80 md:text-xl">{t.heroDescription}</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t.trustLabel}</p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-foreground/70">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Personas primero</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Calidad constante</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Visión de largo plazo</span>
            </div>
          </div>
        </section>

        <section id="about" className="bg-background px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{t.aboutEyebrow}</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">{t.aboutTitle}</h2>
            </div>
            <div className="max-w-2xl lg:pt-8">
              <p className="text-xl leading-9 text-muted-foreground">{t.aboutText}</p>
              <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
                <div><p className="text-3xl font-semibold text-primary">03</p><p className="mt-2 text-sm text-muted-foreground">Capacidades conectadas</p></div>
                <div><p className="text-3xl font-semibold text-primary">01</p><p className="mt-2 text-sm text-muted-foreground">Visión compartida</p></div>
                <div><p className="text-3xl font-semibold text-primary">∞</p><p className="mt-2 text-sm text-muted-foreground">Posibilidades</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="bg-card px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{t.capabilitiesEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">{t.capabilitiesTitle}</h2>
            </div>
            <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
                  <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-primary px-6 py-24 text-primary-foreground lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{t.contactEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{t.contactTitle}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">{t.contactText}</p>
            </div>
            <Button asChild size="lg" className="w-fit bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="mailto:contacto@grupoempresarial.com">{t.contactButton}<ArrowUpRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}