import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Mock from "./mock-data.json";
import "ag-grid-enterprise";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { field: "agency", enableRowGroup: true },
        { field: "patientID", minWidth: 180 },
        { field: "branch",enableRowGroup: true  },
        { field: "detail1" },
        { field: "detail2" },
        { field: "detail3" },
        { field: "detail4" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      suppressDragLeaveHidesColumns: true,
      suppressMakeColumnVisibleAfterUnGroup: true,
      rowGroupPanelShow: "always",
      rowData: Mock,
    };
  }

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{ height: "1000px", width: "1000px" }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
