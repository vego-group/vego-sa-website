import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
