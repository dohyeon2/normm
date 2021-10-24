import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useUser from '../hook/useUser';

export function Author({
    image,
    name,
}) {
    return (<StyledAuthor>
        <div className="author-img" style={{
            backgroundImage: `url("${image}")`
        }} />
        <div className="author-name">{name}</div>
    </StyledAuthor>);
}

function Profile({
    onlyImage,
    id = 0,
    image = "/images/default_profile.png",
    size
}) {
    const { getUser } = useUser();
    const INITIAL_STATE = {
        image: image || "/images/default_profile.png",
        name: "익명",
    };
    const [state, setState] = useState(INITIAL_STATE);
    useEffect(() => {
        if (id) {
            (async () => {
                const res = await getUser(id);
                setState(s => ({
                    ...s,
                    image: res?.profile_image,
                    name: res?.name,
                }));
            })();
        }
    }, [id]);
    return (
        <StyledProfile className="profile">
            {!onlyImage && <div className="name">
                {state.name}
            </div>}
            <div className="image" style={{
                width: size,
                height: size,
            }}>
                <img src={state.image} alt="" />
            </div>
        </StyledProfile>
    );
}

export default Profile;

const StyledAuthor = styled.div`
    display: flex;
    align-items: center;
    .author-img{
        width:32px;
        height:32px;
        border-radius: 99px;
        background-color: ${props => props.theme.color.gray100};
        margin-right:0.65rem;
        background-size: cover;
        background-position: center;
    }
    .author-name{
        font-size:${props => props.theme.font.size.paragraph2};
        font-weight:${props => props.theme.font.weight.bold};
        color:${props => props.theme.color.gray100};
    }
`;

const StyledProfile = styled.div`
    display: flex;
    align-items: center;
    .name{
        font-size:1.2rem;
        color:${props => props.theme.color.secondary};
        margin-right: 9.8px;
        font-weight:${props => props.theme.font.weight.bold};
        font-family:${props => props.theme.font.family};
    }
    .image{
        width: 38px;
        height:38px;
        border-radius:99px;
        overflow: hidden;
        img{
            width:100%;
            height:100%;
        }
    }
`;