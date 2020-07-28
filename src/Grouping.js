import React from 'react'

import { useTable, useGroupBy, useExpanded } from 'react-table'

import makeData from './mock-data.json'


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { groupBy, expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useGroupBy,
    useExpanded // useGroupBy would be pretty useless without useExpanded ;)
  )

  // We don't want to render all of the rows for this example, so cap
  // it at 100 for this use case
  const firstPageRows = rows.slice(0, 100)

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify({ groupBy, expanded }, null, 2)}</code>
      </pre> */}
      {/* <Legend /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '✔ ' : '👊'}
                    </span>
                  ) : null}
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      // For educational purposes, let's color the
                      // cell depending on what type it is given
                      // from the useGroupBy hook
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? '#0aff0082'
                          : cell.isAggregated
                          ? '#ffa50078'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                      }}
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 100 results of {rows.length} rows</div>
    </>
  )
}

// function Legend() {
//   return (
//     <div
//       style={{
//         padding: '0.5rem 0',
//       }}
//     >
//       <span
//         style={{
//           display: 'inline-block',
//           background: '#0aff0082',
//           padding: '0.5rem',
//         }}
//       >
//         Grouped
//       </span>{' '}
//       <span
//         style={{
//           display: 'inline-block',
//           background: '#ffa50078',
//           padding: '0.5rem',
//         }}
//       >
//         Aggregated
//       </span>{' '}
//       <span
//         style={{
//           display: 'inline-block',
//           background: '#ff000042',
//           padding: '0.5rem',
//         }}
//       >
//         Repeated Value
//       </span>
//     </div>
//   )
// }

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
// function roundedMedian(leafValues) {
//   let min = leafValues[0] || 0
//   let max = leafValues[0] || 0

//   leafValues.forEach(value => {
//     min = Math.min(min, value)
//     max = Math.max(max, value)
//   })

//   return Math.round((min + max) / 2)
// }

function Grouping() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Agency',
        columns: [
            {
                Header: 'Agency',
                accessor: 'agency',
                // Use a two-stage aggregator here to first
                // count the total rows being aggregated,
                // then sum any of those counts if they are
                // aggregated further
                // aggregate: 'count',
                // Aggregated: ({ value }) => `${value} Names`,
              },
              {
                Header: 'Patient ID',
                accessor: 'patientID',
                // Use another two-stage aggregator here to
                // first count the UNIQUE values from the rows
                // being aggregated, then sum those counts if
                // they are aggregated further
                // aggregate: 'uniqueCount',
                // Aggregated: ({ value }) => `${value} Unique Names`,
              },
          {
            Header: 'Branch',
            accessor: 'branch',
            // Aggregate the average age of visitors
            // aggregate: 'average',
            // Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
          },
        ],
      },

      {
          Header:'Details',
          columns:[
            {
                Header: 'Details',
                accessor: 'detail1',
                // Aggregate the sum of all visits
                // aggregate: 'sum',
                // Aggregated: ({ value }) => `${value} (total)`,
              },
              {
                Header: 'Details',
                accessor: 'detail2',
              },
              {
                Header: 'Details',
                accessor: 'detail3',
                // Use our custom roundedMedian aggregator
                // aggregate: roundedMedian,
                // Aggregated: ({ value }) => `${value} (med)`,
              },
              {
                Header: 'Details',
                accessor: 'detail4',
                // Use our custom roundedMedian aggregator
                // aggregate: roundedMedian,
                // Aggregated: ({ value }) => `${value} (med)`,
              },
          ]
      }
    ],
    []
  )

  

  return (
    // <Styles>
      <Table columns={columns} data={makeData} />
    // </Styles>
  )
}

export default Grouping
