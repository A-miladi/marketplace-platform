import { Spinner } from "@/components/ui";
import { FC, ReactNode } from "react";

type TableProps = {
  loading: boolean;
  columns: string[];
  children?: ReactNode;
};

const Table: FC<TableProps> = ({ columns, loading, children }) => {
  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-neutral-700 bg-opacity-50">
        <Spinner color="white" size="large" />
      </div>
    );
  }

  return (
    <table className="min-w-full table-auto text-left text-sm text-gray-400 rtl:text-right">
      <thead className="border border-neutral-400 bg-primary-900 text-xs text-gray-400">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-6 py-3 text-white">
              <p className="text-2xs flex w-24 items-center justify-center md:w-auto md:text-xs">
                {col}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full bg-primary-50">{children}</tbody>
    </table>
  );
};

export default Table;
