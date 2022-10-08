import { ReactNode } from "react";
type Props = { children: ReactNode };
const Ul: React.FC<Props> = ({ children }) => {
  return <ul className="list-disc ml-10 my-3">{children}</ul>;
};
export default Ul;
