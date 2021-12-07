import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

const ConfirmDialogPop = (props) => {

  const { confirmDialog, setConfirmDialog,maxWidth } = props;

  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>{confirmDialog.title}</Text>
      </Row>
      <Row>
        <Text>
          {confirmDialog.subTitle}
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
        <Grid>
          <Button 
            size="sm" 
            light
            onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          >
            No
          </Button>
        </Grid>
        <Grid>
          <Button 
           size="sm" 
           shadow 
           color="error"
           onClick={confirmDialog.onConfirm}
          >
            Yes
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
export default ConfirmDialogPop;