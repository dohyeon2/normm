import React from 'react';
import styled from 'styled-components';

function Profile() {
    return (
        <StyledProfile>
            <div className="name">

            </div>
            <div className="image">
                <img src="" alt="" />
            </div>
        </StyledProfile>
    );
}

export default Profile;

const StyledProfile = styled.div`
    display: flex;
    align-items: center;
    .image{
        width: 38px;
    }
`;