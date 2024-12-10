interface Props {
  style: "primary" | "secondary" | "tertiary";
  size: "small" | "medium" | "large";
  children?: React.ReactNode;
  className?: string;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const STYLES = {
  primary: "",
  secondary: " ",
  tertiary: "",
} as const;

const SIZES = {
  small: " ",
  medium: " ",
  large: " ",
} as const;

export default function Button({
  style,
  size,
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
                ${STYLES[style]}
                ${SIZES[size]}
                font-title
                rounded-md
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
    >
      {children}
    </button>
  );
}
