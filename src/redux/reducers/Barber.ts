import {
    BarberActionTypes,
    GET_CUSTOMERS,
    GET_SHOP_SERVICES,
    GET_SALES_BOOKING,
    GRAND_TOTAL_DATA,
    EXPENSES_TYPES,
    SHOP_ITEMS,
    TOTAL_EXPENSES,
   } from '../../types/actions/Barber.actions';

    import {
      CustomersModel,
      ShopServicesModel,
      ShopSalesModel,
      KeyValuesModel,
      ExpensesTypesModel,
      ShopItemsModel,
    } from '../../types/models/barber';
    
    
      const initialState: {
        customersData: CustomersModel | null;
        servicesData: ShopServicesModel | null;
        salesData: ShopSalesModel | null; 
        grandTotalData: KeyValuesModel | null;
        expensesTypesData:ExpensesTypesModel | null;
        shopItemsData:ShopItemsModel | null;
        totalExpensesData: KeyValuesModel | null;


      } = {
          customersData: null,
          servicesData: null,
          salesData: null,
          grandTotalData: null,
          expensesTypesData:null,
          shopItemsData:null,
          totalExpensesData:null,
      };
    
      
      const Barber = (state = initialState, action: BarberActionTypes) => {
    
        //console.log(`Reducers Here`, stateChanged)
          switch (action.type ) {
    
                case GET_CUSTOMERS:
                return {
                  ...state,
                  customersData: action.payload,
                };
  
                case GET_SHOP_SERVICES:
                return {
                  ...state,
                  servicesData: action.payload,
                };
  
                case GET_SALES_BOOKING:
                return {
                  ...state,
                  salesData: action.payload,
                };

                case GRAND_TOTAL_DATA:
                return {
                  ...state,
                  grandTotalData: action.payload,
                };

                case EXPENSES_TYPES:
                return {
                  ...state,
                  expensesTypesData: action.payload,
                };

                case SHOP_ITEMS:
                return {
                  ...state,
                  shopItemsData: action.payload,
                };

                case TOTAL_EXPENSES:
                return {
                  ...state,
                  totalExpensesData: action.payload,
                };
                        
              default:
                return state;
            }
      };
      export default Barber;
      