import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "react-bootstrap";
import React from "react";

type CustomBootstrapLinkType = React.ComponentClass<LinkProps> & keyof JSX.IntrinsicElements;

interface ButtonLinkCustomProps extends ButtonProps {
  to: string;
}

const ButtonLinkCustom: React.FC<ButtonLinkCustomProps> = ({ to, children, ...rest }) => {
  return (
    <Button
      {...rest}
      as={Link as unknown as CustomBootstrapLinkType}
      to={to}
    >
      {children}
    </Button>
  );
};

export default ButtonLinkCustom;
