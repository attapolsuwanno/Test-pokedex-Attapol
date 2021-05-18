import React from "react";
import styled from "styled-components";
import { Button } from "antd";

export const Footer = () => {
  return (
    <>
      <FooterStyled>
        <Button type="primary">Primary Button</Button>
      </FooterStyled>
      ;
    </>
  );
};

const FooterStyled = styled.div`
  background: #ec5656;
`;
