import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Select({
  className,
  options,
  value,
  placeholder = "placeholder",
  selectCallback = () => { }
}) {
  const INITIAL_STATE = {
    value: value === undefined ? null : value,
    optionOpend: false,
  };
  const [state, setState] = useState(INITIAL_STATE);
  useEffect(() => {
    selectCallback(state.value);
  }, [state.value]);
  const selectOption = (idx) => {
    setState(s => ({
      ...s,
      value: idx,
    }));
  }
  const toggleOption = () => {
    setState(s => ({
      ...s,
      optionOpend: !s.optionOpend,
    }));
  }
  return (
    <StyledCustom className={className}>
      <div className={["selected-option", (state.optionOpend ? "option-opend" : "")].join(" ")} onClick={() => {
        toggleOption();
      }}>
        <span>{state.value !== null ? options[state.value] : placeholder}</span>
        <img src="/images/triangle.png" alt="" />
      </div>
      <div className={["options", (state.optionOpend ? "option-opend" : "")].join(" ")}>
        {options.map((x, i) => <div className="option" key={i} onClick={() => {
          selectOption(i);
          toggleOption();
        }}>{x}</div>)}
      </div>
    </StyledCustom>
  );
}

export default Select;

const StyledCustom = styled.div`
  position:relative;
  color:${props => props.theme.color.foreground};
  font-size:${props => props.theme.font.size.paragraph2};
  font-weight:${props => props.theme.font.weight.bold};
  .selected-option{
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:1rem;
    background-color:${props => props.theme.color.primary};
    &.option-opend{
      img{
        transform:rotate(180deg);
      }
    }
  }
  .options{
    display:none;
    position:absolute;
    left:0;
    right:0;
    top:100%;
    z-index:2;
    background-color:${props => props.theme.color.background};
    cursor:pointer;
    .option{
      padding:1rem;
    }
    .option:hover{
      background-color:${props => props.theme.color.gray800};
    }
    &.option-opend{
      display:block;
    }
  }
`;