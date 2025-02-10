import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ArbiTrack = ({ data = [], loading, error }) => {
  const columns = useMemo(
    () => [
      { Header: "Coin", accessor: "coin1" },
      { Header: "Exchange A", accessor: "minExchange" },
      { Header: "Coin Price @ Exchange A", accessor: "minPrice1" },
      { Header: "Exchange B", accessor: "maxExchange" },
      { Header: "Coin Price @ Exchange B", accessor: "maxPrice1" },
      {
        Header: "Profit %",
        accessor: (row) => `${Number(row.profitPercentage || 0).toFixed(2)}%`,
      },
    ],
    []
  );

  return (
    <div className="w-full">
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.Header} className="font-bold">
                  {column.Header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIdx) => (
                <TableRow key={row.coin1 || `row-${rowIdx}`}>
                  {columns.map((column) => (
                    <TableCell key={column.Header}>
                      {typeof column.accessor === "function"
                        ? column.accessor(row)
                        : row[column.accessor] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {loading ? "Loading data..." : "No results available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ArbiTrack;
