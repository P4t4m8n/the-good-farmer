interface Props {
  inputProps: TInput;
  error?: string;
  children?: React.ReactNode;
  labelStyle?: string;
}
export default function Input({ inputProps, children, error }: Props) {
  const { id } = inputProps;
  return (
    <div className=" bg-inherit">
      <label className="bg-inherit" htmlFor={id}>
        {children && children}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
      <input {...inputProps} />
    </div>
  );
}
