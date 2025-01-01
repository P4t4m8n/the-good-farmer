import { TCheckoutStage } from "@/types/checkout";
import { useRef, useState } from "react";

export const useStage = () => {
  const [stage, setStage] = useState<TCheckoutStage>("details");
  const currentCity = useRef<string | null>(null);

  const handleNextClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    stage: TCheckoutStage
  ) => {
    const form = (e.currentTarget.closest("form") as HTMLFormElement) || null;

    // Check form validity
    if (form && !form.checkValidity()) {
      e.preventDefault(); // Prevent default action if form is invalid
      form.reportValidity(); // Show validation feedback to the user
      return;
    }

    if (stage === "delivery" && !currentCity.current) {
      const formData = new FormData(form);
      const inputString = formData.get("addressId") as string;
      const city = inputString.split(",")[1];
      if (!city) {
        setStage("details");
        return;
      }
      currentCity.current = city;

      const addressId = inputString.split(",")[0];
      form.append("addressId", addressId);
      setStage("delivery");
      return;
    }

    setStage(stage);
  };
  return { handleNextClick, stage, currentCity };
};
