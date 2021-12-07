import {AuthUser} from '../../types/models/AuthUser';
import {appIntl} from '@edcarlos/utility/helper/Utils';
import IntlMessages from '@edcarlos/utility/IntlMessages';

export const frontEndSiteInfo = {
  siteTile: 'Barber Shop Management System',
  siteName: 'Barber Shop Management System',
  siteCurrency: 'USD',
  siteHomeLink: '/',
  voucherFee: 0,
  appCode: 'BSM',
  requirements: '/assets/files/requirements.pdf',
};

export const appInformation = {
  appName: 'Barber Shop Management System',
  appDir: '/barber',
};

export const navigation = [
  {name: 'Forgot Password', href: '/forget-password'},
  {name: 'Register', href: '/signup'},
  {name: 'SignIn', href: '/signin'},
];

export const companyInformation = {
  companyName: 'Barber Shop',
  companyContactInfo: 'Contact Support',
};

export const loginWelcome = {
  loginWelcomeTitle: 'Barber Shop Management System',
  loginWelcomeDescription: 'Welcome to the Barber Shop Management System',
};

export const pageInformation = {
  pageFooterLeftText: '@Copyright 2024 Barber Shop Management System | All Rights Reserved',
  pageFooterRightText: 'Home',
};

export const notificationConst = {
  txtGhanaUser: process.env.TXG_USER,
  txtGhanaPass: process.env.TXG_PASS,
  smsSenderID: 'BARBER-SHOP',
  smsAPIKey: process.env.FV_SMS_API_KEY,
  smsClientID: process.env.FV_SMS_CLIENT_ID,
  emailHeadImage: process.env.EMAIL_IMG_HEADER,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailHost: process.env.EMAIL_HOST,
  emailFrom: process.env.EMAIL_FROM,
  emailPort: process.env.EMAIL_PORT,
};

