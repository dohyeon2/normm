import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function ImageUploadBtn({
    id = "image-upload-btn",
    name = "files[]",
    callbackBeforeUpload
}) {
    const CAPTIONS = {
        ready: "클릭하여 업로드",
    };
    const INITIAL_STATE = {
        isAdvancedUpload: false,
        caption: CAPTIONS.ready,
        state: "ready",
        proceed: 0,
        filecount: 0,
    }
    const [state, setState] = useState(INITIAL_STATE);
    const classList = ["image-upload-container"];
    const formRef = useRef();
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const onDragOverEnter = (e) => {
        preventDefaults(e);
        setState(s => ({
            ...s,
            state: "over",
        }));
    }
    const onDragEnd = (e) => {
        preventDefaults(e);
        setState(s => ({
            ...s,
            state: INITIAL_STATE.state,
        }));
    }
    const onDrop = (e) => {
        preventDefaults(e);
        onDragEnd(e);
        const files = e.dataTransfer.files;
        uploadFiles(files);
    }
    const onInput = (e) => {
        const files = e.target.files;
        uploadFiles(files);
    }
    const uploadFiles = (files) => {
        const formData = new FormData();
        const len = files.length;
        for (let i = 0; i < len; i++) {
            const currentFile = files[i];
            callbackBeforeUpload(currentFile);
        }
    }
    useEffect(() => {
        //기능이 있는지 확인합니다.
        const isAdvancedUpload = function () {
            const div = document.createElement('div');
            const result = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
            div.remove();
            return result;
        }();
        //기능이 있다면
        if (isAdvancedUpload) {
            CAPTIONS.ready = "드래그 앤 드롭하거나 클릭하여 업로드";
            setState(s => ({
                ...s,
                isAdvancedUpload: isAdvancedUpload,
                caption: CAPTIONS[s.state],
            }));
        }
    }, []);
    return (
        <StyledImageUploadBtnContainer className={[...classList, state.state]}>
            <div
                ref={formRef}
                onDragOver={onDragOverEnter}
                onDragEnter={onDragOverEnter}
                onDrag={preventDefaults}
                onDragStart={preventDefaults}
                onDragEnd={onDragEnd}
                onDragLeave={onDragEnd}
                onDrop={onDrop}
            >
                <label htmlFor={id}>
                    <img className="icon" src="/images/file_upload_icon.png" />
                    <div className="caption">{state.caption}</div>
                </label>
                <input type="file" name={name} id={id} multiple accept="image/*" onInput={onInput} />
            </div>
        </StyledImageUploadBtnContainer >
    );
}

export default ImageUploadBtn;

const StyledImageUploadBtnContainer = styled.div`
    background-color: ${props => props.theme.color.gray800};
    margin: 0 -1.4rem;
    padding: 0.7rem;
    transition:background-color .2s ease-in-out;
    input{
        display: none;
    }
    label{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding:3.6rem 0;
        cursor:pointer;
        border:2px dashed ${props => props.theme.color.gray600};
    }
    .icon{
        margin-bottom:1.2rem;
    }
    .caption{
        text-align:center;
        font-size:${props => props.theme.font.size.paragraph2};
        font-weight:${props => props.theme.font.weight.bold};
        color:${props => props.theme.color.gray600};
    }
    &:hover,
    &.over{
        background-color: ${props => props.theme.color.foreground};
    }
`;