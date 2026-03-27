import React, { useState } from 'react';
import './table.css';

/**
 * Table
 * @param {Array}   columns   [{ key, label, sortable?, render? }]
 * @param {Array}   rows      array of data objects
 * @param {boolean} striped   alternate row shading (default: true)
 * @param {string}  emptyText shown when rows is empty (default: 'No data')
 * @param {string}  className extra class names for the wrapper
 */
export default function Table({
  columns = [],
  rows = [],
  striped = true,
  emptyText = 'No data to display.',
  className = '',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sortedRows = React.useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir]);

  const tableClass = ['table', striped ? 'table--striped' : ''].filter(Boolean).join(' ');

  return (
    <div className={`table-wrap ${className}`}>
      <table className={tableClass}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              const icon = isSorted
                ? sortDir === 'asc' ? '\u25B2' : '\u25BC'
                : '\u25B2\u25BC';
              return (
                <th
                  key={col.key}
                  className={col.sortable ? 'table__th--sortable' : ''}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && (
                    <span
                      className={`table__sort-icon${
                        isSorted ? ` table__sort-icon--${sortDir}` : ''
                      }`}
                    >
                      {icon}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table__empty">
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedRows.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
