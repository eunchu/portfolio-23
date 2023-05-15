import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      textSub: string;
      textDeepSub: string;
      textFooter: string;
      point: string;
      error: string;
    };
  }
}
