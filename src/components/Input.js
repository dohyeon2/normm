import React from 'react';
import styled from 'styled-components';

function Input({
    theme = "default",
    type = "text",
    label = "label place holder",
    id = "id",
    name = "name",
    placeholder = "placeholder",
    data = [],
    required = false,
    value = "",
    addClassList = [],
    onInput = () => { }
}) {
    const classList = ["input", `input-${type}`, ...addClassList];
    switch (theme) {
        case "search":
            return (<StyledInputContainerSearch className={classList}>
                <input type="text" placeholder={placeholder} id={id} name={name} onInput={onInput} value={value} />
            </StyledInputContainerSearch>);
        case "default":
        default:
            const switchInputTag = (type, data = []) => {
                switch (type) {
                    case "radio":
                        return <div className="radio-container">
                            {data.map((v, idx) => <div key={idx}>
                                <input id={v.id || `${id}-${v.value}`} name={name} type={type} value={v.value} required={required} onInput={onInput} />
                                <StyledLabel htmlFor={v.id || `${id}-${v.value}`}>
                                    <div className="radio-check-box"></div>
                                    {v.label}
                                </StyledLabel>
                            </div>)}
                        </div>;
                    case "text":
                    default:
                        return <input id={id} name={name} type={type} placeholder={placeholder} required={required} onInput={onInput} value={value} />;
                }
            }
            return (
                <StyledInputContainer className={classList}>
                    <StyledLabel htmlFor={id}>{label}</StyledLabel>
                    {switchInputTag(type, data)}
                </StyledInputContainer>
            );
    }
}

export default Input;


export const StyledLabel = styled.label`
    font-size:${props => props.theme.font.size.paragraph};
    color:${props => props.theme.color.textPrimary};
    margin-bottom:0.7rem;
`;

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-weight:${props => props.theme.font.weight.regular};
    font-family:${props => props.theme.font.family};
    input{
        background-color: transparent;
        border:0;
        padding:0;
        padding-bottom:0.6rem;
        border-bottom:2px solid ${props => props.theme.color.gray800};
        font-size:${props => props.theme.font.size.paragraph2};
        color:${props => props.theme.color.foreground};
    }
    .radio-container{
        display: flex;
        align-items: center;
        label{
            cursor: pointer;
            font-size:${props => props.theme.font.size.paragraph2};
            color:${props => props.theme.color.gray600};
            display: flex;
            align-items: center;
            margin-bottom:0;
            transition: color 0.2s ease-in-out;
            margin-right:1.4rem;
            .radio-check-box{
                flex-shrink:0;
                display: flex;
                justify-content: center;
                align-items: center;
                width:2.2rem;
                height:2.2rem;
                border:1px solid ${props => props.theme.color.gray600};
                margin-right: 0.7rem;
                border-radius: 9.9rem;
                transition: border 0.2s ease-in-out;
                &::before{
                    content:"";
                    width:1.2rem;
                    height:1.2rem;
                    background-color: ${props => props.theme.color.gray800};
                    border-radius:9.9rem;
                    transition: border 0.2s ease-in-out, background-color 0.2s ease-in-out;
                }
            }
        }
        input[type="radio"]{
            opacity: 0;
            position:absolute;
            z-index:-1;
            &:checked + label{
                color:${props => props.theme.color.textPrimary};
                .radio-check-box{
                    border:1px solid ${props => props.theme.color.primary};
                    &::before{
                        background-color: ${props => props.theme.color.primary};
                    }
                }
            }
        }
    }
`;

const StyledInputContainerSearch = styled(StyledInputContainer)`
    max-width:450px;
    input{
        padding:0.8rem 1.3rem;
        border:0;
        font-size:${props => props.theme.font.size.paragraph};
        background-color:${props => props.theme.color.gray800};
        border-radius:9.9rem;
        background-image:url("/images/search_icon.png");
        background-repeat:no-repeat;
        background-position:calc(100% - 1.3rem) center;
        background-size:auto 1.4rem;
    }
`;