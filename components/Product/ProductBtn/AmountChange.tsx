import { iconService } from "@/components/Icons/Icons";

interface Props {
  style: {
    container: string;
    span: string;
    svgSize?: number;
  };
  amount: number;
  handleAmountChange: (amount: number) => void;
}
export default function AmountChange({
  style,
  amount,
  handleAmountChange,
}: Props) {
  return (
    <div className={style.container}>
      <button
        onClick={() => handleAmountChange(-1)}
        disabled={amount < 0}
        className=""
      >
        {iconService.MinusSvg(style.svgSize)}
      </button>
      <span className={style.span}>{amount}</span>
      <button onClick={() => handleAmountChange(1)} className="">
        {iconService.PlusSvg(style.svgSize)}
      </button>
    </div>
  );
}
