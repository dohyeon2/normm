import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Input, { StyledLabel } from '../components/Input';
import ImageUploadBtn from '../components/ImageUploadBtn';
import Candidate from '../components/Candidate';

function Making() {
    const INITIAL_INPUT = {
        title: "",
        description: "",
        status: "",
        search: "",
        images: [],
    };
    const INITIAL_IMAGE_OBJ = {
        name: "",
        src: "",
        state: "loading",
    };
    const INITIAL_STATE = {
        canSubmit: false,
    };
    const [input, setInput] = useState(INITIAL_INPUT);
    const [state, setState] = useState(INITIAL_STATE);
    const submitEventHandler = (e) => {
        e.preventDefault();
    }
    const onInput = (e) => {
        const curr = e.target;
        setInput(s => ({
            ...s,
            [curr.name]: curr.value,
        }));
    }
    const callbackBeforeUpload = (file) => {
        const name = file.name.split(".").slice(0, -1);
        const src = URL.createObjectURL(file);
        const obj = {
            ...INITIAL_IMAGE_OBJ,
            name: name,
            src: src,
            status: "uploading",
        }
        setInput(s => ({
            ...s,
            images: [
                ...s.images,
                obj,
            ]
        }));
    };
    const onInputSearch = (e) => {
        const curr = e.target;
        setInput(s => ({
            ...s,
            [curr.name]: curr.value,
        }));
    };
    const validateHandler = (key, value) => {
        let result = true;
        console.log(value);
        switch (key) {
            case "search":
                break;
            case "images":
                if (value.length < 4) result = false;
                break;
            case "status":
                if (value === "") result = false;
                break;
            default:
                if (value.trim().length < 8) result = false;
                break;
        }
        return result;
    }
    const validateInput = (inputObj, validateHandler = () => { return false }) => {
        let result = true;
        const keys = Object.keys(inputObj);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            const value = inputObj[key];
            if (!validateHandler(key, value)) {
                result = false;
                break;
            }
        }
        return result;
    }
    useEffect(() => {
        if (validateInput(input, validateHandler)) {
            setState(s => ({
                ...s,
                canSubmit: true,
            }));
        } else {
            setState(s => ({
                ...s,
                canSubmit: false,
            }));
        }
    }, [input]);
    return (
        <StyledMaking>
            <Container>
                <Input id="title" name="title" label={"제목"} placeholder={"제목 작성"} required={true} value={input.title} onInput={onInput} />
                <Input id="description" name="description" label={"설명"} placeholder={"설명 작성"} required={true} value={input.description} onInput={onInput} />
                <Input type="radio" id="status" name="status" label={"공개 여부 설정"} placeholder={"설명 작성"} value={input.status} data={[
                    { label: "공개", value: "public" },
                    { label: "일부 공개", value: "unlisted" },
                    { label: "비공개", value: "secret" },
                ]} required={true} onInput={onInput} />
                <StyledLabel className="custom-label">이미지 업로드</StyledLabel>
                <ImageUploadBtn callbackBeforeUpload={callbackBeforeUpload} />
                {input.images.length !== 0 && <>
                    <Input addClassList={["input-search"]} theme="search" id="search" name="search" placeholder={"검색"} required={true} value={input.search} onInput={onInputSearch} />
                    <div className="list">
                        {input.images.filter(x => (input.search !== "" ? x.name.includes(input.search) : true)).map((candidate, idx) =>
                            <Candidate status={candidate.status} key={idx} theme="making" src={candidate.src} name={candidate.name} />)}
                    </div>
                </>}
                <button className={["submit-btn", (state.canSubmit ? "can-submit" : null)].join(" ")} type="submit" onClick={submitEventHandler}>
                    <span>등록하기</span>
                </button>
            </Container>
        </StyledMaking >
    );
}

export default Making;

const StyledMaking = styled.div`
    padding:1.5rem;
    margin-top: -1.5rem;
    .input{
        margin-bottom:2rem;
    }
    .container:first-of-type{
        display: flex;
        flex-direction: column;
        .input-search{
            margin-top:2rem;
        }
        .list{
            display:flex;
            flex-wrap:wrap;
            margin:0 -2rem;
        }
        .custom-label{
            display:block;
        }
        .submit-btn{
            display: flex;
            position:sticky;
            bottom:0;
            align-items: center;
            justify-content: center;
            width: calc(100% + 2.8rem);
            height:7rem;
            border:0;
            padding:0;
            background-color:transparent;
            border-radius:0 0 1.6rem 1.6rem;
            margin:0 -1.4rem -1.4rem;
            font-size:${props => props.theme.font.size.paragraph3};
            font-weight:${props => props.theme.font.weight.bold};
            color:${props => props.theme.color.gray800};
            cursor: not-allowed;
            border-top:1px solid ${props => props.theme.color.gray800};
            background-color:${props => props.theme.color.gray850};
            box-sizing:border-box;
            span{
                position: relative;
            }
            &.can-submit{
                cursor: pointer;
                span{
                    color:${props => props.theme.color.foreground};
                }
                &::before{
                    content:"";
                    position: absolute;
                    left:0;
                    bottom:0;
                    top:0;
                    right:0;
                    box-sizing:border-box;
                    border-image:${props => props.theme.borderImage.bottom} 27 fill / 27px;
                }
            }
        }
    }
`;