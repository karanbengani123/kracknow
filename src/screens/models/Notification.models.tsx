export interface INotificationCount {
    totalUnread: number;
    OrderUnread: number;
    PaymentUnread: number;
    ProfileUnread: number;
    CashbackUnread: number;
    ListingUnread: number;
    OffersUnread: number;
  }
  
  export interface INotification {
    message: string;
    read: boolean;
    uuid: string;
    details: {
      offerId: string;
      retailerId: string;
      orderId: string;
      connectionId: string;
      paymentId: string;
      type: string;
    };
  }
  