interface Props extends React.HTMLProps<HTMLSelectElement> {
  options: string[];
  children?: React.ReactNode;
}
export default function Select({ options, children, ...props }: Props) {
  return (
    <div>
      {children}
      <select {...props}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
