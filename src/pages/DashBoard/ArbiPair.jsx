import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
} from "react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ArbiPair = ({ data, loading, error }) => {
  const [topResults, setTopResults] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTopResults(data);
    }
  }, [data]); // Update topResults when data changes

  const columns = useMemo(
    () => [
      { Header: "Coin Pair", accessor: "pair" },
      { Header: "Coin 1", accessor: "coin1" },
      { Header: "Coin 2", accessor: "coin2" },
      { Header: "Exchange A", accessor: "minExchange" },
      { Header: "Coin 1 Price @ Exchange A", accessor: "minPrice1" },
      { Header: "Coin 2 Price @ Exchange A", accessor: "minPrice2" },
      { Header: "Exchange B", accessor: "maxExchange" },
      { Header: "Coin 1 Price @ Exchange B", accessor: "maxPrice1" },
      { Header: "Coin 2 Price @ Exchange B", accessor: "maxPrice2" },
      {
        Header: "Profit %",
        accessor: (row) =>
          row.profitPercentage ? `${Number(row.profitPercentage).toFixed(2)}%` : "0.00%",
        sortType: "number",
        sortDescFirst: true,
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: topResults, // Use updated state
      initialState: { sortBy: [{ id: "Profit %", desc: true }] },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = tableInstance;

  return (
    <div className="w-full">
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="rounded-md border">
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => {
              const { key, ...restProps } = headerGroup.getHeaderGroupProps();
              return (
                <TableRow key={key} {...restProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...headerProps } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <TableHead key={key} {...headerProps} className="font-bold">
                        {column.render("Header")}
                        {column.isSorted && (
                          <ChevronDown
                            className={`inline ml-1 h-4 w-4 ${column.isSortedDesc ? "transform rotate-180" : ""}`}
                          />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps();
                return (
                  <TableRow key={key} {...rowProps}>
                    {row.cells.map((cell) => {
                      const { key, ...cellProps } = cell.getCellProps();
                      return (
                        <TableCell key={key} {...cellProps}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <div>
          Page {pageIndex + 1} of {pageCount}
        </div>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>

      {/* Set Page Size */}
      <div className="mt-4">
        <span>Show: </span>
        <select
          value={rows.length} // Fix: Using rows.length instead of pageCount
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ArbiPair;
