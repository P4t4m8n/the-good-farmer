import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { iconService } from "@/components/Icons/Icons";
import { useModel } from "@/hooks/useModel";
import { IAddress } from "@/types/address.types";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  setAddresses: (address: IAddress) => void;
  address: IAddress;
}

export default function EditAddress({ setAddresses, address }: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const [addressToEdit, setAddressToEdit] = useState<IAddress | null>(address);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.name as keyof IAddress;
    const value = ev.target.value;
    setAddressToEdit((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!addressToEdit) return;
    setAddresses(addressToEdit);
    setIsOpen(false);
  };

  const ADDRESS_INPUTS = [
    {
      name: "street-name",
      type: "text",
      required: true,
      placeholder: "Street Name",
      defaultValue: address?.streetName,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "street-number",
      type: "text",
      placeholder: "Street Number",
      defaultValue: address?.number,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "street-floor",
      type: "text",
      required: true,
      placeholder: "Floor",
      defaultValue: address?.floor,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "street-entrance",
      type: "text",
      required: true,
      placeholder: "Entrance",
      defaultValue: address?.entrance,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "street-apartment",
      type: "text",
      required: true,
      placeholder: "Apartment",
      defaultValue: address?.apartment,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "userId",
      defaultValue: address?.userId,
      className:
        "bg-inherit rounded border p-2 border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
      type: "text",
      hidden: true,
      divStyle: "hidden",
    },
    {
      name: "city",
      type: "text",
      required: true,
      placeholder: "City",
      defaultValue: address?.city,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "state",
      type: "text",
      placeholder: "State",
      defaultValue: address?.state,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "zipCode",
      type: "text",
      placeholder: "Zip Code",
      defaultValue: address?.zipCode,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      name: "country",
      type: "text",
      required: true,
      placeholder: "Country",
      defaultValue: address?.country,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
  ];

  return (
    <div>
      <Button
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setIsOpen(true);
        }}
        styleMode="primary"
        styleSize="small"
        className=" flex gap-1 items-center  h-fit"
      >
        {iconService.PlusSvg(6)}
        <span className="text-lg">Add Address</span>
      </Button>
      {isOpen &&
        createPortal(
          <form
            ref={modelRef}
            onSubmit={onSubmit}
            className="open-model fixed z-50 top-1/2 bg-light-btn dark:bg-dark-btn left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-96 aspect-square  grid gap-2 shadow-model rounded"
          >
            {ADDRESS_INPUTS.map((input) => (
              <Input key={input.name} {...input} onChange={onChange} />
            ))}
            <Button
              type="submit"
              styleMode="primary"
              styleSize="large"
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
