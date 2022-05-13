import jsPDF from "jspdf";
import "jspdf-autotable";
import date from "date-and-time"
import font from "./OpenFont"

const Pdf = (headCell, data, title) => {
  const doc = jsPDF();
  //DATA MANIPULATION FOR HEADER NAMES
  const tableColumns = Array.from({ length: headCell.length }, (e) => (e = {}));

  const tableRows = Array.from({ length: data.length }, (e) => (e = {}));
  const tempData = JSON.parse(JSON.stringify(data));
  // const totalData = JSON.parse(JSON.stringify(total));
  headCell.forEach((e, index0) => {
    //check util columns
    if (e.dontReport == null && !e.dontReport) {
      tableColumns[index0]["header"] = e.label;
      tableColumns[index0]["dataKey"] = e.id;
    }
  });
  //for date, extract time special
  // for (let i = 0; i < tempData.length; i++) {
  //  if(tempData && tempData[i].amount) {

  //  }
  // }
  ///CUSTOM FONT
  doc.addFileToVFS("OpenSans.ttf", font);
  doc.addFont("OpenSans.ttf", "OpenSans", "normal");
  doc.setFont("OpenSans");
  // we use a date string to generate our filename.
  doc.text(title ?? "Powerşarj", 14, 25);
  // doc.text("Şarj İşlemleri", 14, 15);
  const newDate = date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
  doc.text(newDate ?? "", 140, 15);

  doc.autoTable({
    columns: [...tableColumns],
    body:[...tempData],
    startY: 30,
    styles: {
      font: "OpenSans",
      fontStyle: "normal",
    },
  });


  // we define the name of our PDF file.
  doc.save(`${title}   ${date.format(new Date(),"YYYY-MM-DD")}.pdf`);
};
export default Pdf;
