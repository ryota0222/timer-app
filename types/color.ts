export type Color =
  | "text"
  | "gray"
  | "red"
  | "pink"
  | "purple"
  | "cyan"
  | "blue"
  | "teal"
  | "green"
  | "yellow"
  | "orange";

export type PrimitiveColorShades = {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
};

export type PrimitiveColors = {
  black: string;
  white: string;
  gray: PrimitiveColorShades;
  red: PrimitiveColorShades;
  pink: PrimitiveColorShades;
  purple: PrimitiveColorShades;
  cyan: PrimitiveColorShades;
  blue: PrimitiveColorShades;
  teal: PrimitiveColorShades;
  green: PrimitiveColorShades;
  yellow: PrimitiveColorShades;
  orange: PrimitiveColorShades;
};

export type SemanticColorTokens = {
  contrast: string;
  fg: string;
  "fg.muted"?: string;
  "fg.subtle"?: string;
  "fg.inverted"?: string;
  "fg.error"?: string;
  "fg.warning"?: string;
  "fg.success"?: string;
  "fg.info"?: string;
  subtle: string;
  muted: string;
  emphasized: string;
  solid: string;
  focusRing: string;
};

export type SemanticThemeColors = {
  text: SemanticColorTokens;
  gray: SemanticColorTokens;
  red: SemanticColorTokens;
  pink: SemanticColorTokens;
  purple: SemanticColorTokens;
  cyan: SemanticColorTokens;
  blue: SemanticColorTokens;
  teal: SemanticColorTokens;
  green: SemanticColorTokens;
  yellow: SemanticColorTokens;
  orange: SemanticColorTokens;
};

export type SemanticColors = {
  light: SemanticThemeColors;
  dark: SemanticThemeColors;
};
