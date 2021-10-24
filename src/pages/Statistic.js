import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useIWC from '../hook/useIWC';
import useLoading from '../hook/useLoading';
import StatisticComponent from '../components/StatisticComponent';
import { Error404 } from './ErrorPage';

function Statistic() {
    const params = useParams();
    const IWC_id = params.id;
    const { getIWC } = useIWC();
    const { setLoading } = useLoading();
    const INITIAL_STATE = {
        loading: true,
        data: null,
        error: false,
    }
    const [state, setState] = useState(INITIAL_STATE);
    useEffect(() => {
        if (state.loading) {
            (async () => {
                try {
                    const res = await getIWC({ id: IWC_id });
                    setState(s => ({
                        ...s,
                        data: res.data,
                        loading: false,
                    }));
                } catch (e) {
                    window.alert(e?.response?.data?.message);
                }
                setLoading(false);
            })();
        }
    }, [state.loading]);
    if (state.loading) return null;
    if (!state.data) return null;
    if (state.data.IWC.id === null || state.data.IWC === false) return <Error404 />;
    return (
        <StatisticComponent IWC={state.data} />
    );
}

export default Statistic;