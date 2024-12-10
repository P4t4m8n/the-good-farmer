import Button from "@/components/General/Button";

interface Props {
  isHidden: boolean;
  handleChangeStage: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function CheckoutsOverlay({
  isHidden,
  handleChangeStage,
}: Props) {
  return (
    <Button
      style="primary"
      size="medium"
      onClick={handleChangeStage}
      className={` absolute inset-0  w-full h-full z-10  bg-black pointer-events-auto opacity-40 ${
        isHidden ? " hidden" : ""
      } `}
    ></Button>
  );
}
