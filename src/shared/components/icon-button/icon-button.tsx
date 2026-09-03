import { Button, ButtonProps } from "@chakra-ui/react";

interface IconButtonProps extends Omit<ButtonProps, "variant"> {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  size?: "sm" | "md";
}

export function IconButton({
  icon,
  onClick,
  variant = "ghost",
  size = "sm",
  ...props
}: IconButtonProps) {
  return (
    <Button size={size} variant={variant} onClick={onClick} {...props}>
      {icon}
    </Button>
  );
}
