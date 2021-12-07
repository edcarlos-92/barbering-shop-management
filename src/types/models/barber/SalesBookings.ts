export interface ShopSalesModel{
    id:number;
    service_id:number;
    booking_date:string;
    quantity:number;
    discount:number;
    total_service_cost:number;
    customer_id:number;
    status:string;
    payment_status:number;
    sms_notification:string;
    email_notification:string;
    push_notification:string;
    assignment:number;
    issuer:number;
    created_at:string;
    updated_at:string;
}

