import React, {useEffect, useRef, useState} from 'react';
import s from './Galery.module.scss';
import deleteButton from '../../images/deleteButton.svg';

const Gallery = (props) => {
    const containerRef = useRef(null)
    const [containerWidth, setContainerWidth] = useState(null);


    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        window.addEventListener('resize', event => {
            setContainerWidth(containerRef.current.offsetWidth);
        })

    }, [containerRef])

    const getResizedImages = () => {
        const imageArr = [];
        let lines = [];
        let imgRatioSum = 0;
        const linesRatio = containerWidth / 200;

        props.images.forEach((image, index) => {
            imgRatioSum += image.width / image.height;
            lines.push({
                ratio: image.width / image.height,
                url: image.url
            });

            if (imgRatioSum > linesRatio) {
                lines.forEach(({ratio, url}) => {
                    imageArr.push({
                        width: containerWidth * ratio / imgRatioSum,
                        url: url
                    })
                })

                lines = [];
                imgRatioSum = 0;
            }

            if (index + 1 === props.images.length) {
                lines.forEach(({ratio, url}) => {
                    imageArr.push({
                        width: containerWidth * ratio / linesRatio,
                        url: url
                    })
                })
            }

        });
        return imageArr;
    }

    return (
        <div className={s.gallery}>
            <div
                className={s.gallery__list}
                ref={containerRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={props.onFileDrop}
            >
                {getResizedImages().map((item, index) => (
                    <div
                        className={s.gallery__item}
                        style={{width: item.width}}
                        key={`image-${index}`}
                    >
                        <img
                            className={s.gallery__img}
                            src={item.url}
                            alt="galleryImg"
                        />
                        <img
                            src={deleteButton}
                            alt="deleteBtn"
                            className={s.gallery__deleteBtn}
                            onClick={() => {props.deleteImage(index)}}
                        />
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default Gallery;
