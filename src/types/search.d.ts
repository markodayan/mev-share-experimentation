declare type IMEVShareOrders = [...ShareBuckets, number, number, number];

// at the end of the round (after exhausting our match search)
// - we unshift an empty share bucket and then pop the last element of the Share bucket array off
//  - by popping this element off, we can increment the 'dropped' value by the size of this popped IOrder array
declare type ShareBuckets = [
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[],
  IOrder[]
];

declare type IOrder = {
  hash: string;
  timestamp: number;
  blocks_elapsed: number;
  received_in: number;
};

declare type MEVShareData = {
  orders: IOrder[];
  unfulfilled: number;
  fulfilled: number;
  dropped: number;
};
