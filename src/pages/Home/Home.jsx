import React from 'react';
import { CiCircleMore } from "react-icons/ci";

import { Link } from 'react-scroll';

import './Home.css';
import ProfitCycle from './ProfitCycle';
import Pricing from './Pricing';
import FAQs from './FAQs';

import CTA from './CTA';

import Scroll from '@/components/Scroll/Scroll';
import Tips from './Tips';

const Home = () => {
    return (
        <>
            <section id="home-section" className="home-section hero-section">
                <div className="home-container px-4 md:px-8">
                    <div className="home-inner-container w-full mx-auto">
                        <header className="home-header pb-14 pt-8 md:pb-20 md:px-28">
                            <div className="home-title text-center">
                                <div className="home-title-inner w-full max-w-3xl mx-auto">
                                    <div className="home-title-text mt-0 ml-0 mr-0 m-6">
                                        <h1 className="home-title-heading font-semibold leading-tight custom-font-size text-black">
                                            Boost Your Crypto Profits
                                            &amp; Like Never Before
                                            <br />
                                        </h1>
                                    </div>
                                    <div className="home-subtitle w-full max-w-6xl mx-auto">
                                        <div className="home-subtitle-text text-lg md:text-xl text-black">
                                            Powered by the World’s First Pair-Based Arbitrage Algorithm
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="home-buttons mb-0 ml-0 mr-0 m-12">
                                <div className="home-buttons-container gap-3 flex-wrap items-center flex justify-center">
                                    <div className="home-button-wrapper max-w-full-mobile-landscape">
                                        <Link to="how-it-works-section"
                                            smooth={true}
                                            duration={500} className=" cursor-pointer home-button gap-2 border border-black bg-black text-white text-center whitespace-nowrap rounded-md justify-center items-center py-4 px-7 font-medium transition-all flex shadow-sm text-lg hover:bg-gray-800 hover:border-gray-800">
                                            <div > Profitable Unique Signals

                                            </div>
                                        </Link>
                                    </div>
                                    <div className="home-button-wrapper max-w-full-mobile-landscape">
                                        <Link to="pricing-section"
                                            smooth={true}
                                            duration={500} className="home-button-secondary cursor-pointer gap-2 border border-gray-800 bg-white text-gray-800 text-center whitespace-nowrap rounded-md justify-center items-center py-4 px-7 font-medium transition-all flex shadow-sm text-lg relative hover:bg-gray-800 hover:text-white hover:border-gray-800">
                                            <div className='flex items-center'>Simple and Low Pricing</div>
                                            <span className="bg-black text-white text-xs font-bold rounded-sm px-2 py-1">
                                                60% off
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                </div>
            </section>

            <section className="home-section-included arbitrage-section">
                <div className="home-container px-4 md:px-8">
                    <div className="home-inner-container w-full mx-auto">
                        <article className="home-content py-16 md:pb-20 md:px-28">
                            <header className="home-content-header mt-0 ml-0 mr-0 m-12">
                                <div className="home-content-title text-center">
                                    <div className="home-content-title-inner w-full max-w-6xl mx-auto">
                                        <div className="home-content-title-text mt-0 ml-0 mr-0 m-4">
                                            <h2 className="home-content-heading text-4xl font-semibold leading-tight text-black">
                                                Unlock Profitable Arbitrage with Confidence
                                            </h2>
                                        </div>
                                        <div className="home-content-description text-lg text-gray-600">
                                            Secure, actionable signals. Your wallet, your trades, your profits—100% in your control. Powered by cutting-edge data science and industry-first logic for consistent, reliable profits.
                                        </div>
                                        <div className='home-content-descrption text-3xl leading-tight pt-10'>
                                            <h2 className="home-content-heading text-3xl md:text-4xl font-semibold leading-tight pb-6 text-black">
                                                Arbitrage Signals
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="home-content-flex flex flex-col md:flex-row gap-6">
                                <div className="home-content-item justify-center items-center text-center gap-4 rounded-lg flex-col p-5 md:p-10 flex bg-[hsl(0,0%,95%)] min-h-[250px]">
                                    <div className="home-content-item-title mb-2 text-center">
                                        <h2 className='home-content-item-heading text-lg sm:text-xl md:text-2xl font-medium text-black mb-2 '>ArbiPair</h2>
                                    </div>
                                    <div className="home-content-item-description text-sm sm:text-base md:text-lg text-gray-600 text-left">
                                        Access cryptocurrency price lists highlighting the highest and lowest prices across multiple exchanges
                                    </div>
                                    <div className="home-content-item-button-container gap-2 flex-wrap items-center flex justify-center">
                                        <a className="home-content-item-button gap-2 border bg-white text-gray-800 text-center whitespace-nowrap rounded-md justify-center items-center py-2 px-3 font-medium transition-all flex shadow-sm text-sm sm:text-base md:text-lg  ">
                                            <div>Discover Price Differences</div>
                                        </a>
                                    </div>
                                </div>

                                <div className="home-content-item rounded-lg justify-center items-center text-center gap-4 flex-wrap flex-col p-5 md:p-10 flex bg-[hsl(0,0%,95%)] min-h-[250px]">
                                    <div className="home-content-item-title mb-2 text-center">
                                        <h2 className="home-content-item-heading text-lg sm:text-xl md:text-2xl font-medium text-black mb-2 ">ArbiTrack</h2>
                                    </div>
                                    <div className="home-content-item-description text-sm sm:text-base md:text-lg text-gray-600 text-left ">
                                        Leverage Arbilo’s exclusive algorithm to find the most profitable trading pairs and exchanges
                                    </div>
                                    <div className="home-content-item-button-container gap-2 flex-wrap items-center flex justify-center">
                                        <a className="home-content-item-button gap-2 border bg-white text-gray-800 text-center whitespace-nowrap rounded-md justify-center items-center py-2 px-3 font-medium transition-all flex shadow-sm text-sm sm:text-base md:text-lg ">
                                            <div>Unique Arbitrage Pairs</div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </article>
                    </div>
                </div>
            </section>
            <section id="how-it-works-section" className='how-it-works-section' >
                <article className="home-content-title text-center py-10">
                    <header className="home-content-title-inner w-full max-w-6xl mx-auto">
                        <div className="home-content-title-text pb-10">
                            <h2 className="home-content-heading text-3xl md:text-4xl font-semibold leading-tight pb-6 text-black">
                                How ArbiPair Works

                            </h2>
                            <p className='text-gray-500 pb-6 text-center text-lg md:text-xl px-10 md:px-40'>
                                Find the best signal with good profit %. The signal will include a list of coin pairs and exchange pairs with clear profit opportunities

                            </p>
                        </div>
                        <ProfitCycle />
                        <div className="home-content-title text-center py-10">
                            <div className="home-content-title-inner w-full max-w-6xl mx-auto">
                                <div className="home-content-title-text pb-10">
                                    <h2 className="home-content-heading text-3xl md:text-4xl font-semibold leading-tight text-black">
                                        Sample ArbiPair Signals

                                    </h2>
                                </div>
                                <div class="w-full signal_wrapper">
                                    <img src="/assets/images/arbisignal.png" alt="Capture" class="mx-auto" />
                                </div>
                            </div>
                        </div>
                    </header>
                </article>
            </section>

            <section className="pair-point-section ">
                <div className="home-container px-4 md:px-8">
                    <div className="home-inner-container w-full mx-auto">
                        <article className="home-header pb-14 md:pb-20 md:px-28">
                            <header className="home-title text-center">
                                <div className="home-title-inner w-full max-w-6xl mx-auto">
                                    <div className="home-subtitle w-full max-w-6xl mx-auto pb-10">
                                        <h1 className="pair-point-description font-semibold leading-tight text-2xl md:text-4xl text-black">
                                            How ArbiTrack Works

                                        </h1>
                                    </div>
                                    <div className="home-title-text mt-0 ml-0 mr-0 m-6">
                                        <div className="home-subtitle-text text-lg md:text-xl text-gray-500 pb-6">
                                            ArbiScan simplifies crypto arbitrage by leveraging price differences across exchanges. It helps you buy low, sell high, and reallocate funds for maximum profits effortlessly.
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-10 pb-10">
                                        <div className="box p-6 rounded-lg  text-center w-full md:w-1/2 flex flex-col items-center justify-start gap-5 bg-[hsl(0,0%,95%)]">

                                            <h2 className="text-base font-semibold text-black">1 : Buy at the Lowest Price</h2>
                                            <p className=" text-gray-700 text-start">
                                                Purchase Coin A at a low price on Exchange A using USDT or fiat, then transfer it to Exchange B.
                                            </p>
                                        </div>

                                        <div className="box p-6 rounded-lg  text-center w-full md:w-1/2 flex flex-col items-center justify-start gap-5 bg-[hsl(0,0%,95%)]">

                                            <h2 className="text-base font-semibold text-black">2 : Sell at the Highest Price</h2>
                                            <p className=" text-gray-700 text-start">
                                                Sell Coin A on Exchange B against USDT or fiat currency, capturing the price difference for profit.
                                            </p>
                                        </div>

                                        <div className="box p-6 rounded-lg  text-center w-full md:w-1/2 flex flex-col items-center justify-start gap-5 bg-[hsl(0,0%,95%)]">

                                            <h2 className="text-base font-semibold text-black ">3 : Prepare for the Next Trade</h2>
                                            <p className=" text-gray-700 text-start">
                                                Transfer USDT to the exchange with the next low-price signal or withdraw fiat directly to your bank, ready to seize the next profitable arbitrage opportunity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className='flex justify-center items-center text-lg  text-gray-500 pb-6 text-center'>
                                <p className='border-b-2 px-6 md:px-16 py-3'>
                                    *Remember to follow the best practices listed in the Tips section to get the most out of this.
                                </p>
                            </div>
                            <div className="home-content-title text-center py-10">
                                <div className="home-content-title-inner w-full max-w-6xl mx-auto">
                                    <div className="home-content-title-text pb-10">
                                        <h2 className="home-content-heading text-3xl md:text-4xl font-semibold leading-tight text-black">
                                            Sample ArbiTrack Signals

                                        </h2>
                                    </div>
                                    <div class="w-full signal_wrapper">
                                        <img src="/assets/images/arbitrack.png" alt="Capture" class="mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </article>

                    </div>
                </div>
            </section>


            <section id="pricing-section" className="pricing-section">
                <Pricing />
            </section>

            <section id="faq-section" className="faq-section">
                <FAQs />
            </section>
            <section className='tips' id='tips'>
                <Tips />
            </section>
            <section id="contact-section" className="contact-section">
                <CTA />
            </section>


            <Scroll />


        </>
    )
}

export default Home;