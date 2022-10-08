import { ReactNode } from "react";
type Props = { children: ReactNode };
const P: React.FC<Props> = ({ children }) => {
  return <p className="mb-3">{children}</p>;
};
export default P;
