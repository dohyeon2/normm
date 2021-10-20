import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tag from '../components/Tag';
import { readIWC } from '../apis/iwc';
import IWC from '../components/IWC';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/global';

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
        tagList: TAG_LIST,
        loading: false,
        data: null,
        error: false,
    };
    const [state, setState] = useState(INITIAL_STATE);
    const dispatch = useDispatch();
    useEffect(() => {
        if (state.data === null) {
            setState(s => ({
                ...s,
                loading: true,
            }));
        }
        if (state.loading) {
            (async () => {
                const IWCs = await readIWC({});
                setState(s => ({
                    ...s,
                    loading: false,
                    data: IWCs.data,
                }));
                dispatch(setLoading(false));
            })();
        }
    }, [state.loading]);
    return (
        <StyledMain>
            <div className="tag-container">
                {state.tagList.map((tag, idx) => <Tag key={idx} label={tag.label} />)}
            </div>
            <div className="iwc-list">
                {state.data?.posts.map(x => <IWC />)}
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