import React, { useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';

function makeTagObject(label, checked = false) {
    return {
        label: label,
        checked: checked,
    }
}

function Main() {
    const TAG_LIST = [
        makeTagObject("#랜덤"),
        makeTagObject("#인기순"),
        makeTagObject("#최신순"),
        makeTagObject("#좋아요_누른_월드컵"),
        makeTagObject("#댓글_단_월드컵"),
        makeTagObject("#내가_만든_월드컵"),
        makeTagObject("#내_친구가_만든_월드컵"),
    ];
    const INITIAL_STATE = {
        tagList: TAG_LIST
    };
    const [state] = useState(INITIAL_STATE);
    return (
        <StyledMain>
            <div className="tag-container">
                {state.tagList.map((tag, idx) => <Tag key={idx} label={tag.label} />)}
            </div>
        </StyledMain>
    );
}

export default Main;

const StyledMain = styled.div`
    padding:1.5rem;
    margin-top: -1.5rem;
    .tag-container{
        display: flex;
        margin: 0 -0.65rem;
        .tag{
            white-space: nowrap;
            margin:0 0.5rem;
        }
    }
`;