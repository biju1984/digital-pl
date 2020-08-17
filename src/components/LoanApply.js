import React from "react";
import styled from "styled-components";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function LoanApply() {
  return (
      <Body>
        <p>Loan web component</p>
      </Body>
  );
}

export default React.memo(LoanApply);
