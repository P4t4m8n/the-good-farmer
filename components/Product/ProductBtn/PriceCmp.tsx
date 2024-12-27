interface Props {
  pricePerKilo: number;
  styleMode: "cart" | "card";
  pricingDetails: IPricingDetails;
}
export default function PriceCmp({
  pricePerKilo,
  styleMode,
  pricingDetails,
}: Props) {
  const style = styleMode === "cart" ? STYLE_CART : STYLE_CARD;
  const { weightPerType = 1, discount, type } = pricingDetails;
  const price = pricePerKilo * weightPerType;
  const priceWithDiscount = (price * (discount || 1)).toFixed(2);
  const priceWithoutDiscount = price.toFixed(2);
  const pricePerGr = (pricePerKilo * 0.1).toFixed(2);

  return (
    <div className="h-16 flex flex-col ">
      {!discount ? (
        <span>
          <h3 className={style} aria-label={`Price per ${type}`}>
            ${priceWithDiscount}
          </h3>
        </span>
      ) : (
        <span className="grid justify-items-center">
          <h3
            className={`${style} text-discount-red`}
            aria-label="Discounted Price"
          >
            ${priceWithDiscount}
          </h3>
          <p aria-label="Original Price" className="line-through text-2xs">
            ${priceWithoutDiscount}
          </p>
        </span>
      )}
      <p
        aria-label="Price per 100 grams"
        className="text-2xs text-gray-400 mt-auto"
      >
        Price per 100gr - ${pricePerGr}
      </p>
    </div>
  );
}

const STYLE_CART = "text-sm";
const STYLE_CARD = "text-center text-lg font-title";
