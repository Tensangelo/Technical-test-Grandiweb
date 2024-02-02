interface Product {
    id: string;
    title: string;
    tags: string[];
    totalInventory: number;
    featuredImage: {
        url: string;
    };
    prices: {
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

interface TransformedProduct {
    id: string;
    title: string;
    description: string;
    stars: number;
    numericTags: number[];
    imageUrl: string;
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

const calculateStars = (tags: string[]): number => {
    const numericTags = tags.filter(tag => !isNaN(Number(tag))).map(Number);
    const average = numericTags.reduce((sum, value) => sum + value, 0) / numericTags.length;

    if (average >= 0 && average < 100) return 1;
    else if (average >= 100 && average < 200) return 2;
    else if (average >= 200 && average < 300) return 3;
    else if (average >= 300 && average < 400) return 4;
    else return 5;
};

const fetchProducts = async (): Promise<TransformedProduct[]> => {
    try {
        const response = await fetch('https://gradistore-spi.herokuapp.com/products/all');
        const data: { products: { nodes: Product[] } } = await response.json();

        const transformedProducts = data.products.nodes.map(product => ({
            id: product.id,
            title: product.title,
            description: `Cantidad en stock: ${product.totalInventory}`,
            stars: calculateStars(product.tags),
            numericTags: product.tags.map(Number),
            price: {
                max: product.prices.max,
                min: product.prices.min,
            },
            imageUrl: product.featuredImage.url,
        }));

        return transformedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};


export default fetchProducts;