import { Card, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Suspense } from "react";

import { ResetPasswordForm } from "@/features/auth/components/form/reset-password-form";
import { RayIcon } from "@/shared/components/icons";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ResetPasswordContent({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

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
            Choose a new password
          </Heading>
          <Text color="gray.500" textAlign="center" textStyle="body.2">
            Enter and confirm your new password
          </Text>
        </Card.Header>

        <Card.Body>
          <ResetPasswordForm token={token} />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
