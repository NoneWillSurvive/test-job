import s from './App.css';
import {useEffect, useState} from "react";
import Galery from "./pages/gallery/Galery";
import Main from "./pages/main/Main";
import spinner from './images/Spinner.gif';
// import imagesArray from './images/images.js';
const imagesArray = require('./images/images')

const App = () => {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [size, setSize] = useState({});
    const [url, setUrl] = useState('');

    useEffect(() => {
        setImages(imagesArray.default.galleryImages);
        setLoading(false);
    }, []);


    const onLoad = ({target: img}) => {
        setSize({
            width: img.offsetWidth,
            height: img.offsetHeight
        })
    }

    const onChangeUrl = (value) => {
        setUrl(value);
    }

    const addData = (e) => {
        e.preventDefault();
        const imagesTemp = [...images];
        const {width, height} = size;
        const img = {
            url,
            width,
            height
        }
        img.url && imagesTemp.push(img);
        setImages(imagesTemp);
    }

    const deleteImage = (index) => {
        const imagesTemp = [...images];
        imagesTemp.splice(index, 1);
        setImages(imagesTemp);
    }

    const onFileDrop = (e) => {
        e.preventDefault();
        const imagesTemp = [...images];
        const data = [...e.dataTransfer.files][0];
        let reader = new FileReader();
        try {
            reader.readAsDataURL(data);
        } catch (e) {
            console.log(e)
        }

        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const _img = {
                    width: img.width,
                    height: img.height
                }
                imagesTemp.push(Object.assign({url: reader.result}, _img))
                setImages(imagesTemp);
            };
            img.src = reader.result;
        }
    }

    return <div>
        <Main url={url} onChange={onChangeUrl} addData={addData}/>
        <img src={url} alt="" className='preview' onLoad={onLoad}/>
        <hr/>
        {loading ? <img src={spinner} alt="loading" className={'spinner'}/> :
            <Galery images={images} deleteImage={deleteImage} onFileDrop={onFileDrop}/>}
    </div>
}

export default App;
