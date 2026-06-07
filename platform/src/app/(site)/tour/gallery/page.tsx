import { gallery } from "@/lib/mock-data";
import { Badge, Card, CardContent, SectionTitle } from "@/components/ui/card";

export default function GalleryPage() {
  const categories = [...new Set(gallery.map((g) => g.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="گالری تصاویر" subtitle="نگاهی به فضاها و امکانات باشگاه" />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Badge key={cat} className="bg-primary/10 text-primary">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-colors hover:border-primary/50">
            <div className="flex aspect-square items-center justify-center bg-muted text-muted-foreground">
              📷
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{item.title}</h3>
              <Badge className="mt-2 bg-muted text-muted-foreground">{item.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
