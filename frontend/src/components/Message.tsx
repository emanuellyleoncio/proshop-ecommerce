import { Alert } from "react-bootstrap";

function Message({ variant, children }: { variant: string; children: string }) {
  return <Alert variant={variant}>{children}</Alert>;
}

Message.defaultProps = {
  variant: "info",
};

export default Message;
