import React from 'react';

interface CalloutChartProps {
  userName: string;
  quantity: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
}

const CalloutChart: React.FC<CalloutChartProps> = ({
  userName,
  quantity,
  totalPrice,
  totalPriceAfterDiscount,
}) => {
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="bg-indigo-600 text-white p-4 rounded-lg border border-dashed border-custom-border mt-6">
      <h3 className="font-semibold text-custom-title">Details</h3>
      <div className="mt-6 space-y-2">
        <div className="flex">
          <div className="flex-1">User: {userName}</div>
          <div className="flex-1">Total Price: {formattedCurrency.format(totalPrice)}</div>
        </div>
        <div className="flex">
          <div className="flex-1"># of Items: {quantity}</div>
          <div className="flex-1">Total Price After Discount: {formattedCurrency.format(totalPriceAfterDiscount)}</div>
        </div>
      </div>
    </div>
  );
};

export default CalloutChart;
