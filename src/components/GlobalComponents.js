import React from 'react';
import Loading from "../components/Loading";
import { ImageModal } from './Modal';
import useGlobal from '../hook/useGlobal';
import { useSelector } from 'react-redux';
import IWCmodal from './Modal';
import useTournament from '../hook/useTournament';
import useRedirect from '../hook/useRedirect';

function GlobalComponents() {
    const { setModal } = useGlobal();
    const { globalReducer: global } = useSelector(s => s);
    const { generateIWCTournament } = useTournament();
    const { setPush } = useRedirect();
    const closeModal = (type = 'modal') => () => {
        setModal(false, {}, type);
    }
    const startTournament = async (idx, round) => {
        const res = await generateIWCTournament(idx, round);
        setPush('/tournament/' + res.data.tournament_id);
        setModal(false, {}, 'IWCmodal');
    }
    const imageModalAttr = {
        ...global.modal?.data,
        closeModal: closeModal()
    }
    const IWCmodalAttr = {
        ...global.IWCmodal?.data,
        closeModal: closeModal("IWCmodal"),
        startTournament
    };
    return (
        <>
            {<Loading loading={global.loading} />}
            {global.modal?.on && <ImageModal {...imageModalAttr} />}
            {global.IWCmodal?.on && <IWCmodal {...IWCmodalAttr} />}
        </>
    );
}

export default GlobalComponents;