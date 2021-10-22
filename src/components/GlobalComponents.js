import React from 'react';
import Loading from "../components/Loading";
import { ImageModal } from './Modal';
import useGlobal from '../hook/useGlobal';
import { useSelector } from 'react-redux';

function GlobalComponents() {
    const { setModal } = useGlobal();
    const { globalReducer: global } = useSelector(s => s);
    const closeModal = () => {
        setModal(false);
    }
    const imageModalAttr = {
        ...global.modal,
        closeModal
    }
    return (
        <>
            {<Loading loading={global.loading} />}
            {global.modal?.on && <ImageModal {...imageModalAttr} />}
        </>
    );
}

export default GlobalComponents;