// export interface PolicyRevenueModel{
//   ytdRevenue: string;
//   clients: number;
//   countries: string;
//   currencies:string;
// }

export interface PolicyDashboardModel{
  ytdRevenue: string;
  clients: number;
  countries: string;
  currencies:string;
}

export interface PolicyCurrencyRevenueModel{
    id: number;
    name: string;
    value: number;
}

export interface PolicyReturnCurrencyRevenueModel{
    id: number;
    name: string;
    value: number;
}

export interface PolicyClientsCountriesModel{
    id: number;
    country: string;
    value: number;
}

export interface PolicyClientTypeStatsModel{
    id: number;
    Plan: string;
    Enterprise: number;
    Personal: number;
}

export interface PolicyPremiumTypeStatsModel{
    id: number;
    Plan: string;
    Family: number;
    Individual: number;
}

export interface PolicyPaymentPlanStatsModel{
    id: number;
    Plan: string;
    Value:number;
}


export interface PolicyClientPretoniseModel{
    id: number;
    client: string;
    Value:number;
}

export interface PolicyClientPaymentsModel{
    id: number;
    client_name: string;
    total_cost:number;
    total_paid:number;
    total_remaining:number;
    premium_currency:string;
}

export interface PolicyLogsActivityModel{
    id: number;
    description: string;
    date:string;
    staffid:string;
}
