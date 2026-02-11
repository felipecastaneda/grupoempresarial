import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Code, Headset } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero");
  
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
              <div className="flex flex-col items-center mb-8">
                <Logo
                  className="h-24 w-24"
                  primaryColor="hsl(var(--primary-foreground))"
                  accentColor="hsl(var(--accent))"
                  showText={true}
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground font-headline">
                Application Intelligence
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-foreground/90">
                Engineering the Future of Software, Today.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground font-headline mb-4">About AppIntel Hub</h2>
                        <p className="text-muted-foreground mb-4">
                          Application Intelligence was founded with a singular mission: to deliver cutting-edge software solutions that drive business success. We believe in the power of technology to transform industries and empower organizations.
                        </p>
                        <p className="text-muted-foreground">
                          Our team of dedicated professionals combines expertise with a passion for innovation, ensuring that every project we undertake is not just a success, but a benchmark for quality and performance. Our values of integrity, collaboration, and excellence are at the core of everything we do.
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
                          We look forward to a successful collaboration and are excited to see the innovative solutions we can build together. Welcome to the AppIntel Hub family!
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
                        <h2 className="text-3xl font-bold text-foreground font-headline mb-4">Artificial Intelligence in Development</h2>
                        <p className="text-muted-foreground mb-4">
                          At AppIntel Hub, we leverage the power of Artificial Intelligence to accelerate development cycles, enhance code quality, and deliver smarter solutions. Our AI-driven tools assist in everything from automated testing to intelligent code completion.
                        </p>
                        <p className="text-muted-foreground">
                          By integrating AI into our workflow, we are pushing the boundaries of what's possible, creating more robust, efficient, and intelligent applications for our clients.
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
            </Carousel>
          </div>
        </section>
        
        <section id="departments" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">
              Our Core Departments
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Code className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline">Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our team of 5 expert developers crafts robust, scalable, and innovative software solutions. From backend architecture to frontend design, we build the tools that power your business.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Headset className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline">Call Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    With 8 dedicated support specialists, our call center provides exceptional customer service and technical support, ensuring a seamless experience for all our clients and their users.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
