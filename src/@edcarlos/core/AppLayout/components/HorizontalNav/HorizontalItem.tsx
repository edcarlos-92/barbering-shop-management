import React, { useMemo } from "react";
import { Icon, ListItem, ListItemText } from "@mui/material";
import clsx from "clsx";
import IntlMessages from "../../../../utility/IntlMessages";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { RouterConfigData } from "../../../../../modules/routesConfig";
import { useSidebarContext } from "../../../../utility/AppContextProvider/SidebarContextProvider";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuthUser } from "@edcarlos/utility/AuthHooks";
import { checkPermission } from "@edcarlos/utility/helper/RouteHelper";


interface HorizontalItemProps {
  item: RouterConfigData;
  nestedLevel?: number;
  dense?: boolean;
}

const HorizontalItem: React.FC<HorizontalItemProps> = (props) => {
  const { item, dense } = props;

  const location = useRouter();
  const active = isUrlInChildren(item, location.pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } =
    useSidebarContext();

  function isUrlInChildren(parent: RouterConfigData, url: string) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (
        parent.children[i].url === url ||
        url.includes(parent!.children![i].url!)
      ) {
        return true;
      }
    }

    return false;
  }

  const router = useRouter();



  //============User Auth Fixing==============
  //import { useAuthUser } from "@edcarlos/utility/AuthHooks";
  //import { checkPermission } from "@edcarlos/utility/helper/RouteHelper";
  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item!.permittedRole, user.user_role),
    [item!.permittedRole, user.user_role]
  );
  if (!hasPermission) {
    return null;
  }
  //==========User Auth Fixing================





  return (
    <Link href={item.url!} as={item.as}>
      <ListItem
        className={clsx("navItemSubmenu", dense && "dense", {
          active: item.url === router.pathname,
        })}
        sx={{
          cursor: 'pointer',
          minHeight: 30,
          //fontSize: 12,
          //padding: "2px 12px",
          marginTop: '1em',
          color: (theme) => theme.palette.text.primary,
          textDecoration: "none!important",
          //minWidth: 160,
          "&.active": {
            //backgroundColor: sidebarMenuSelectedBgColor,
            color: sidebarMenuSelectedTextColor + "!important",
            borderRadius: '4px',
            pointerEvents: "none",
            "& .list-item-text-primary": {
              color: "inherit",
            },
            "& .list-item-icon": {
              color: "inherit",
            },
          },
          "& .list-item-text": {
            padding: "0 0 0 16px",
          },
          "&.dense": {
            padding: "4px 12px",
            minHeight: 40,
            "& .list-item-text": {
              padding: "0 0 0 8px",
            },
          },
        }}
      >
        {item.icon && (
          <Icon
            sx={{
              color: active ? sidebarMenuSelectedTextColor : "action",
              mr: 1,
              //fontSize: { xs: 16, xl: 18 },
              fontSize: { xs: 10, xl: 12 },
            }}
          >
            {item.icon}
          </Icon>
        )}
        <ListItemText
          className="AppNavLinkTextSubmenu"
          primary={<IntlMessages id={item.messageId} />}
        />
        {item.count && (
          <Box ml={4}>
            <Badge
              badgeContent={item.count}
              sx={{
                color: item.color,
              }}
            />
          </Box>
        )}
      </ListItem>
    </Link>
  );
};

export default HorizontalItem;
