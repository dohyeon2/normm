import React, { useState } from 'react';
import styled from 'styled-components';

function Profile() {
    const INITIAL_STATE = {
        image: "/images/default_profile.png",
        name: "익명",
    };
    const [state] = useState(INITIAL_STATE);
    return (
        <StyledProfile>
            <div className="name">
                {state.name}
            </div>
            <div className="image">
                <img src={state.image} alt="" />
            </div>
        </StyledProfile>
    );
}

export default Profile;

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