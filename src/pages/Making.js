import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../components/Container';
import Input, { StyledLabel } from '../components/Input';
import ImageUploadBtn from '../components/ImageUploadBtn';
import Candidate from '../components/Candidate';
import { uploadFile } from '../apis/file';
import { createIWC } from '../apis/iwc';
import useLoading from '../hook/useLoading';
import { useParams } from 'react-router';
import useIWC from '../hook/useIWC';
import useCnadidate from '../hook/useCandidate';

function Making() {
    const params = useParams();
    const { getCandidates } = useCnadidate();
    const { getIWC } = useIWC();
    const INITIAL_INPUT = {
        IWC_id: 0,
        title: "",
        description: "",
        status: "",
        search: "",
        candidates: {},
        deletedCandidates: [],
    };
    const INITIAL_IMAGE_OBJ = {
        name: "",
        src: "",
        state: "",
    };
    const INITIAL_STATE = {
        canSubmit: false,
    };
    const { setLoading } = useLoading();
    const [input, setInput] = useState(INITIAL_INPUT);
    const [state, setState] = useState(INITIAL_STATE);
    const submitEventHandler = async (e) => {
        e.preventDefault();
        const requestData = {
            IWC_id: input.IWC_id,
            title: input.title,
            description: input.description,
            status: input.status,
            deletedCandidates: input.deletedCandidates,
            candidates: Object.values(input.candidates).map(x => ({
                id: x.attachment_id,
                title: x.name,
            })),
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
            case "IWC_id":
            case "search":
            case "deletedCandidates":
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
        const attachment_id = temp[id].attachment_id;
        delete temp[id];
        setInput(s => ({
            ...s,
            candidates: temp,
            deletedCandidates: [
                ...s.deletedCandidates,
                attachment_id,
            ]
        }));
    }
    useEffect(() => {
        if (params.id) {
            (async () => {
                const id = params.id;
                const IWC = await getIWC({ id: id });
                const candidates = await getCandidates({ post_id: id, nopaging: true });
                setInput(s => ({
                    ...s,
                    title: IWC.data.IWC.title,
                    description: IWC.data.IWC.description,
                    status: IWC.data.IWC.status,
                    IWC_id: IWC.data.IWC.id,
                    candidates: ((candidates) => {
                        const result = {};
                        const temp_candidates = candidates;
                        for (let i = 0, len = candidates.length; i < len; i++) {
                            const curr = candidates[i];
                            curr.attachment_id = curr.id;
                            curr.state = "uploaded";
                            result[curr.id] = curr;
                        }
                        return result;
                    })(candidates.data.candidates),
                }));
            })();
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(input);
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
                <ImageUploadBtn startId={Object.keys(input.candidates).length !== 0 ? Math.max(
                    ...(Object.keys(input.candidates))
                ) : 0} callbackBeforeUpload={callbackBeforeUpload} callbackAfterUpload={callbackAfterUpload} />
                {Object.values(input.candidates).length !== 0 && <>
                    <Input addClassList={["input-search"]} theme="search" id="search" name="search" placeholder={"검색"} required={true} value={input.search} onInput={onInputSearch} />
                    <StyledList>
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
                    </StyledList>
                </>}
                <StyledSubmitBtn className={["submit-btn", (state.canSubmit ? "can-submit" : null)].join(" ")} type="submit" onClick={submitEventHandler}>
                    <span>등록하기</span>
                </StyledSubmitBtn>
            </Container>
        </StyledMaking >
    );
}

export default Making;

export const StyledSubmitBtn = styled.button`
        display: flex;
        position:sticky;
        bottom:0;
        align-items: center;
        justify-content: center;
        width: 100%;
        height:7rem;
        border:0;
        padding:0;
        background-color:transparent;
        border-radius:0 0 1.6rem 1.6rem;
        font-size:${props => props.theme.font.size.paragraph4};
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
`;

const StyledMaking = styled.div`
    padding:1.5rem;
    margin-top: -1.5rem;
    .input{
        margin-bottom:2rem;
    }
    .submit-btn{
        width: calc(100% + 2.8rem);
        margin:0 -1.4rem -1.4rem;
    }
    .container:first-of-type{
        display: flex;
        flex-direction: column;
        .input-search{
            margin-top:2rem;
        }
        .custom-label{
            display:block;
        }
        
    }
`;

export const StyledList = styled.div`
            display:flex;
            flex-wrap:wrap;
            margin:0 -2rem;
            @media screen and (min-width:1280px){
                .candidate{
                    width: calc(50% - 4rem);
                }
            }
`;