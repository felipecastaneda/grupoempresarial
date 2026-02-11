import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={cn("h-8 w-8", className)}
            {...props}
        >
            <g>
                {/* A for Application */}
                <path
                    d="M20 80 L50 20 L80 80"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <line
                    x1="35"
                    y1="55"
                    x2="65"
                    y2="55"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                {/* I for Intelligence, using the accent color */}
                <circle cx="50" cy="55" r="8" fill="hsl(var(--accent))" />
                <line
                    x1="50"
                    y1="65"
                    x2="50"
                    y2="75"
                    stroke="hsl(var(--accent))"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}
