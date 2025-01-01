"use client";
import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { chargeCreditCard } from "@/lib/actions/order.actions";
import { useActionState } from "react";

interface Props {
  orderId: string;
}

export default function CheckoutCreditCardForm({ orderId }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, isPending] = useActionState(chargeCreditCard, null);

  const inputFields = [
    {
      name: "orderId",
      type: "hidden",
      value: orderId,
    },
    {
      name: "cardHolder",
      type: "text",
      placeholder: "Card holder",
      value: "John Doe",
    },
    {
      name: "cardNumber",
      type: "text",
      placeholder: "1234 5678 9012 3456",
      value: "1234 5678 9012 3456",
    },
    {
      name: "expirationDate",
      type: "text",
      placeholder: "MM/YY",
      value: "12/23",
    },
    {
      name: "cvv",
      type: "text",
      placeholder: "123",
      value: "123",
    },
  ];

  return (
    <div className=" border-t pt-4 flex flex-col gap-2">
      <h2 className="font-title underline">Credit Card Payment</h2>
      <form action={formAction} className="flex flex-col gap-2">
        {inputFields.map((input) => (
          <Input
            key={input.name}
            {...input}
            readOnly={true}
            className="bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full"
          ></Input>
        ))}

        <Button
          styleMode="primary"
          styleSize="medium"
          type="submit"
          disabled={isPending}
          className=" bg-dark-btn text-light-text dark:bg-light-btn dark:text-dark-text p-2"
        >
          Submit Payment
        </Button>
      </form>
    </div>
  );
}