export const appDirectories = {
  logoSquare: '/assets/images/logo-square.png',
  barCode: '/assets/images/qrcode.svg',
  logo: '/assets/images/logo.jpg',
  serverAddress: '',
  avatarAccessDir: '/assets/images/avatar/',
  avatarRWDir: './public/assets/images/avatar/',
  avatarDefault: '/assets/images/placeholder.jpg',
  excelRWDir: './public/uploads/',
  downloadDir: '/uploads/downloads/',
  onlineAvatarAccessDir: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/avatar/` : '/assets/images/avatar/',
  onlineAvatarRWDir: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/avatar/` : './public/assets/images/avatar/',
  onlineAvatarDefault: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/placeholder.jpg` : '/assets/images/placeholder.jpg',
  onlineExcelRWDir: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/excel/` : './public/uploads/',
  onlineDownloadDir: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/downloads/` : '/uploads/downloads/',
  onlineExpenseFileUploadDir: process.env.CLOUDINARY_URL ? `${process.env.CLOUDINARY_URL}/expenses/` : './public/uploads/expenses/',
};

export const authRole = {
  admin: ['Admin'],
  user: ['User'],
  developer: ['Developer'],
};

export enum RoutePermittedRole {
  Admin = 'Admin',
  User = 'User',
  Developer = 'Developer',
  Applicant = 'Applicant',
  BankManager = 'Bank Manager',
  BankTeller = 'Bank Teller',
}

export const userRoles = [
  {
    id: 'Admin',
    itemValue: 'Admin',
  },
  {
    id: 'User',
    itemValue: 'User',
  },
  {
    id: 'Applicant',
    itemValue: 'Applicant',
  },
  {
    id: 'Bank Manager',
    itemValue: 'Bank Manager',
  },
  {
    id: 'Bank Teller',
    itemValue: 'Bank Teller',
  },
];
export const genderTypeSelect = [
  {
    id: 'Male',
    itemValue: 'Male',
  },
  {
    id: 'Female',
    itemValue: 'Female',
  },
];

export const defaultUser: AuthUser = {
  id: 1,
  user_login: 'admin',
  display_name: 'System Administrator',
  user_email: 'admin@barbershop.com',
  token: 'access-token',
  user_role: authRole.admin,
  avatar: '/assets/images/avatar/default.jpg',
  user_section: '',
  user_activation_key: 'access-token',
  user_pass: '',
};

export function ClientType() {
  const {messages} = appIntl();
  const clientTypes = [
    {
      id: String(messages['client.type.entreprise']),
      itemValue: String(messages['client.type.entreprise']),
    },
    {
      id: String(messages['client.type.personal']),
      itemValue: String(messages['client.type.personal']),
    },
  ];

  return clientTypes;
}

export function PremiumType() {
  const {messages} = appIntl();

  const premiumTypes = [
    {
      id: String(messages['premium.type.family']),
      itemValue: String(messages['premium.type.family']),
    },
    {
      id: String(messages['premium.type.indivudual']),
      itemValue: String(messages['premium.type.indivudual']),
    },
  ];
  return premiumTypes;
}

export function PaymentPlan() {
  const {messages} = appIntl();

  const paymentPlans = [
    {
      id: String(messages['payment.plan.weekly']),
      itemValue: String(messages['payment.plan.weekly']),
    },
    {
      id: String(messages['payment.plan.monthly']),
      itemValue: String(messages['payment.plan.monthly']),
    },
    {
      id: String(messages['payment.plan.quaterly']),
      itemValue: String(messages['payment.plan.quaterly']),
    },
    {
      id: String(messages['payment.plan.annually']),
      itemValue: String(messages['payment.plan.annually']),
    },
  ];

  return paymentPlans;
}

export function BookingStatus() {
  const {messages} = appIntl();

  const BookingStatuses = [
    {
      id: String(messages['booking.status.reservation']),
      itemValue: String(messages['booking.status.reservation']),
    },
    {
      id: String(messages['booking.status.waiting']),
      itemValue: String(messages['booking.status.waiting']),
    },
    {
      id: String(messages['booking.status.completed']),
      itemValue: String(messages['booking.status.completed']),
    },
  ];

  return BookingStatuses;
}

export function BookingDiscount() {
  const {messages} = appIntl();
  const BookingDiscounts = [
    {
      id: String(messages['booking.discount.percentage']),
      itemValue: String(messages['booking.discount.percentage']),
    },
    {
      id: String(messages['booking.discount.value']),
      itemValue: String(messages['booking.discount.value']),
    },
    {
      id: String(messages['booking.discount.none']),
      itemValue: String(messages['booking.discount.none']),
    },
  ];

  return BookingDiscounts;
}

export function PaymentStatus() {
  const {messages} = appIntl();
  const PaymentStatuses = [
    {
      id: String(messages['booking.payment.status.paid']),
      itemValue: String(messages['booking.payment.status.paid']),
    },
    {
      id: String(messages['booking.payment.status.unpaid']),
      itemValue: String(messages['booking.payment.status.unpaid']),
    },
  ];

  return PaymentStatuses;
}

// export function Function(){
//   const  {messages}  = appIntl();

// }

export function DependantRelation() {
  const {messages} = appIntl();
  const dependantRelations = [
    {
      id: String(messages['dependant.relation.son']),
      itemValue: String(messages['dependant.relation.son']),
    },
    {
      id: String(messages['dependant.relation.daughter']),
      itemValue: String(messages['dependant.relation.daughter']),
    },
    {
      id: String(messages['dependant.relation.husband']),
      itemValue: String(messages['dependant.relation.husband']),
    },
    {
      id: String(messages['dependant.relation.wife']),
      itemValue: String(messages['dependant.relation.wife']),
    },
    {
      id: String(messages['dependant.relation.father']),
      itemValue: String(messages['dependant.relation.father']),
    },
    {
      id: String(messages['dependant.relation.mother']),
      itemValue: String(messages['dependant.relation.mother']),
    },
    {
      id: String(messages['dependant.relation.brother']),
      itemValue: String(messages['dependant.relation.brother']),
    },
    {
      id: String(messages['dependant.relation.sister']),
      itemValue: String(messages['dependant.relation.sister']),
    },
    {
      id: String(messages['dependant.relation.inlaw']),
      itemValue: String(messages['dependant.relation.inlaw']),
    },
    {
      id: String(messages['dependant.relation.friend']),
      itemValue: String(messages['dependant.relation.friend']),
    },
  ];
  return dependantRelations;
}

export function PremiumCurrency() {
  const {messages} = appIntl();

  const premiumCurrency = [
    {
      id: String(messages['premium.currency.cfa']),
      itemValue: String(messages['premium.currency.cfa']),
    },
    {
      id: String(messages['premium.currency.gh']),
      itemValue: String(messages['premium.currency.gh']),
    },
    {
      id: String(messages['premium.currency.dollar']),
      itemValue: String(messages['premium.currency.dollar']),
    },
    {
      id: String(messages['premium.currency.euro']),
      itemValue: String(messages['premium.currency.euro']),
    },
  ];

  return premiumCurrency;
}

export const initialUrl = '/my-account';
export const homeUrl = '/';
