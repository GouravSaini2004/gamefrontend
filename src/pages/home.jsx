import React from 'react';
import Hero from '../component/hero';
import Game from '../component/game';
import Guide from '../component/guide';
import Card from '../component/card';
import Footer from '../component/footer';


function Home() {
    return (
        <>
            <Hero />
            <Game />
            <Guide />
            <Card />
            <Footer />
        </>
    );
}

export default Home;