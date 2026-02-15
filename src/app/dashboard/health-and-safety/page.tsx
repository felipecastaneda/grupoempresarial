
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ShieldCheck, Siren } from "lucide-react";

export default function HealthAndSafetyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline">Health & Safety</h1>
        <p className="text-muted-foreground">
          Your well-being is our top priority. Find resources and guidelines here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <span>Emergency Procedures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              In case of an emergency, please follow the established protocols. Evacuation maps are posted near all exits.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              <span>Workplace Safety</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Maintain a clean and organized workspace. Report any potential hazards to your department head immediately.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Siren className="h-6 w-6 text-primary" />
              <span>First Aid</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              First aid kits are available in the kitchen and the HR office. For serious injuries, call 911.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
