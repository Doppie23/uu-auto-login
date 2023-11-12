type storageKey = "username" | "password" | "secret";

type storageObject = {
  [key in storageKey]?: string;
};
