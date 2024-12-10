/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { iconService } from "@/components/Icons/Icons";
import { useModel } from "@/hooks/useModel";
import { saveAddress } from "@/lib/actions/address.actions";
import { useActionState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  setAddresses: (address: IAddress) => void;
  address?: IAddress;
}

export default function EditAddress({ setAddresses, address }: Props) {
  const isFirstRender = useRef(true);
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const [state, formAction, isPending] = useActionState(saveAddress, address);

  //Ref to track the previous state
  const prevStateRef = useRef<IAddress | null | undefined>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevStateRef.current = state;
      return;
    }

    // Only update if the state has changed and is not the same as the previous state
    if (state && state !== prevStateRef.current) {
      prevStateRef.current = state;
      setAddresses(state);
      setIsOpen(false);
    }
  }, [state]);

  const items: TInput[] = [
    {
      name: "streetName",
      type: "text",
      required: true,
      placeholder: "Street Name",
      defaultValue: state?.street.name,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "streetNumber",
      type: "text",
      placeholder: "Street Number",
      defaultValue: state?.street.number,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "floor",
      type: "text",
      required: true,
      placeholder: "Floor",
      defaultValue: state?.street.floor,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "entrance",
      type: "text",
      required: true,
      placeholder: "Entrance",
      defaultValue: state?.street.entrance,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "apartment",
      type: "text",
      required: true,
      placeholder: "Apartment",
      defaultValue: state?.street.apartment,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "userId",
      defaultValue: state?.userId,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
      type: "text",
      hidden: true,
    },
    {
      name: "city",
      type: "text",
      required: true,
      placeholder: "City",
      defaultValue: state?.city,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "state",
      type: "text",
      placeholder: "State",
      defaultValue: state?.state,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "zipCode",
      type: "text",
      placeholder: "Zip Code",
      defaultValue: state?.zipCode,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "country",
      type: "text",
      required: true,
      placeholder: "Country",
      defaultValue: state?.country,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
  ];

  return (
    <div ref={modelRef}>
      <Button
        onClick={() => setIsOpen(true)}
        style="primary"
        size="small"
        className=" flex gap-1 items-center  h-fit"
      >
        {iconService.PlusSvg(6)}
        <span className="text-lg">Add Address</span>
      </Button>
      {isOpen &&
        createPortal(
          <form
            action={formAction}
            className="open-model fixed z-50 top-1/2 bg-light-btn dark:bg-dark-btn left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-96 aspect-square  grid gap-2 shadow-model rounded"
          >
            {items.map((input) => (
              <Input key={input.name} inputProps={input} />
            ))}
            <Button
              disabled={isPending}
              type="submit"
              style="primary"
              size="large"
              className="bg-dark-btn font-bold justify-self-center dark:bg-light-btn text-light-text dark:text-dark-text w-fit p-2"
            >
              Save
            </Button>
          </form>,
          document.body
        )}
    </div>
  );
}
