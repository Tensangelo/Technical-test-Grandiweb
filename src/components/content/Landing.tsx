import { useEffect, useState } from 'react';

import Style from '@/styles/content/landing.module.scss';
import Carousel from '../tools/Carousel';
// Api
import ApiProducts from '@/utils/apiProducts';

interface Product {
    id: string;
    title: string;
    description: string;
    stars: number;
    imageUrl: string;
    numericTags: number[];
    price: {
        max: {
            amount: string;
            currencyCode: string;
        };
        min: {
            amount: string;
            currencyCode: string;
        };
    };
}

const LandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    const getProducts = async () => {
        const productsData = await ApiProducts();
        setProducts(productsData);
    };

        getProducts();
    }, []);

    return (
        <section className={Style.mainLanding}>
            <article className={Style.contentTitle}>
                <p>Discover our</p>
                <p>planet-friendly offer</p>
                <div className={Style.formOval} />
            </article>
            <Carousel productsList={products} />
            <div className={Style.containerMidLanding}>
                <button>Browse all products</button>
            </div>
            <section className={Style.containerFinalLanding}>
                <article>
                    <p>Join the green revolution without commitment</p>
                    <p>If you are missing something and don´t want to miss future promotions or our future products</p>
                </article>
                <form>
                    <input type='email' placeholder='Your Email' />
                    <button type='submit'>Send</button>
                </form>
                <div className={Style.greenPill} />
                <div className={Style.pinkPill} />
                <div className={Style.grayPill} />
                <div className={Style.blurPill} />
                <div className={Style.bluePill} />
            </section>
        </section>
    )
}

export default LandingPage;