import wolf1 from './icons/wolf1.webp'
import wolf2 from './icons/wolf2.webp'
import cat1 from './icons/cat1.webp'
import cat2 from './icons/cat2.webp'
import cat3 from './icons/cat3.webp'
import deer1 from './icons/deer1.webp'
import dog1 from './icons/dog1.webp'
import dog2 from './icons/dog2.webp'
import ferret1 from './icons/ferret1.webp'
import otter2 from './icons/otter2.webp'
import otter1 from './icons/otter1.webp'
import rat1 from './icons/rat1.webp'
import shark1 from './icons/shark1.webp'
import weasel1 from './icons/weasel1.webp'

const iconsArray = [
    wolf1, wolf2, cat1, cat2, cat3, deer1, dog1, dog2, ferret1, otter1, otter2, rat1, shark1, weasel1
]

const RandomIconGenerator = () => {
    return iconsArray[Math.floor(Math.random() * iconsArray.length)]
}

export default RandomIconGenerator;