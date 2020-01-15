import React from "react";

import theme from "./theme";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";

import { Box, Grommet, Button, Heading } from "grommet";
import { Notification } from "grommet-icons";

const Application = () => (
  <>
    <Grommet full theme={theme}>
      <Box fill>
        <Header>
          <Heading level="3" margin="none">
            Application
          </Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </Header>

        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            App Body
          </Box>
          <Sidebar />
        </Box>
      </Box>
    </Grommet>
  </>
);

export default Application;
