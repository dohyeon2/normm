import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Profile from './Profile';
import useTournament from '../hook/useTournament';
import CustomLink from './CustomLink';
import { useHistory } from 'react-router';
import { LoginBtn } from './Btns';
import useUser from '../hook/useUser';

function Appbar() {
    const history = useHistory();
    const { user } = useUser();
    const { tournamentData } = useTournament();
    const currentPage = history.location.pathname.split('/')[1] === "tournament";

    if (!tournamentData?.tournament?.is_done && currentPage) {
        const tournament = tournamentData?.tournament;
        const getRoundName = (round) => {
            if (round > 4) {
                return round + "강";
            }
            if (round > 2) {
                return "준결승";
            }
            return "결승";
        }
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
                    <div className="IWC-title">{tournament?.IWC_title}</div>
                </div>
                <div className="right">
                    <div className="round-indicator">
                        <div className="current-round">
                            {getRoundName(tournament?.current_round)}
                        </div>
                        <div className="line"></div>
                        <div className="current-match">
                            {tournament?.match_count} /
                            {tournament?.all_match_count}
                        </div>
                    </div>
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
                {user ? <Profile id={user.id} /> : <LoginBtn />}
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
    z-index:9;
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
    .round-indicator{
        display:flex;
        font-size:${props => props.theme.font.size.paragraph2};
        color: ${props => props.theme.color.foreground};
        font-weight: ${props => props.theme.font.weight.extraBold};
        align-items:center;
        .line{
            border-top:1px solid ${props => props.theme.color.primary};
            width:14px;
        }
        .current-match,
        .current-round{
            padding:.6rem 1.4rem;
            border-radius:9.9rem;
        }
        .current-round{
            background-color:${props => props.theme.color.primary};
        }
        .current-match{
            border:1px solid ${props => props.theme.color.primary};
            color: ${props => props.theme.color.secondary};
        }
    }
`;