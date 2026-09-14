"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Headset, Building2, Users, Briefcase, ShieldCheck, BriefcaseBusiness } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");
  const { t } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-card py-20 md:py-32">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
          )}
          <div className="absolute inset-0 bg-primary/80" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground font-headline">
                {t.brand}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
                {t.tagline}
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  {t.heroButton}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Carousel 
              setApi={setApi}
              plugins={[plugin.current]}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground font-headline mb-4">{t.companyOverview}</h2>
                        <p className="text-muted-foreground mb-4">
                          {t.companyOverviewText}
                        </p>
                        <p className="text-muted-foreground">
                          Each business unit retains its own operational rhythm, while the shared intranet keeps leadership, employees, and departments aligned around the same priorities, policies, and workflows.
                        </p>
                      </div>
                      <div className="flex justify-center">
                          <Image
                            src="https://picsum.photos/seed/abt/500/350"
                            alt="Our Team"
                            width={500}
                            height={350}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="team collaboration"
                          />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground font-headline mb-4">New Customers</h2>
                        <p className="text-muted-foreground mb-4">
                          We are thrilled to welcome our new partners. Our team is dedicated to ensuring a smooth onboarding process and providing exceptional support to help you achieve your goals.
                        </p>
                        <p className="text-muted-foreground">
                          Esperamos una colaboración exitosa y estamos emocionados por ver las soluciones innovadoras que podemos crear juntos. ¡Bienvenido a la familia de Grupo Empresarial!
                        </p>
                      </div>
                      <div className="flex justify-center">
                          <Image
                            src="https://picsum.photos/seed/cust/500/350"
                            alt="New Customers"
                            width={500}
                            height={350}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="business handshake"
                          />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground font-headline mb-4">Tecnología y operación</h2>
                        <p className="text-muted-foreground mb-4">
                          En Grupo Empresarial utilizamos tecnología para acelerar procesos, mejorar la calidad operativa y generar decisiones más inteligentes en cada unidad de negocio.
                        </p>
                        <p className="text-muted-foreground">
                          Integrando herramientas digitales en cada área, fortalecemos la eficiencia, la colaboración y la continuidad operativa de la organización.
                        </p>
                      </div>
                      <div className="flex justify-center">
                          <Image
                            src="https://picsum.photos/seed/ai-dev/500/350"
                            alt="AI in Development"
                            width={500}
                            height={350}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="artificial intelligence code"
                          />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {Array.from({ length: count }).map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className={`h-2 w-2 rounded-full p-0 ${index === current ? "bg-primary" : "bg-muted-foreground/50"}`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </section>
        
        <section id="departments" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">
              {t.businessUnits}
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { icon: Building2, title: t.unitBodeguitas },
                { icon: BriefcaseBusiness, title: t.unitSnacks },
                { icon: Users, title: t.unitDesihratados },
                { icon: ShieldCheck, title: t.unitAdministracion },
              ].map(({ icon: Icon, title }) => (
                <Card key={title}>
                  <CardHeader className="flex-row items-center gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-headline text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Shared teams, common workflows, and centralized access to HR, payroll, policies, safety, and operations across the business group.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">
                {t.coreDepartments}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Code, title: t.departmentHR },
                  { icon: Headset, title: t.departmentCalendar },
                  { icon: ShieldCheck, title: t.departmentSafety },
                  { icon: Briefcase, title: t.departmentPolicies },
                ].map(({ icon: Icon, title }) => (
                  <Card key={title}>
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="font-headline">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Cross-functional support for employees across the business ecosystem, with shared access to critical information and operational processes.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
