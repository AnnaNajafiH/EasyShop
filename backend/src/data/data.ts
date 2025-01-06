import { Product } from "../models/productModel";
import bcrypt from 'bcryptjs';
import { User } from "../models/userModel";

export const sampleProducts = [
    {
    name : "Vase, Clear glass, 45 cm",
    slug : "Vase-Clear-glass",
    image : "/images/p1.jpg",
    category : "Vases",
    brand : "BERÄKNA",
    price : 14.99,
    countInStock : 10,
    description : "This large vase is carefully hand-blown. A talented artisan has developed the art of creating perfect glass objects over the years. The size gives the vase character and makes it an interesting eye-catcher in the home.",
    rating : 4,
    numReviews : 10
} ,
{
    name : "Vase, helltürkis, 12 cm",
    slug : "Vase-helltürkis",
    image : "/images/p2.jpg",
    category : "Vases",
    brand : "STILREN",
    price : 20,
    countInStock : 20,
    description : "Flowers in a pretty vase brighten up pretty much any day. This vase makes it easy to decorate your home naturally and beautifully - ideal for bouquets.",
    rating : 4.5,
    numReviews : 10
},
{
    name : "Vase, pink, 21 cm",
    slug : "Vase-pink",
    image : "/images/p3.jpg",
    category : "Vases",
    brand : "GRADVIS",
    price : 10,
    countInStock : 0,
    description : "Muted colors, round shapes and decorative grooves - the GRADVIS vase brings coziness into your home. Whether alone or filled with your favorite flowers, it is always a decorative eye-catcher.",
    rating : 4.8,
    numReviews : 17
},
{
    name : "Vase, blau, 25 cm",
    slug : "Vase-blau",
    image : "/images/p4.jpg",
    category : "Vases",
    brand : "MYRMOSAIK",
    price : 48,
    countInStock : 15,
    description : "The MYRMOSAIK series is made from at least 50% recycled glass. This makes each product unique with vibrant color and shape variations - like this beautiful vase with an original and personal design.",
    rating : 2,
    numReviews : 14
},
{
    name :"Vase, braun/Keramik, 19 cm",
    slug : "Vase-braun-Keramik",
    image : "/images/p5.jpg",
    category : "Pants",
    brand : "Puma",
    price : 25,
    countInStock : 5,
    description : "A simple, hand-formed vase in earth tones that decorates any space with its natural beauty. It highlights the beauty of your bouquets, but is also a decorative eye-catcher on its own.",
    rating : 3,
    numReviews : 10
},
{
    name : "Vase, bright yellow, 21 cm",
    slug : "Vase-bright-yellow",
    image : "/images/p6.jpg",
    category : "Vases",
    brand : "KOPPARBJÖRK",
    price : 39.99,
    countInStock : 12,
    description : "Flowers in a pretty vase brighten up pretty much any day. This vase makes it easy to decorate your home naturally and beautifully - ideal for bouquets.",
    rating : 4.5,
    numReviews : 15
},
{
    name : "Vase, dark gray, 21 cm",
    slug : "Vase-darkgray",
    image : "/images/p7.jpg",
    category : "Vases",
    brand : "GRADVIS",
    price : 29.99,
    countInStock : 12,
    description : "The GRADVIS vase adds a homely accent to your home. You can use it to display flowers or use the vase as a single decorative object. The clay of this vase is made from 100% recycled material from production waste.",
    rating : 4.5,
    numReviews : 15
},
{
    name : "Vase, blue, 32 cm",
    slug : "Vase-blue",
    image : "/images/p8.jpg",
    category : "Vases",
    brand : "MYRMOSAIK",
    price : 34.99,
    countInStock : 12,
    description : "The MYRMOSAIK series is made from at least 50% recycled glass. This makes each product unique with vibrant color and shape variations - like this beautiful vase with an original and personal design.",
    rating : 4.5,
    numReviews : 15
}
]


export const sampleUsers: User[]=[
    {
        name: 'Joe',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'Jane',
        email: 'Jane@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
    }
]