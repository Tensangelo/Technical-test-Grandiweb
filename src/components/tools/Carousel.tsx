import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
// Components
import Star from './Stars';
// Style
import StyleCarousel from '@/styles/tools/carousel.module.scss';

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

interface ProductListProps {
    productsList: Product[];
}

const Carousel = (propsProducts: ProductListProps) => {
    const cardSliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handlePrevClick = () => {
        const cardSlider = cardSliderRef.current;
        if (cardSlider) {
            cardSlider.scrollLeft -= cardSlider.offsetWidth;
        }
    };

    const handleNextClick = () => {
        const cardSlider = cardSliderRef.current;
        if (cardSlider) {
            cardSlider.scrollLeft += cardSlider.offsetWidth;
        }
    };

    useEffect(() => {
        const cardSlider = cardSliderRef.current;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setStartX(e.pageX - cardSlider!.offsetLeft);
            setScrollLeft(cardSlider!.scrollLeft);
        };

        const handleTouchStart = (e: TouchEvent) => {
            setIsDragging(true);
            setStartX(e.touches[0].pageX - cardSlider!.offsetLeft);
            setScrollLeft(cardSlider!.scrollLeft);
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const transferCount = e.pageX - cardSlider!.offsetLeft;
            const transferAnimation = 1.5;
            const walk = (transferCount - startX) * transferAnimation;
            cardSlider!.scrollLeft = scrollLeft - walk;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const transferCount = e.touches[0].pageX - cardSlider!.offsetLeft;
            const transferAnimation = 1.5;
            const walk = (transferCount - startX) * transferAnimation;
            cardSlider!.scrollLeft = scrollLeft - walk;
        };

            cardSlider!.addEventListener('mousedown', handleMouseDown);
            cardSlider!.addEventListener('touchstart', handleTouchStart);
            cardSlider!.addEventListener('mouseleave', handleMouseLeave);
            cardSlider!.addEventListener('mouseup', handleMouseUp);
            cardSlider!.addEventListener('touchend', handleTouchEnd);
            cardSlider!.addEventListener('mousemove', handleMouseMove);
            cardSlider!.addEventListener('touchmove', handleTouchMove);

        return () => {
            cardSlider!.removeEventListener('mousedown', handleMouseDown);
            cardSlider!.removeEventListener('touchstart', handleTouchStart);
            cardSlider!.removeEventListener('mouseleave', handleMouseLeave);
            cardSlider!.removeEventListener('mouseup', handleMouseUp);
            cardSlider!.removeEventListener('touchend', handleTouchEnd);
            cardSlider!.removeEventListener('mousemove', handleMouseMove);
            cardSlider!.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isDragging, startX, scrollLeft]);

	return (
		<>
			<section className={StyleCarousel.carousel}>
                <div className={StyleCarousel.buttonContainer}>
                    <div>
                        <button onClick={handlePrevClick}>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.54069 9.67825L5.53958 9.67704L2.56705 6.42731L1.94867 5.75126L2.56816 5.07623L5.5505 1.82649C5.55647 1.81999 5.57422 1.79329 5.57422 1.74365C5.57422 1.73655 5.57386 1.72992 5.57322 1.72375L1.9521 5.66953C1.94842 5.67354 1.94418 5.67942 1.94019 5.69014C1.93601 5.70134 1.93084 5.72151 1.93084 5.75237C1.93084 5.7872 1.94303 5.82165 1.96553 5.84988L5.56342 9.78084C5.56405 9.77471 5.56441 9.76813 5.56441 9.76109C5.56441 9.71145 5.54666 9.68476 5.54069 9.67825Z" fill="#555B64" stroke="#444950" strokeWidth="2"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button onClick={handleNextClick}>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.96322 9.67825L1.96433 9.67704L4.93685 6.42731L5.55523 5.75126L4.93574 5.07623L1.95341 1.82649C1.94743 1.81999 1.92969 1.79329 1.92969 1.74365C1.92969 1.73655 1.93005 1.72992 1.93069 1.72375L5.5518 5.66953C5.55548 5.67354 5.55972 5.67942 5.56372 5.69014C5.5679 5.70134 5.57307 5.72151 5.57307 5.75237C5.57307 5.7872 5.56088 5.82165 5.53837 5.84988L1.94049 9.78084C1.93986 9.77471 1.9395 9.76813 1.9395 9.76109C1.9395 9.71145 1.95725 9.68476 1.96322 9.67825Z" fill="#555B64" stroke="#444950" strokeWidth="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
				<div className={StyleCarousel.containerCarousel} ref={cardSliderRef}>
					<section className={StyleCarousel.mainCarousel}>
                        {propsProducts.productsList.map((listData: any) => {
                            return (
                                <div key={listData.id} className={StyleCarousel.containerCards}>
                                    <div className={StyleCarousel.containerImage}>
                                        <Image
                                            src={listData.imageUrl}
                                            alt={`Imagen del producto ${listData.title}`}
                                            width={318}
                                            height={320}
                                            draggable={false}
                                        />
                                        <button type='button'>
                                            Add to cart
                                        </button>
                                    </div>
                                    <article className={StyleCarousel.containerInfo}>
                                        <p>{listData.title}</p>
                                        <div className={StyleCarousel.containerDetails}>
                                            <div className={StyleCarousel.stars}>
                                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                                    <Star key={starIndex} filled={starIndex <= listData.stars} />
                                                ))}
                                                <p>
                                                    ({listData.numericTags[0]})
                                                </p>
                                            </div>
                                            <div className={StyleCarousel.price}>
                                                <p>€{listData.price.max.amount}</p>
                                                <p>€{listData.price.min.amount}</p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            )
                        })}
					</section>
				</div>
			</section>
		</>
	);
};

export default Carousel;