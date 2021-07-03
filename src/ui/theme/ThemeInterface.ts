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

interface BoxShadows {
  light: string;
  heavy: string;
}

export interface Theme {
  colors: Colors;
  spaces: Spaces;
  boxShadows: BoxShadows;
  name: string;
}
