import { cn } from "@/lib/utils";

export function Logo({
  className,
  primaryColor = "hsl(var(--primary))",
  accentColor = "hsl(var(--accent))",
  showText = false,
  ...props
}: React.SVGProps<SVGSVGElement> & { primaryColor?: string; accentColor?: string, showText?: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={cn("h-8 w-8", className)}
            {...props}
        >
            <rect x="16" y="16" width="68" height="68" rx="18" fill={primaryColor} opacity="0.12" />
            <path
                d="M30 68V32H44.5C53.6 32 60 38.4 60 46.3C60 54.2 53.6 60.6 44.5 60.6H37.5V68H30ZM37.5 53.7H43.9C48.7 53.7 52.3 50.7 52.3 46.3C52.3 41.9 48.7 38.9 43.9 38.9H37.5V53.7Z"
                fill={primaryColor}
            />
            <path
                d="M63 69L72.5 32H79.5L70 69H63Z"
                fill={accentColor}
            />
            <path
                d="M50 72C45.6 72 42 68.4 42 64C42 59.6 45.6 56 50 56C54.4 56 58 59.6 58 64C58 68.4 54.4 72 50 72Z"
                fill={accentColor}
                opacity="0.9"
            />
            {showText && (
                <text
                    x="50"
                    y="92"
                    textAnchor="middle"
                    fontSize="18"
                    fill={primaryColor}
                    fontFamily="var(--font-headline), sans-serif"
                    fontWeight="700"
                >
                    Grupo
                </text>
            )}
        </svg>
    );
}
