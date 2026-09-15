"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Leaf, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function CurrentProjectsPage() {
  const { t } = useLanguage();

  const products = [
    {
      title: t.snacksTitle,
      description: t.snacksDescription,
      icon: Apple,
      categories: [t.vegetables, t.fruits],
    },
    {
      title: t.dehydratedProductsTitle,
      description: t.dehydratedProductsDescription,
      icon: Leaf,
      categories: [t.vegetables, t.spices, t.fruits],
    },
  ];

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        {t.currentProjectsIntro}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => {
          return (
            <Card key={product.title} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <product.icon className="h-6 w-6" />
                </div>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <span key={category} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                      <Sprout className="h-3 w-3" />
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
