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
import { numberToWords } from "./utils/utils";

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
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "white",
  },
  header: {
    borderBottom: 1,
    paddingBottom: 15,
    width: "100%",
  },
  logoParent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 210,
    // marginBottom:,
  },
  logo: {
    width: "150px",
    height: "90px",
    objectFit: "contain",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
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
    flex: 1,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 13,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
  buttonTitle: {
    fontSize: 14,
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

  const start = moment(startDate, "DD-MM-YYYY").format("DD MMMM YYYY");
  const end = moment(endDate, "DD-MM-YYYY").format("DD MMMM YYYY");

  return `${start} - ${end}`;
};

const getFormattedMonth = (startDate: any, endDate: any) => {
  if (!startDate || !endDate) return "";

  const start = moment(startDate, "DD-MM-YYYY");
  const end = moment(endDate, "DD-MM-YYYY");

  // Check if start and end are in the same month and year
  if (start.isSame(end, "month") && start.isSame(end, "year")) {
    return start.format("MMMM YYYY"); // Example: "April 2025"
  }

  return `${start.format("DD MMMM YYYY")} - ${end.format("DD MMMM YYYY")}`;
};

const SalarySlipPdf = ({ data }: { data: any }) => (
  <Document>
    <Page size={{ width: "595.28px", height: 650 }} style={styles.page}>
      <View
        style={{
          border: "1px solid black",
          margin: 10,
          padding: 10,
        }}
      >
        <View style={styles.logoParent}>
          <View>
            <Image style={styles.logo} src="/assets/logo.png" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Jamatrix Innovations LLP
            </Text>
            <Text
              style={{
                maxWidth: "200px",
              }}
            >
              407 Shivalik, Dabholi-BRTS road, Katargam, Surat, Gujarat 395004.
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>
            Pay Slip for the Month of{" "}
            {getFormattedMonth(data.startDate, data.endDate)}
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
                <Text>{data?.employeeId ? data?.employeeId : "-"}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.bold}>Working day:</Text>
                <Text>{data?.workingDay ? data?.workingDay : "-"}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.bold}>Joining Date:</Text>
                <Text>{data?.joiningDate ? data?.joiningDate : "-"}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.bold}>Bank Name:</Text>
                <Text>{data?.bankName ? data?.bankName : "-"}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.bold}>Designation:</Text>
                <Text>{data?.designation ? data?.designation : "-"}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.bold}>Account No:</Text>
                <Text>{data?.acountNo ? data?.acountNo : "-"}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.bold}>Department:</Text>
                <Text>{data?.department ? data?.department : "-"}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.bold}>Location:</Text>
                <Text>{data?.location ? data?.location : "-"}</Text>
              </View>
            </View>
          </View>
          <View>
            {createTableHeader()}
            {createTableRow(data)}
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>
              Net Pay:&nbsp;&nbsp;
              <Text style={{ fontWeight: 900 }}>
                ₹&nbsp;{data.salary ? data.salary : "0"}
              </Text>
            </Text>
            <Text style={styles.buttonTitle}>
              In Words:&nbsp;&nbsp;
              <Text
                style={{
                  fontWeight: 900,
                  maxWidth: "120px",
                }}
              >
                {data.salary ? numberToWords(data.salary) : "-"}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            textAlign: "center",
            fontFamily: "Roboto",
          }}
        >
          **This is a computer-generated salary slip and does not require a
          signature**
        </Text>
      </View>
    </Page>
  </Document>
);

export default SalarySlipPdf;
