interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  divStyle?: string;
  children?: React.ReactNode;
}

export default function Input({ divStyle, children, ...props }: Props) {
  return (
    <div className={divStyle}>
      {children}
      <input
        {...props}
        className={`
          ${
            props.className || ""
          } block w-full px-3 py-2 text-dark-bg dark:text-light-text
          bg-light-btn dark:bg-dark-btn
          border border-gray-300 dark:border-gray-700
          rounded-md shadow-sm placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-dark-text
          focus:border-light-text dark:focus:border-dark-text
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
    </div>
  );
}
