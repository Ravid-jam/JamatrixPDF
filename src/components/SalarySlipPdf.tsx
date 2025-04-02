import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

const tableStyle = {
  display: "table",
  width: "auto",
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: 1,
    paddingBottom: 15,
  },
  logoParent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: "200px",
    height: "90px",
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
    paddingBottom: 5,
    marginTop: 15,
  },
  col: {
    flex: 1, // Ensures equal spacing
    paddingRight: 10, // Adds some spacing for clarity
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },

  firstTableColHeaderStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    backgroundColor: "#0991cc",
    color: "#fff",
  },
  tableCellHeaderStyle: {
    fontFamily: "Roboto",
    textAlign: "center",
    margin: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  tableColStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableRowStyle: {
    flexDirection: "row",
  },
  firstTableColStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  tableColHeaderStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: "#0991cc",
    color: "#fff",
  },
  tableCellStyle: {
    fontFamily: "Roboto",
    textAlign: "center",
    margin: 5,
    fontSize: 13,
    fontWeight: "bold",
  },
  button: {
    fontFamily: "Roboto",
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const createTableHeader = () => {
  return (
    <View style={styles.tableRowStyle} fixed>
      <View style={styles.firstTableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Description</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Earnings (₹)</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Deductions (₹)</Text>
      </View>
    </View>
  );
};

const createTableRow = (data: any) => {
  return (
    <View style={styles.tableRowStyle}>
      <View style={styles.firstTableColStyle}>
        <Text style={styles.tableCellStyle}>Basic Salary</Text>
        <Text style={styles.tableCellStyle}>Provident Fund (PF)</Text>

        <Text style={styles.tableCellStyle}>Other Deductions</Text>
        <Text style={styles.tableCellStyle}>Total</Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>
          ₹ {data.salary ? data.salary : "0"}
        </Text>
        <Text style={styles.tableCellStyle}>-</Text>
        <Text style={styles.tableCellStyle}>-</Text>
        <Text style={styles.tableCellStyle}>
          ₹ {data.salary ? data.salary : "0"}
        </Text>
      </View>

      <View style={styles.tableColStyle}>
        <Text style={styles.tableCellStyle}>-</Text>
        <Text style={styles.tableCellStyle}>-</Text>
        <Text style={styles.tableCellStyle}>-</Text>
        <Text style={styles.tableCellStyle}>-</Text>
      </View>
    </View>
  );
};

const getFormattedDateRange = (startDate: any, endDate: any) => {
  if (!startDate || !endDate) return "";
  const start = moment(startDate, "DD-MM-YYYY").format("MMMM D");
  const end = moment(endDate, "DD-MM-YYYY").format("MMMM D, YYYY");

  return `${start} - ${end}`;
};
const SalarySlipPdf = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logoParent}>
        <Image style={styles.logo} src="/assets/logo.png" />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Salary Slip</Text>
        <Text style={styles.title2}>
          Date: {moment(data.date).format("DD MMMM YYYY")}
        </Text>
      </View>
      <View style={tableStyle as any}>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Employee Name:</Text>
              <Text>{data.fullName ? data.fullName : "-"}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Pay Period:</Text>
              <Text>
                {data.startDate
                  ? getFormattedDateRange(
                      JSON.stringify(data.startDate),
                      JSON.stringify(data.endDate)
                    )
                  : "-"}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Employee ID:</Text>
              <Text>-</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Bank Name:</Text>
              <Text>-</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Department:</Text>
              <Text>IT</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Account No:</Text>
              <Text>-</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Designation:</Text>
              <Text>Software Engineer</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>PF No:</Text>
              <Text>-</Text>
            </View>
          </View>
        </View>
        <View>
          {createTableHeader()}
          {createTableRow(data)}
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Net Payable Salary:
            <Text style={{ fontWeight: 900 }}>
              ₹{data.salary ? data.salary : "0"}
            </Text>
          </Text>
        </View>
        <View style={styles.button}>
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              marginTop: 10,
              fontFamily: "Roboto",
            }}
          >
            **This is a computer-generated salary slip and does not require a
            signature**
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default SalarySlipPdf;
