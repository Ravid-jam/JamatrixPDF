"use client";
import { calculatePercentage } from "@/components/utils/utils";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

const tableStyle = {
  display: "table",
};

const styles = StyleSheet.create({
  page: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  logoParent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
  },
  logo: {
    width: "170px",
    height: "100px",
    objectFit: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0991cc",
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
    gap: 6,
  },

  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 20,
  },

  bold: {
    fontWeight: "bold",
  },

  normal: {
    fontSize: 12,
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
});

const createTableHeader = (data: any) => {
  return (
    <View
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        gap: 20,
        backgroundColor: "#0991cc",
        color: "white",
        overflow: "hidden",
      }}
      fixed
    >
      <View
        style={{
          width: "10%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        ></Text>
      </View>
      <View
        style={{
          width: "30%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Item
        </Text>
      </View>

      <View
        style={{
          width: "20%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Quantity
        </Text>
      </View>

      <View
        style={{
          width: "25%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Rate ({data?.currency})
        </Text>
      </View>
      <View
        style={{
          width: "25%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          Amount ({data?.currency})
        </Text>
      </View>
    </View>
  );
};

const createTableRow = (data: any) => {
  return data?.items?.map((item: any, index: number) => (
    <View
      key={index}
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        gap: 20,

        overflow: "hidden",
        border: "0px",
      }}
    >
      <View
        style={{
          width: "10%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          {index + 1}.
        </Text>
      </View>
      <View
        style={{
          width: "30%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          {item.description}
        </Text>
      </View>
      <View
        style={{
          width: "20%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >
          {item.quantity}
        </Text>
      </View>
      <View
        style={{
          width: "25%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >{`${data.currency} ${item.price}`}</Text>
      </View>
      <View
        style={{
          width: "25%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Roboto",
          }}
        >{`${data.currency} ${item.quantity * item.price}`}</Text>
      </View>
    </View>
  ));
};

const InvoiceSlip = ({ data }: { data: any }) => {
  const currentDate = moment().format("MMM D, YYYY");

  const subTotal =
    data?.items?.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0
    ) || 0;

  const taxRate = (data?.tax ?? 0) / 100;
  const taxAdd = data?.tax;
  const taxAmount =
    data?.taxCaculateOption === "Percentage" ? subTotal * taxRate : taxAdd;

  const total = Number(subTotal) + Number(taxAmount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Text style={styles.title}>Invoice</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  Invoice No #
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  {data?.invoiceNumber}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  Invoice Date
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  {currentDate}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {data?.isView ? (
              <View style={styles.logoParent}>
                <Image style={styles.logo} src="/assets/logo.png" />
              </View>
            ) : null}
          </View>
        </View>
        <View style={tableStyle as any}>
          <View style={styles.section}>
            <View
              style={{
                backgroundColor: "rgb(239 234 248)",
                padding: "15px",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingBottom: 10,
                  color: "#0991cc",
                }}
              >
                Billed By
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  marginBottom: 10,
                  maxWidth: "230px",
                }}
              >
                {data?.companyNameFrom}
              </Text>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text
                    style={{
                      width: "230px",
                      lineHeight: 1.5,
                      fontSize: 12,
                    }}
                  >
                    {data?.addressfrom}
                  </Text>
                </View>
              </View>
              {data?.emailfrom ? (
                <View style={styles.row}>
                  <View style={styles.col}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 3,
                        marginTop: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Email:
                      </Text>
                      <Text
                        style={{
                          width: "200px",
                          fontSize: 12,
                        }}
                      >
                        &nbsp;{data?.emailfrom ? data?.emailfrom : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
              {data?.phonefrom ? (
                <View style={styles.row}>
                  <View style={styles.col}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 20,
                        marginTop: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        Contact No:
                      </Text>
                      <Text
                        style={{
                          width: "230px",
                          fontSize: 12,
                        }}
                      >
                        {data?.phonefrom ? data?.phonefrom : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
            <View>
              <View
                style={{
                  backgroundColor: "rgb(239 234 248)",
                  padding: "15px",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    paddingBottom: 10,
                    color: "#0991cc",
                  }}
                >
                  Billed To
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 10,
                    maxWidth: "230px",
                  }}
                >
                  {data?.companyNameTo}
                </Text>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Text
                      style={{
                        width: "230px",
                        lineHeight: 1.5,
                        fontSize: 12,
                      }}
                    >
                      {data?.addressTo}
                    </Text>
                  </View>
                </View>
                {data?.emailTo ? (
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 3,
                          marginTop: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          Email:
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                          }}
                        >
                          &nbsp;{data?.emailTo ? data?.emailTo : ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
                {data?.phoneTo ? (
                  <View style={styles.row}>
                    <View style={styles.col}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 20,
                          marginTop: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            marginBottom: 10,
                          }}
                        >
                          Contact No:
                        </Text>
                        <Text
                          style={{
                            width: "230px",
                            fontSize: 12,
                          }}
                        >
                          {data?.phoneTo ? data?.phoneTo : ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #efeaf8",
            }}
          >
            {createTableHeader(data)}
            <View
              style={{
                backgroundColor: "rgb(239 234 248)",
              }}
            >
              {createTableRow(data)}
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              {data.accountHolderName ||
              data.accountNumber ||
              data.ifscCode ||
              data.swiftCode ||
              data.bankName ? (
                <View
                  style={{
                    backgroundColor: "rgb(239 234 248)",
                    padding: "15px",
                    borderRadius: 5,
                    width: "300px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      paddingBottom: 10,
                      color: "#0991cc",
                    }}
                  >
                    Bank Details
                  </Text>
                  {data?.accountHolderName && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                          maxWidth: "400px",
                        }}
                      >
                        Account Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 10,
                          maxWidth: "120px",
                        }}
                      >
                        {data?.accountHolderName}
                      </Text>
                    </View>
                  )}
                  {data?.accountNumber && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        Account Number
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 10,
                        }}
                      >
                        {data?.accountNumber}
                      </Text>
                    </View>
                  )}
                  {data?.ifscCode && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                          maxWidth: "250px",
                        }}
                      >
                        IFSC Code
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 10,
                          maxWidth: "120px",
                        }}
                      >
                        {data?.ifscCode}
                      </Text>
                    </View>
                  )}

                  {data?.swiftCode && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                          maxWidth: "250px",
                        }}
                      >
                        SWIFT Code
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 10,
                          maxWidth: "120px",
                        }}
                      >
                        {data?.swiftCode}
                      </Text>
                    </View>
                  )}
                  {data?.bankName && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 20,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          marginBottom: 10,
                          maxWidth: "250px",
                        }}
                      >
                        Bank Name
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginBottom: 10,
                          maxWidth: "120px",
                        }}
                      >
                        {data?.bankName}
                      </Text>
                    </View>
                  )}
                </View>
              ) : null}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <View>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
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
                    {data.currency}&nbsp;
                    {subTotal}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 50,
                  }}
                >
                  <Text style={styles.title2}>
                    Tax (
                    {data.taxCaculateOption === "Percentage"
                      ? `${data.tax}%`
                      : `${calculatePercentage(
                          Number(subTotal),
                          Number(taxAdd)
                        )}`}
                    )
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                  >
                    {data.currency}&nbsp;
                    {taxAmount}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTopWidth: 1,
                    paddingTop: "10px",
                    gap: 50,
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
                    {data?.currency} {total}
                  </Text>
                </View>
              </View>

              {data?.isView ? (
                <View
                  style={{
                    display: "flex",
                    marginTop: 4,
                  }}
                >
                  <Image
                    src={"/assets/Stamp1.png"}
                    style={{ objectFit: "contain", height: "100px" }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceSlip;
