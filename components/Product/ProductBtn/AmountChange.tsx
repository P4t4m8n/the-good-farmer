import Button from "@/components/General/Button";
import { iconService } from "@/components/Icons/Icons";

interface Props {
  styleMode: TStyleMode;
  amount: number;
  handleAmountChange: (amount: number) => void;
}
export default function AmountChange({
  styleMode,
  amount,
  handleAmountChange,
}: Props) {
  const style = styleMode === "card" ? STYLE_CARD : STYLE_CART;

  return (
    <div className={style.container}>
      <Button
        onClick={() => handleAmountChange(-1)}
        disabled={amount <= 0}
        styleSize="medium"
        styleMode="tertiary"
        aria-label="Decrease amount"
      >
        {iconService.MinusSvg(style.svgSize)}
      </Button>
      <span className={style.span}>{amount}</span>
      <Button
        onClick={() => handleAmountChange(1)}
        styleSize="medium"
        styleMode="tertiary"
        aria-label="Increase amount"
      >
        {iconService.PlusSvg(style.svgSize)}
      </Button>
    </div>
  );
}

const BASE_STYLE = {
  container: "flex items-center justify-center text-center font-text",
  svgSize: 4,
  span: "text-base",
};

const STYLE_CARD = {
  ...BASE_STYLE,
  container: `${BASE_STYLE.container} mt-auto`,
};

const STYLE_CART = {
  ...BASE_STYLE,
  container: `${BASE_STYLE.container} gap-4 h-4 w-12`,
};
