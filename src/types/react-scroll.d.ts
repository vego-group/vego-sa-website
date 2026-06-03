declare module "react-scroll" {
  import type { ComponentType, ReactNode } from "react";

  export type ScrollLinkProps = {
    to: string;
    children?: ReactNode;
    activeClass?: string;
    className?: string;
    duration?: number;
    offset?: number;
    smooth?: boolean | string;
    spy?: boolean;
    onClick?: () => void;
  };

  export const Link: ComponentType<ScrollLinkProps>;

  export const scroller: {
    scrollTo: (
      to: string,
      options?: {
        duration?: number;
        offset?: number;
        smooth?: boolean | string;
      }
    ) => void;
  };
}
