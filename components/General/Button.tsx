interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleMode: "primary" | "secondary" | "tertiary" | "none";
  styleSize: "small" | "medium" | "large" | "none";
  children?: React.ReactNode;
  className?: string;
}

const STYLES = {
  primary: `
    bg-light-btn dark:bg-dark-btn
    text-dark-bg dark:text-light-text
    hover:bg-light-text dark:hover:bg-dark-text
    hover:text-light-bg dark:hover:text-dark-bg
    shadow-md hover:shadow-lg
    focus:ring-2 focus:ring-offset-2 focus:ring-light-text dark:focus:ring-dark-text
  `,
  secondary: `
    bg-transparent
    border border-light-btn dark:border-dark-btn
    text-light-btn dark:text-dark-btn
    hover:bg-light-btn dark:hover:bg-dark-btn
    hover:text-dark-bg dark:hover:text-light-bg
    shadow-sm hover:shadow-md
    focus:ring-2 focus:ring-offset-2 focus:ring-light-btn dark:focus:ring-dark-btn
  `,
  tertiary: `
    bg-transparent
    text-light-btn dark:text-dark-btn
    underline hover:no-underline
    hover:text-light-text dark:hover:text-dark-text
  `,
  none: "",
} as const;

const SIZES = {
  small: "py-1 px-2 text-sm",
  medium: "py-2 px-4 text-base",
  large: "py-3 px-6 text-lg",
  none: "",
} as const;

export default function Button({
  styleMode,
  styleSize,
  children,
  className,
  ...props
}: Props) {
  const style = className
    ? className
    : ` ${STYLES[styleMode]} ${SIZES[styleSize]} font-title
                rounded-md
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed`;
  return (
    <button {...props} className={style}>
      {children}
    </button>
  );
}
