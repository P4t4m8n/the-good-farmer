import Button from "@/components/General/Button";
import Select from "@/components/General/Select";
import { QUANTITY_TYPE } from "@/constants/products";
import { useModel } from "@/hooks/useModel";

import { useRef } from "react";

export default function AddPricing() {
  const modelRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useModel(modelRef);
  return (
    <div>
      <Button
        size="medium"
        style="secondary"
        onClick={() => setIsOpen((perv) => !perv)}
      >
        Add
      </Button>
      {isOpen && (
        <div ref={modelRef}>
          <Select
            selectProps={{ name: "type" }}
            options={QUANTITY_TYPE.map((q) => q.toString())}
          ></Select>
        </div>
      )}
    </div>
  );
}
