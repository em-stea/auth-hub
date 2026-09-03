import { Button, Icon, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

interface SocialButtonProps {
  icon: React.FC;
  color: string;
  name: string;
  provider: string;
}

export const SocialButton = ({ icon, color, name, provider }: SocialButtonProps) => {
  return (
    <Button
      type="button"
      variant="secondary"
      size="xl"
      onClick={() => signIn(provider, { callbackUrl: "/" })}
    >
      <Icon as={icon} color={color} />
      <Text textStyle="button.3">{`Continue with ${name}`}</Text>
    </Button>
  );
};
