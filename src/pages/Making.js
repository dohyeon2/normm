import React, { createElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Input, { StyledLabel } from '../components/Input';
import ImageUploadBtn from '../components/ImageUploadBtn';
import Candidate from '../components/Candidate';
import { uploadFile } from '../apis/file';
import { createIWC } from '../apis/iwc';

function Making() {
    const INITIAL_INPUT = {
        title: "",
        description: "",
        status: "",
        search: "",
        candidates: {},
    };
    const INITIAL_IMAGE_OBJ = {
        name: "",
        src: "",
        state: "",
    };
    const INITIAL_STATE = {
        canSubmit: false,
    };
    const [input, setInput] = useState(INITIAL_INPUT);
    const [state, setState] = useState(INITIAL_STATE);
    const submitEventHandler = async (e) => {
        e.preventDefault();
        const requestData = {
            title: input.title,
            description: input.description,
            status: input.status,
            candidates: Object.values(input.candidates).map(x => x.attachment_id),
        };
        const res = await createIWC(requestData);
    }
    const onInput = (e) => {
        const curr = e.target;
        setInput(s => ({
            ...s,
            [curr.name]: curr.value,
        }));
    }
    const callbackBeforeUpload = async (file, id) => {
        const name = file.name.split(".").slice(0, -1)[0];
        const src = URL.createObjectURL(file);
        const obj = {
            ...INITIAL_IMAGE_OBJ,
            id: id,
            name: name,
            src: src,
            state: "uploading",
        }
        setInput(s => ({
            ...s,
            candidates: {
                ...s.candidates,
                [id]: obj,
            }
        }));
    };
    const callbackAfterUpload = (id, src, attachment_id) => {
        setInput(s => ({
            ...s,
            candidates: {
                ...s.candidates,
                [id]: {
                    ...s.candidates[id],
                    attachment_id: attachment_id,
                    src: src,
                    state: "uploaded",
                }
            }
        }));
    };
    const onInputSearch = (e) => {
        const curr = e.target;
        setInput(s => ({
            ...s,
            [curr.name]: curr.value,
        }));
    };
    const changeImage = (id) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.oninput = async (e) => {
            const file = e.target.files[0];
            callbackBeforeUpload(file, id);
            const res = await uploadFile(file);
            callbackAfterUpload(id, res.data.src, res.data.attachment_id);
            input.remove();
        }
        input.click();
    }
    const validateHandler = (key, value) => {
        let result = true;
        switch (key) {
            case "search":
                break;
            case "candidates":
                if (Object.values(value).filter(x => x.state === "uploaded").length < 4) result = false;
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
    const nameChangeHandler = (e, id) => {
        const curr = e.target;
        const value = curr.value;
        setInput(s => ({
            ...s,
            candidates: {
                ...s.candidates,
                [id]: {
                    ...s.candidates[id],
                    name: value,
                }
            }
        }));
    }
    const deleteHandler = (id) => {
        const temp = { ...input.candidates };
        delete temp[id];
        setInput(s => ({
            ...s,
            candidates: temp,
        }));
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
                <Input id="title" name="title" label={"제목"} placeholder={"제목 작성(8자 이상)"} required={true} value={input.title} onInput={onInput} />
                <Input id="description" name="description" label={"설명"} placeholder={"설명 작성(8자 이상)"} required={true} value={input.description} onInput={onInput} />
                <Input type="radio" id="status" name="status" label={"공개 여부 설정"} value={input.status} data={[
                    { label: "공개", value: "publish" },
                    { label: "일부 공개", value: "draft" },
                    { label: "비공개", value: "pending" },
                ]} required={true} onInput={onInput} />
                <StyledLabel className="custom-label">이미지 업로드 (현재 {Object.values(input.candidates).length}개/최소 4개)</StyledLabel>
                <ImageUploadBtn callbackBeforeUpload={callbackBeforeUpload} callbackAfterUpload={callbackAfterUpload} />
                {Object.values(input.candidates).length !== 0 && <>
                    <Input addClassList={["input-search"]} theme="search" id="search" name="search" placeholder={"검색"} required={true} value={input.search} onInput={onInputSearch} />
                    <div className="list">
                        {Object.values(input.candidates).filter(x => (input.search !== "" ? x.name.includes(input.search) : (x !== null))).map(candidate =>
                            <Candidate
                                state={candidate.state}
                                key={candidate.id}
                                theme="making"
                                src={candidate.src}
                                name={candidate.name}
                                nameChangeHandler={(e) => {
                                    nameChangeHandler(e, candidate.id);
                                }}
                                imageChangeHandler={() => {
                                    changeImage(candidate.id);
                                }}
                                deleteHandler={() => {
                                    deleteHandler(candidate.id);
                                }}
                            />)}
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
            @media screen and (min-width:1280px){
                .candidate{
                    width: calc(50% - 4rem);
                }
            }
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