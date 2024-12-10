interface Props {
  productsPrice: number;
  deliveryPrice: number;
}
export default function CheckoutPrice({ productsPrice, deliveryPrice }: Props) {
  const items = [
    {
      h3: "Products price",
      p: productsPrice,
    },
    {
      h3: "Delivery price",
      p: deliveryPrice,
    },
    {
      h3: "Total price",
      p: productsPrice + deliveryPrice,
    },
  ];
  return (
    <div>
      {items.map((item, index) => (
        <span
          key={index}
          className={`flex  justify-between ${
            index === items.length - 1 ? " font-bold underline" : ""
          }`}
        >
          <h3 className="font-title">{item.h3}</h3>
          <p className="font-text">${item.p}</p>
        </span>
      ))}
    </div>
  );
}
