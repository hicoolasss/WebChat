import React, {useContext} from "react";
import '../style/home.css'

import { Link } from "react-router-dom";
import UseAnimations from 'react-useanimations';

import search_icon from "react-useanimations/lib/searchToX"

import avatar from "../resources/images/test_avatar.jpg"

import { Context } from "../index";

import { useNavigate } from "react-router-dom";




const Home = () => {

    const { store } = useContext(Context);

    const navigate = useNavigate();
    return (
       
            <div className="main_window">
                <div className="scrollbar_window">

                    <div className="searchbar_box">
                        <input type="text" className="searchbar_input" placeholder="Search"></input>
                        <UseAnimations className="searchbar_icon" animation={search_icon} size={40} strokeColor="#DFEAFF" speed={1} />
                    </div>
                    
                </div>
            </div>
        
    );
}

export default Home;