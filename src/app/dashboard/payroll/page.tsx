import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { payrolls } from "@/lib/data";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function PayrollPage() {
  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Review your payroll history and payment status.
      </p>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pay Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Gross Pay</TableHead>
              <TableHead className="text-right">Deductions</TableHead>
              <TableHead className="text-right">Net Pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll.id}>
                <TableCell className="font-medium">{payroll.period}</TableCell>
                <TableCell>
                  <Badge variant={payroll.status === "Paid" ? "default" : "secondary"} className={payroll.status === "Paid" ? 'bg-green-500 text-white' : ''}>
                    {payroll.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(payroll.gross)}</TableCell>
                <TableCell className="text-right">{formatCurrency(payroll.deductions)}</TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(payroll.net)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
