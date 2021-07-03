interface Colors {
  white: string;
  turquoise: string;
  grey: string;
  blue: string;
  darkGrey: string;
}

interface Spaces {
  base: string;
}

export interface Theme {
  colors: Colors;
  spaces: Spaces;
  name: string;
}
