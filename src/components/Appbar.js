import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Profile from './Profile';
import useTournament from '../hook/useTournament';
import CustomLink from './CustomLink';
import { useHistory } from 'react-router';

function Appbar() {
    const history = useHistory();
    const { tournamentData } = useTournament();
    if (!tournamentData?.tournament?.is_done && history.location.pathname.split('/')[1] === "tournament") {
        return (
            <StyledAppbar id="appbar">
                <div className="left">
                    <CustomLink to={-1}>
                        <div className="prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </svg>
                        </div>
                    </CustomLink>
                    <div className="IWC-title">{tournamentData?.tournament?.IWC_title}</div>
                </div>
                <div className="right">
                    <Profile />
                </div>
            </StyledAppbar>
        );
    }
    return (
        <StyledAppbar id="appbar">
            <div className="left">
                <Logo />
            </div>
            <div className="right">
                <Profile />
            </div>
        </StyledAppbar>
    );
}

export default Appbar;

const StyledAppbar = styled.div`
    font-family: 'NanumSquare';
    padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position:sticky;
    border-radius:0 0 1.2rem 1.2rem;
    background-color: ${props => props.theme.color.background};
    z-index:99;
    top:0;
    .left{
        display:flex;
        align-items: center;
    }
    .prev{
        cursor:pointer;
        margin-right:1rem;
        path{
            fill:${props => props.theme.color.primary};
        }
    }
    .IWC-title{
        font-size:${props => props.theme.font.size.paragraph3};
        color: ${props => props.theme.color.secondary};
    }
    /* //min-width 800px
    @media screen and (min-width:${props => props.theme.mobileBreakPoint}px){
        padding: 40px 50px;
    } */
`;