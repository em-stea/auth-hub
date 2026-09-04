import { Card, Container, Flex, Heading, Text } from "@chakra-ui/react";

import { ForgotPasswordForm } from "@/features/auth/components/form/forgot-password-form";
import { RayIcon } from "@/shared/components/icons";

export default function ForgotPasswordPage() {
  return (
    <Container variant="auth">
      <Card.Root variant="auth">
        <Card.Header>
          <Flex
            alignItems="center"
            bg="blue.500"
            borderRadius="30%"
            boxShadow="0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a"
            h="12"
            justifyContent="center"
            mb="4"
            w="12"
          >
            <RayIcon boxSize={6} color="white" />
          </Flex>

          <Heading textAlign="center" textStyle="title.4">
            Recover your password
          </Heading>
          <Text color="gray.500" textAlign="center" textStyle="body.2">
            We&apos;ll send you a secure link to choose a new password
          </Text>
        </Card.Header>

        <Card.Body>
          <ForgotPasswordForm />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
