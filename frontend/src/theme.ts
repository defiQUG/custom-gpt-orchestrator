import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'blue.500',
          color: 'white',
          _hover: { bg: 'blue.600' },
        },
      },
    },
  },
});

export default theme;
