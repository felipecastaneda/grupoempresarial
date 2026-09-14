export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Grupo Empresarial. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
