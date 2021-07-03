interface Colors {
  white: string;
  turquoise: string;
  grey: string;
}

interface Spaces {
  base: string;
}

export interface Theme {
  colors: Colors;
  spaces: Spaces;
  name: string;
}
