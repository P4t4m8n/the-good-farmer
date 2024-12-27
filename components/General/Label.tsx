interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  error?: string;
}

export default function Label({ children, error, ...props }: Props) {
  return (
    <label {...props}>
      {children && children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </label>
  );
}
