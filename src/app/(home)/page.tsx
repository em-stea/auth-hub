import { Card, Flex, Grid, GridItem, Image } from "@chakra-ui/react";

import { SignOutButton } from "@/features/home/components/sign-out-button";

const PLACEHOLDER_IMAGES = [
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
  "https://placehold.co/600x400/png",
];

export default function Home() {
  return (
    <>
      <Flex justifyContent="flex-end" mb="6">
        <SignOutButton />
      </Flex>

      <Flex alignItems="center" justifyContent="center" h="calc(100vh - 15rem)">
        <Grid templateColumns="repeat(3, 1fr)" gap="6" minH="10rem">
          {PLACEHOLDER_IMAGES.map((src, index) => (
            <GridItem key={src + index} colSpan={1}>
              <Card.Root variant="home" overflow="hidden" p="0">
                <Image
                  alt={`Placeholder ${index + 1}`}
                  src={src}
                  w="full"
                  h="auto"
                  display="block"
                />
              </Card.Root>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
