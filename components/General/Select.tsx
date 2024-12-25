interface Props {
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
  options: string[];
  children?: React.ReactNode;
}
export default function Select({ selectProps, options, children }: Props) {
  return (
    <div>
      {children}
      <select {...selectProps}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
