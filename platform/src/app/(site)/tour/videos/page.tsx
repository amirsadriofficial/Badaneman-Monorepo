import { videos } from "@/lib/mock-data";
import { Badge, Card, CardContent, SectionTitle } from "@/components/ui/card";

const sourceLabels: Record<string, { label: string; className: string }> = {
  youtube: { label: "یوتیوب", className: "bg-red-500/20 text-red-400" },
  aparat: { label: "آپارات", className: "bg-blue-500/20 text-blue-400" },
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle title="ویدیوهای باشگاه" subtitle="تور مجازی، معرفی مربیان و محتوای آموزشی" />

      <div className="grid gap-6 sm:grid-cols-2">
        {videos.map((video) => {
          const source = sourceLabels[video.source] ?? { label: video.source, className: "bg-muted text-muted-foreground" };
          return (
            <Card key={video.id}>
              <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground">
                ▶ ویدیو
              </div>
              <CardContent>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold">{video.title}</h3>
                  <Badge className={source.className}>{source.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
