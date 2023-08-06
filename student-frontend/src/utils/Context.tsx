import React from "react";

export type ContextType = {
  data: any;
  setData: (c: any) => void;
  setAuth: (c: Boolean) => void;
};

export const CustomContext = React.createContext<ContextType>({
  data: "",
  setData: () => {},
  setAuth: () => {},
});
