import React, { useState } from 'react';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const wrapStyle = {
  width: '100%',
  overflowX: 'auto',
  borderRadius: '14px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #e5e7eb',
  background: '#fff',
  fontFamily: FONT,
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.88rem',
  color: '#374151',
};

const thBase = {
  background: '#f0f9f4',
  color: '#2d6a4f',
  fontWeight: 700,
  fontSize: '0.78rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  padding: '0.8rem 1.1rem',
  borderBottom: '2px solid #d8f3dc',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  userSelect: 'none',
};

const tdStyle = {
  padding: '0.75rem 1.1rem',
  verticalAlign: 'middle',
};

/* ── Sortable header cell with hover ── */
function SortableTh({ col, sortKey, sortDir, onSort }) {
  const [hovered, setHovered] = useState(false);
  const isSorted = sortKey === col.key;
  const icon = isSorted ? (sortDir === 'asc' ? '\u25B2' : '\u25BC') : '\u25B2\u25BC';

  const style = {
    ...thBase,
    ...(col.sortable ? { cursor: 'pointer' } : {}),
    ...(col.sortable && hovered ? { background: '#d8f3dc' } : {}),
  };

  const iconStyle = {
    display: 'inline-block',
    marginLeft: '0.3rem',
    fontSize: '0.65rem',
    opacity: isSorted ? 1 : 0.5,
    color: isSorted ? '#2d6a4f' : 'inherit',
  };

  return (
    <th
      style={style}
      onClick={col.sortable ? () => onSort(col.key) : undefined}
      onMouseEnter={col.sortable ? () => setHovered(true)  : undefined}
      onMouseLeave={col.sortable ? () => setHovered(false) : undefined}
    >
      {col.label}
      {col.sortable && <span style={iconStyle}>{icon}</span>}
    </th>
  );
}

/* ── Data row with hover + striped support ── */
function DataRow({ row, columns, striped, index, isLast }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 1; // 0-indexed: rows 1,3,5… are "even"

  const rowStyle = {
    borderBottom: isLast ? 'none' : '1px solid #f0f0f0',
    background: hovered
      ? (striped && isEven ? '#f0f9f4' : '#f8fffe')
      : (striped && isEven ? '#f9fafb' : '#fff'),
    transition: 'background 0.1s',
  };

  return (
    <tr
      style={rowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {columns.map((col) => (
        <td key={col.key} style={tdStyle}>
          {col.render ? col.render(row[col.key], row) : row[col.key]}
        </td>
      ))}
    </tr>
  );
}

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

  return (
    <div style={wrapStyle} className={className}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((col) => (
              <SortableTh
                key={col.key}
                col={col}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#9ca3af', fontSize: '0.88rem' }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedRows.map((row, i) => (
              <DataRow
                key={row.id ?? i}
                row={row}
                columns={columns}
                striped={striped}
                index={i}
                isLast={i === sortedRows.length - 1}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
