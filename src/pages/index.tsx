import MainMenu from '@edcarlos/libs/@edcartech/components/MainMenu';
import { Container } from "@nextui-org/react";
import Button from "@mui/material/Button";
import data from '@edcarlos/libs/@edcartech/local-data/data';
import ImageSliders from '@edcarlos/libs/@edcartech/components/ImageSliders';
import HeroSlipWithImage from '@edcarlos/libs/@edcartech/components/HeroSlipWithImage';
import CardSection from '@edcarlos/libs/@edcartech/components/CardSection';
import AppPage from '@edcarlos/hoc/DefaultPage/index';
import asyncComponent from '@edcarlos/utility/asyncComponent';


export default function index() {
    const slideData = data.images;
    return (
        <>
            <MainMenu />
            <HeroSlipWithImage slideData={slideData} />
            <CardSection />
        </>
    );
}



// const Maintenance = asyncComponent(() => import('modules/errorPages/Maintenance'));
// export default AppPage(() => <Maintenance />);
