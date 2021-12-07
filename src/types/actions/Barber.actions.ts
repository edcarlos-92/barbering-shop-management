import { 
    CustomersModel,
    ShopServicesModel,
    ShopSalesModel,
    KeyValuesModel,
    ExpensesTypesModel,
    ShopItemsModel    
    } from '../models/barber'; 
  
  export const GET_CUSTOMERS = 'GET_CUSTOMERS'; 
  export const GET_SHOP_SERVICES = 'GET_SHOP_SERVICES';
  export const GET_SALES_BOOKING = 'GET_SALES_BOOKING';
  export const GRAND_TOTAL_DATA = 'GRAND_TOTAL_DATA';
  export const EXPENSES_TYPES = 'EXPENSES_TYPES';
  export const SHOP_ITEMS = 'SHOP_ITEMS';
  export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
     
    export interface CustomersAction {
      type: typeof GET_CUSTOMERS;
      payload: CustomersModel;
    }
  
    export interface ShopServicesAction {
      type: typeof GET_SHOP_SERVICES;
      payload: ShopServicesModel;
    }

    export interface ShopSalesAction {
      type: typeof GET_SALES_BOOKING;
      payload: ShopSalesModel;
    }

     export interface KeyValueAction {
      type: typeof GRAND_TOTAL_DATA;
      payload: KeyValuesModel;
    }

    export interface ExpensesTypesAction {
      type: typeof EXPENSES_TYPES;
      payload: ExpensesTypesModel;
    }

    export interface ShopItemsAction {
      type: typeof SHOP_ITEMS;
      payload: ShopItemsModel;
    }

    export interface TotalExpensesAction {
      type: typeof TOTAL_EXPENSES;
      payload: KeyValuesModel;
    }
    
    
    export type BarberActionTypes =
    | CustomersAction
    | ShopServicesAction
    | ShopSalesAction
    | KeyValueAction
    | ExpensesTypesAction
    | ShopItemsAction
    | TotalExpensesAction
    ;