interface Props {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  children?: React.ReactNode;
  divStyle?: string;
}
export default function Input({
  inputProps,
  children,
  error,
  divStyle,
}: Props) {
  const { id } = inputProps;
  return (
    <div className={"bg-inherit" + (divStyle ? " " + divStyle : "")}>
      <label className="bg-inherit w-full" htmlFor={id}>
        {children && children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input {...inputProps}  />
    </div>
  );
}
