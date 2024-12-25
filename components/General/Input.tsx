interface Props {
  inputProps: TInput;
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
      <label className="bg-inherit" htmlFor={id}>
        {children && children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input {...inputProps}  />
    </div>
  );
}
