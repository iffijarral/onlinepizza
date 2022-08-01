import React, { useEffect,} from "react";

import { HeroCaption, HeroHeading, HeroSubHeading, HeroWrapper } from "Components/Hero/Hero.styles";

import useAppBarHeight from "Util/AppHeight";

import bgPizza from 'Images/h1.png';
import bgSalad from 'Images/salad-streched.png';
import bgPasta from 'Images/pasta-streched.png';
import bgSandwich from 'Images/sandwich-streched.png';

import { Stack } from "@mui/material";

export const Hero = () => {
    const [index, setIndex] = React.useState(0);
    const [imgList, setImgList] = React.useState([bgPizza, bgSandwich,bgPasta, bgSalad ]);
    const [quote, setQuote] = React.useState([
        'Så godt som hjemmelavet',
        'Hvert måltid er et glad måltid',
        'Bedste venner spiser din mad',
        'Gå lige op til god mad'
    ])

    useEffect(() => {

        const interval = setInterval(() => {

            //changeBackgroundImage();
            
        }, 8000);

        return () => {
            
            clearInterval(interval);
        };


    }, []);

    const changeBackgroundImage = () => {
        setIndex(prevIndex => {
            if(prevIndex === imgList.length - 1)
                return 0;
            else
                return prevIndex + 1;
        });
    }

    return (
        <React.Fragment>
            {console.log('i m here')}
            <HeroWrapper bgImage={imgList[index]} >
                <Stack zIndex={1}>
                    <HeroCaption variant="h5" fontWeight={900}>
                        Byens bedste spisested
                    </HeroCaption>
                    <HeroHeading variant="h2" fontWeight={900}>
                        {quote[index]}
                    </HeroHeading>
                    <HeroSubHeading variant="h4" fontWeight={900}>
                        Vi laver lækker, men sund mad, fordi vi holder af dig :)
                    </HeroSubHeading>
                </Stack>
            </HeroWrapper>

        </React.Fragment>
    );
}