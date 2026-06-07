import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { common } from "@/lib/locale/fa";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea";
  defaultValue?: string;
}

interface ContentFormPageProps {
  title: string;
  description: string;
  fields: Field[];
}

export function ContentFormPage({ title, description, fields }: ContentFormPageProps) {
  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base">ویرایش محتوا</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form className="space-y-4">
            {fields.map((field) => (
              <FormField key={field.name} label={field.label}>
                {field.type === "textarea" ? (
                  <Textarea name={field.name} defaultValue={field.defaultValue} rows={4} />
                ) : (
                  <Input name={field.name} defaultValue={field.defaultValue} />
                )}
              </FormField>
            ))}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" className="w-full sm:w-auto">{common.save}</Button>
              <Button type="button" variant="outline" className="w-full sm:w-auto">{common.preview}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
