// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface userInfo {
  info: Info;
}

export interface Info {
  at_hash:        string;
  aud:            string;
  azp:            string;
  email:          string;
  email_verified: boolean;
  exp:            number;
  family_name:    string;
  given_name:     string;
  iat:            number;
  iss:            string;
  jti:            string;
  locale:         string;
  name:           string;
  nbf:            number;
  nonce:          string;
  picture:        string;
  sub:            string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toWelcome(json: string): userInfo {
      return JSON.parse(json);
  }

  public static welcomeToJson(value: userInfo): string {
      return JSON.stringify(value);
  }
}
