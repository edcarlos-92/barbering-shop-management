import { BiAlignLeft } from 'react-icons/bi';
import { ReactNode } from 'react';
import { appInformation, RoutePermittedRole } from 'shared/constants/AppConst';
import {
  MdOutlineManageAccounts, MdOutlinePeopleAlt, MdOutlinePolicy, MdOutlineAutoGraph, MdDashboard,
  MdVpnKey, MdPayment, MdAddchart, MdAttachMoney, MdPayments, MdOutlineHistoryToggleOff, MdContacts,
  MdStyle, MdPointOfSale, MdTextsms, MdOutlineMoneyOff, MdRemoveRedEye, MdEdit, MdSettings,
  MdThermostat, MdDoorBack, MdDoorFront, MdBookOnline, MdBarChart, MdDoorbell, MdEmail, MdAlarm, MdOutlineEmail, MdDownload, MdDoubleArrow, MdPieChart
} from 'react-icons/md';
import { GrDatabase } from 'react-icons/gr';


export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole[];
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  as?: string;
}


const { appDir, appName } = appInformation;

const routesConfig: RouterConfigData[] = [
  {
    id: 'barbershop',
    title: 'Barbering Shops',
    messageId: 'sidebar.barberingshops',
    type: 'group',
    permittedRole: [RoutePermittedRole.Developer, RoutePermittedRole.Admin, RoutePermittedRole.User],
    children: [
      {
        id: 'customerreg',
        title: 'Customer Registration',
        messageId: 'sidebar.customerreg',
        type: 'item',
        icon: <MdContacts />,
        url: '/barber/customerreg',
      },

      {
        id: 'prodservices',
        title: 'Product Services',
        messageId: 'sidebar.prodservices',
        type: 'item',
        icon: <MdStyle />,
        url: '/barber/prodservices',
      },

      {
        id: 'salesbooking',
        title: 'Sales Booking',
        messageId: 'sidebar.salesbooking',
        type: 'item',
        icon: <MdPointOfSale />,
        url: '/barber/salesbooking',
      },

      {
        id: 'shopexpenses',
        title: 'Shop Expenses',
        messageId: 'sidebar.shopexpenses',
        type: 'item',
        icon: <MdOutlineMoneyOff />,
        url: '/barber/shopexpenses',
      },

      {
        id: 'profileinfo',
        title: 'My Profile Info',
        messageId: 'sidebar.profileinfo',
        type: 'item',
        icon: <MdOutlineManageAccounts />,
        url: '/my-account',
      },

      {
        id: 'systemusers',
        title: 'SystemUsers',
        messageId: 'sidebar.systemusers',
        type: 'item',
        icon: <MdOutlinePeopleAlt />,
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Developer],
        url: '/systemusers',
      },
    ]
  },

  {
    id: 'administration',
    title: 'Administration',
    messageId: 'sidebar.administration',
    type: 'group',
    icon: <MdDashboard style={{ fontSize: '13px', marginTop: '5px', marginLeft: 9 }} />,
    permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Developer],
    children: [
      {
        id: 'systemusers',
        title: 'SystemUsers',
        messageId: 'sidebar.systemusers',
        type: 'item',
        icon: <MdOutlinePeopleAlt />,
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Developer],
        url: '/systemusers',
      },

      {
        id: 'testpage',
        title: 'TestPage',
        messageId: 'sidebar.testpage',
        type: 'item',
        icon: <MdThermostat />,
        permittedRole: [RoutePermittedRole.Developer],
        url: '/testfile',
      },
    ]
  },
];

export default routesConfig;