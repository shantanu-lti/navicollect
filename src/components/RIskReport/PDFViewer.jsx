// import React, { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/pdf.worker.entry";
// import reymondReport from "../../assets/reports/REYNOLDS_SMITH_&_HILLS_INC__2024-02-22_11-30-38.pdf";

// const PDFViewer = () => {
//   const [numPages, setNumPages] = useState();
//   const [pageNumber, setPageNumber] = useState(1);
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }
//   return (
//     <div>
//       <Document file={reymondReport} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page height="600" pageNumber={pageNumber} />
//       </Document>
//     </div>
//   );
// };

// export default PDFViewer;
