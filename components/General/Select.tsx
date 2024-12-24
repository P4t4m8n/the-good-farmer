interface Props {
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
  options: string[];
}
export default function Select({ selectProps, options }: Props) {
  return (
    <select {...selectProps}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}
