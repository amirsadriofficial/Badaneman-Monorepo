import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { common } from "@/lib/locale/fa";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  emptyMessage = common.empty,
}: DataTableProps<T>) {
  return (
    <Card>
      {title && (
        <CardHeader className="px-4 py-3 sm:px-6 sm:py-4">
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "px-0 pb-0 pt-0 sm:px-6 sm:pb-6" : "p-0 sm:p-6"}>
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500">{emptyMessage}</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  {columns.map((col) => (
                    <TH
                      key={col.key}
                      className={col.hideOnMobile ? "hidden sm:table-cell" : undefined}
                    >
                      {col.header}
                    </TH>
                  ))}
                </TR>
              </THead>
              <TBody>
                {data.map((row) => (
                  <TR key={row.id}>
                    {columns.map((col) => (
                      <TD
                        key={col.key}
                        className={col.hideOnMobile ? "hidden sm:table-cell" : undefined}
                      >
                        {col.render(row)}
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatusBadge };
