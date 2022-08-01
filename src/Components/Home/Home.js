import React from "react";
import { Nav } from "Components/Nav/Nav";
import { Hero } from "Components/Hero/Hero";
import { Categories } from "Components/Categories/Categories";
import { Items } from "Components/Items/Items";
import { Stack } from "@mui/material";
import { Footer } from "Components/Footer/Footer";
import { Betaling } from "Util/Fab";
import { SubCategories } from "Components/Categories/SubCategories";

import { useNavigate, useLocation } from "react-router-dom";
import { Terms } from "Components/Conditions/Terms";
import { PrivacyPolicy } from "Components/Conditions/Privacy";

export const Home = () => {

    const navigate = useNavigate();

    const { pathname } = useLocation();

    return (
        <React.Fragment>
            <div style={{ position: 'relative' }}>
                <Nav />
                {
                    (pathname == '/terms') ? <Terms />
                        :
                        (pathname == '/privacy') ? <PrivacyPolicy />
                            :
                            <React.Fragment>
                                <Hero />
                                <Categories />
                                <SubCategories />
                                <Items />
                                <Betaling />
                            </React.Fragment>
                }
                <Footer />
            </div>
        </React.Fragment>
    );
}