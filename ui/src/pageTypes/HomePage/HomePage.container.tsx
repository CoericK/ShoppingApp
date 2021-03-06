import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../socket';

import { StoreFront, OtherStoreFront } from '../../partials';

import HomePage from './HomePage';

const HomePageContainer = () => {
    const [store, setStore] = useState(<StoreFront />);

    const [cartOpen, setCartOpen] = useState(false);

    const params = useParams();

    const cartRef = useRef<HTMLDivElement>();

    const handleOutsideClick = (e: any) => {
        if (cartRef.current === null || cartRef.current === undefined) { return }

        if (cartRef.current.contains(e.target)) { return }
        setCartOpen(false)
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return function cleanup() {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    const handleNextClick = () => {
        setStore(<OtherStoreFront />);
    }

    useEffect(() => {
        socket(params.id);
    });

    return (
        <HomePage
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            cartRef={cartRef}
            handleNextClick={handleNextClick}
            store={store}
        />
    )
}

export default HomePageContainer;