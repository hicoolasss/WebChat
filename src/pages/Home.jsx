import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UseAnimations from 'react-useanimations';

import settings from 'react-useanimations/lib/settings';

import search_icon from "react-useanimations/lib/searchToX"

import avatar from "../resources/images/test_avatar.jpg"
import '../style/home.css'


const Home = () => {
    return (
        <div className="container">
            <nav className="navbar">
                <button className="button_for_avatar" >
                    <img className="avatar" src={avatar} alt="avatar" />
                </button>
                <div className="wrapper">
                    <div className="box_for_btn">
                        <button>
                            <svg
                                width="40px"
                                height="40px"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="#b1b9c8"
                            >
                                <path
                                    d="M7.5 22a5.5 5.5 0 10-4.764-2.75l-.461 2.475 2.475-.46A5.474 5.474 0 007.5 22z"
                                    stroke="#b1b9c8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.282 17.898A7.946 7.946 0 0018 16.93l3.6.67-.67-3.6A8 8 0 106.083 8.849"
                                    stroke="#b1b9c8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>


                        </button>
                        <p className="text_for_btn">All Chats</p>
                    </div>

                    <div className="box_for_btn">

                        <Link to={"/friends"}>
                            <button>
                                <svg
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    color="#b1b9c8"
                                >
                                    <path
                                        d="M7 18v-1a5 5 0 015-5v0a5 5 0 015 5v1M1 18v-1a3 3 0 013-3v0M23 18v-1a3 3 0 00-3-3v0M12 12a3 3 0 100-6 3 3 0 000 6zM4 14a2 2 0 100-4 2 2 0 000 4zM20 14a2 2 0 100-4 2 2 0 000 4z"
                                        stroke="#b1b9c8"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </Link>

                        <p className="text_for_btn">Friends</p>
                    </div>

                    <div className="box_for_btn">
                        <button id="settings_btn">
                            <svg
                                width="40px"
                                height="40px"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="#b1b9c8"
                            >
                                <path
                                    d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                                    stroke="#b1b9c8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z"
                                    stroke="#b1b9c8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <p className="text_for_btn">Settings</p>
                    </div>


                    <div className="box_for_btn">
                        <button>
                            <svg
                                width="40px"
                                height="40px"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="#b1b9c8"
                            >
                                <path
                                    d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-5.918-3.805a2 2 0 00-2.164 0L5 21z"
                                    stroke="#b1b9c8"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </button>
                        <p className="text_for_btn">Saved</p>
                    </div>

                </div>



                <div className="box_for_btn" id="Log_out_box">
                    <button>
                        <svg
                            width="40px"
                            height="40px"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#b1b9c8"
                        >
                            <path
                                d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1"
                                stroke="#b1b9c8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <p className="text_for_btn">Log out</p>
                </div>
            </nav>
            <div className="main_window">
                <div className="scrollbar_window">

                    <div className="searchbar_box">
                        <input type="text" className="searchbar_input" placeholder="Search"></input>
                        <UseAnimations className="searchbar_icon" animation={search_icon} size={40} strokeColor="#DFEAFF" speed={1} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;