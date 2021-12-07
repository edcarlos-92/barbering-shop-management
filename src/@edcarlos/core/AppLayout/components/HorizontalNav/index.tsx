import React from "react";
import HorizontalGroup from "./HorizontalGroup";
import HorizontalCollapse from "./HorizontalCollapse";
import HorizontalItem from "./HorizontalItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import routesConfig, { RouterConfigData, } from "modules/routesConfig";
import NavVerticalGroup from "../VerticalNav/VerticalNavGroup";
import VerticalCollapse from "../VerticalNav/VerticalCollapse";
import VerticalItem from "../VerticalNav/VerticalItem";

const HorizontalNav = () => {
  return (
    <List className="navbarNav" >
      {routesConfig.map((item: RouterConfigData) => (
        <React.Fragment key={item.id}>
          {item.type === "group" && <HorizontalGroup item={item} nestedLevel={0} />}

          {item.type === "collapse" && (<HorizontalCollapse item={item} nestedLevel={0} />)}

          {item.type === "item" && (<HorizontalItem item={item} nestedLevel={0} />)}

          {item.type === "divider" && <Divider sx={{ my: 5 }} />}
        </React.Fragment>
      ))}

      {/* Compare the two state and fix the issue */}


      {/*============= From Vertical============================== */}
      {/* {routesConfig.map((item: RouterConfigData) => (  
        <React.Fragment key={item.id}>
          {item.type === "group" && <NavVerticalGroup item={item} level={0} />}

          {item.type === "collapse" && (<VerticalCollapse item={item} level={0} />)}

          {item.type === "item" && <VerticalItem item={item} level={0} />}
        </React.Fragment>
      ))} */}
      {/*============= From Vertical============================== */}

    </List>
  );
};

export default HorizontalNav;
