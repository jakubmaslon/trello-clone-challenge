interface Colors {
  white: string;
  turquoise: string;
  grey: string;
  blue: string;
  darkGrey: string;
  lightGrey: string;
}

interface Spaces {
  half: string;
  base: string;
}

export interface Theme {
  colors: Colors;
  spaces: Spaces;
  name: string;
}
