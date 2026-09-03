import { Box, Container } from "@chakra-ui/react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box as="main" bg="neutral.1000/40" minH="100vh" py={{ base: "10", md: "20" }}>
      <Container maxW="1180px" px={{ base: "4", md: "6" }}>
        {children}
      </Container>
    </Box>
  );
}
