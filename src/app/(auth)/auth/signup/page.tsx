import { SignupForm } from "@/features/auth/components/form/signup-form";
import { RayIcon } from "@/shared/components/icons";
import { Card, Container, Flex, Heading, Text } from "@chakra-ui/react";

function SignupPage() {
  return (
    <Container variant="auth">
      <Card.Root variant="auth">
        <Card.Header>
          <Flex
            justifyContent="center"
            alignItems="center"
            h="12"
            w="12"
            bg="blue.500"
            borderRadius="30%"
            mb="4"
            boxShadow="0 1px 3px 0 #0000001a, 0 1px 2px -1px  #0000001a;"
          >
            <RayIcon color="white" boxSize={6} />
          </Flex>

          <Heading textStyle="title.4" textAlign="center">
            Create account
          </Heading>
          <Text textStyle="body.2" textAlign="center" color="gray.500">
            Sign up to get started with Auth Hub
          </Text>
        </Card.Header>
        <Card.Body>
          <SignupForm />
        </Card.Body>
      </Card.Root>
    </Container>
  );
}

export default SignupPage;
