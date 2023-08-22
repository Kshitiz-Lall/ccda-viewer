import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./CCDAViewer.css";
import FileUploader from "./FileUploader";

const CCDACard = ({ title, dataList, isOpenAll }) => {
  const [open, setOpen] = useState(isOpenAll);

  const toggleTable = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(isOpenAll);
  }, [isOpenAll]);

  // Helper function to render table rows based on data structure
  const renderTableRows = (dataList) => {
    if (!dataList || dataList.length === 0) {
      // If dataList is undefined or empty, display a single row with "None Recorded"
      return (
        <TableRow className="tablerow">
          <TableCell colSpan={1}>None Recorded</TableCell>
        </TableRow>
      );
    } else {
      // If there is data, render the rows as before
      return dataList.map((data, i) => {
        const keys = Object.keys(data);
        return (
          <TableRow key={i} className="tablerow">
            {keys.map((key) => (
              <TableCell key={key} className="MuiTableCell-root">
                {data[key] === "none_recorded" ? "None Recorded" : data[key]}
              </TableCell>
            ))}
          </TableRow>
        );
      });
    }
  };

  return (
    <div className="ccda-card">
      <Button
        onClick={toggleTable}
        style={{ display: "flex", alignItems: "center" }}
      >
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {title.replace(/_/g, " ")}
      </Button>
      {open && (
        <TableContainer component={Paper}>
          <Table size="small" dense>
            <TableHead>
              <TableRow>
                {dataList.length > 0 &&
                  Object.keys(dataList[0]).map((key) => (
                    <TableCell key={key} className="MuiTableCell-root">
                      {key.replace(/_/g, " ")}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows(dataList)}</TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const CCDAViewer = ({ dataList }) => {
  const [isOpenAll, setIsOpenAll] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  const toggleAll = () => {
    setIsOpenAll(!isOpenAll);
  };

  return (
    <>
      <div>
        {!showUploader && (
          <Button onClick={toggleAll}>
            {isOpenAll ? "Collapse All" : "Expand All"}
          </Button>
        )}
      </div>
      <div className="ccda-viewer">
        {showUploader ? (
          <FileUploader />
        ) : (
          Object.keys(dataList).map((sectionKey, index) => (
            <CCDACard
              key={index}
              title={sectionKey}
              dataList={dataList[sectionKey][sectionKey] || []}
              isOpenAll={isOpenAll}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CCDAViewer;
