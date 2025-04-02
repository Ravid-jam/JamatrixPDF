"use client";
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  logoParent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  logo: {
    width: "150px",
    height: "90px",
    objectFit: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },

  col: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },

  row: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    gap: 6,
  },

  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5px",
    marginRight: "5px",
  },
  bold: {
    fontWeight: "bold",
  },

  normal: {
    fontSize: 12,
    fontWeight: "bold",
  },
  firstTableColHeaderStyle: {
    width: "45%",
    // borderWidth: 1,
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
    borderRight: "1px",
    borderRightColor: "#65badf",
  },
  tableRowStyle: {
    flexDirection: "row",
  },
  firstTableColStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
    borderTopWidth: 0,
    borderRight: "1px",
    borderRightColor: "#65badf",
  },
  tableColHeaderStyle: {
    width: "45%",
    borderStyle: "solid",
    borderColor: "#000",
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
  invoiceDate: {
    fontSize: 12,
    fontWeight: "bold",
  },
  total: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 20,
  },
});

const createTableHeader = () => {
  return (
    <View style={styles.tableRowStyle} fixed>
      <View style={styles.firstTableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Description</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>QTY</Text>
      </View>

      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Unit Price (₹)</Text>
      </View>
      <View style={styles.tableColHeaderStyle}>
        <Text style={styles.tableCellHeaderStyle}>Sub Total (₹)</Text>
      </View>
    </View>
  );
};

const createTableRow = (data: any) => {
  const minRows = 5;
  const totalRows = Math.max(
    data?.items?.length,
    minRows + data?.items?.length
  );

  const allRows = Array.from({ length: totalRows }).map((_, index) => {
    const item = data?.items[index];

    return (
      <View key={index} style={styles.tableRowStyle}>
        <View style={styles.firstTableColStyle}>
          <Text style={styles.tableCellStyle}>
            {item ? item?.description : ""}
          </Text>
        </View>
        <View style={styles.tableColStyle}>
          <Text style={styles.tableCellStyle}>
            {item ? item?.quantity : ""}
          </Text>
        </View>
        <View style={styles.tableColStyle}>
          <Text style={styles.tableCellStyle}>
            {item ? `₹ ${item?.price}` : ""}
          </Text>
        </View>
        <View style={styles.tableColStyle}>
          <Text style={styles.tableCellStyle}>
            {item ? `₹ ${item?.quantity * item?.price}` : ""}
          </Text>
        </View>
      </View>
    );
  });

  return allRows;
};

const InvoiceSlip = ({ data, isopen }: { data: any; isopen?: boolean }) => {
  const subTotal =
    data?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0
    ) || 0;

  const taxRate = (data?.tax ?? 0) / 100;
  const taxAmount = subTotal * taxRate;

  const total = subTotal + taxAmount;
  const currentDate = moment().format("DD-MM-YYYY");

  console.log({ subTotal, taxRate, taxAmount, total });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data?.isView ? (
          <View style={styles.logoParent}>
            <Image style={styles.logo} src="/assets/logo.png" />
          </View>
        ) : null}
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={tableStyle as any}>
          <View style={styles.section}>
            <View>
              <Text style={styles.title2}>From</Text>

              <Text style={styles.title2}>{data?.companyNameFrom}</Text>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text
                    style={{
                      width: "180px",
                      lineHeight: 1,
                    }}
                  >
                    {data?.addressfrom}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.title2}>To</Text>
              <Text style={styles.title2}>{data?.companyNameTo}</Text>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text
                    style={{
                      width: "180px",
                      lineHeight: 1,
                    }}
                  >
                    {data?.addressTo}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Text style={styles.invoiceDate}>Invoice Date:&nbsp;</Text>
            <Text>{currentDate}</Text>
          </View>
          <View
            style={{
              borderTop: "1px solid #65badf",
              borderBottom: "1px solid #65badf",
              borderLeft: "1px solid #65badf",
            }}
          >
            {createTableHeader()}
            {createTableRow(data)}
          </View>
          <View style={styles.total}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 50,
              }}
            >
              <Text style={styles.title2}>Sub Total</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                {subTotal?.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 80,
              }}
            >
              <Text style={styles.title2}>Tax</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                {taxAmount?.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 80,
                borderTopWidth: 1,
                paddingTop: "10px",
              }}
            >
              <Text style={styles.title2}>Total</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                ₹ {total?.toFixed(2)}
              </Text>
            </View>
          </View>
          {data?.isView ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              <Image
                src={"/assets/Stamp.png"}
                style={{ objectFit: "contain", height: "150px" }}
              />
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceSlip;
