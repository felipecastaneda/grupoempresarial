
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { employees } from "@/lib/data";

export default function OfficeOfTheCEOPage() {
  const ceo = employees.find(e => e.title === 'CEO');
  const avatar = PlaceHolderImages.find(p => p.id === ceo?.avatar);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Office of the CEO</h1>
        <p className="text-muted-foreground">
          A message from our leadership and company vision.
        </p>
      </div>

      {ceo && (
        <Card className="overflow-hidden">
          <div className="bg-muted p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-32 w-32 border-4 border-background">
                {avatar && <AvatarImage src={avatar.imageUrl} alt={ceo.name} />}
                <AvatarFallback className="text-4xl">{ceo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold font-headline">{ceo.name}</h2>
                <p className="text-xl text-muted-foreground">{ceo.title}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Un mensaje para nuestro equipo</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Bienvenido al corazón de Grupo Empresarial. Nuestro camino está marcado por la pasión, la innovación y la búsqueda constante de la excelencia. No solo estamos construyendo software; estamos creando el futuro de nuestra organización.
              </p>
              <p>
                Nuestro éxito se basa en el talento colectivo y la dedicación de cada persona en esta empresa. Cada línea de código, cada interacción con clientes y cada idea nueva contribuyen a nuestra visión compartida. Estoy orgulloso de lo que hemos logrado juntos y aún más emocionado por lo que viene.
              </p>
              <p>
                Continuemos desafiando el status quo, apoyándonos mutuamente y construyendo una empresa que no solo lidere la industria, sino que también tenga un impacto real.
              </p>
              <p>Gracias por ser parte de este recorrido.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
