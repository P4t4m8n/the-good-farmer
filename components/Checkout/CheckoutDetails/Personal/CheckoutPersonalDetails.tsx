import Input from "@/components/General/Input";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userId: string;
}
export default function CheckoutPersonalDetails({
  firstName,
  lastName,
  email,
  phone,
  userId,
}: Props) {
  const INPUTS = [
    {
      type: "text",
      placeholder: "First Name",
      name: "firstName",
      defaultValue: firstName,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full",
    },
    {
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
      defaultValue: lastName,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text  w-full",
    },
    {
      type: "email",
      placeholder: "Email",
      name: "email",
      defaultValue: email,
      required: true,
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text  w-full",
    },
    {
      type: "tel",
      placeholder: "XXX-XXXXXXX",
      name: "phone",
      defaultValue: phone,
      required: true,
      pattern: "[0-9]{3}-[0-9]{7}",
      className:
        "bg-inherit rounded border p-2  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text  w-full",
    },
    {
      type: "text",
      name: "userId",
      hidden: true,
      defaultValue: userId,
      className: "hidden",
    },
  ];

  return (
    <div className=" font-text grid gap-2 grid-cols-2 grid-rows-2  w-full h-24">
      {INPUTS.map((input) => (
        <Input key={input.name} {...input} />
      ))}
    </div>
  );
}
