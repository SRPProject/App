import { Button, Dialog, Drawer } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const Popup = ({
  open,
  data,
  setOpen,
}: {
  open: boolean;
  data: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Dialog fullScreen fullWidth open={open} onClose={() => setOpen(false)}>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
          
      </Dialog>
    </div>
  );
};

export default Popup;
