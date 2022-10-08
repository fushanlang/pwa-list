import { ReactNode } from "react";
type Props = { children: ReactNode };
const Li: React.FC<Props> = ({ children }) => {
  return <li className="my-2">{children}</li>;
};
export default Li;
