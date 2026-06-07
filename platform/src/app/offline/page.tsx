import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardContent>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
            📡
          </div>
          <h1 className="text-2xl font-bold">اتصال اینترنت برقرار نیست</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            در حال حاضر به اینترنت دسترسی ندارید. لطفاً اتصال خود را بررسی کنید و دوباره تلاش کنید.
          </p>
          <div className="mt-6">
            <LinkButton href="/">تلاش مجدد</LinkButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
