import React, {useState} from "react";
import s from './Main.module.scss';
import classNames from "classnames";

const Main = (props) => {

    const [error, setError] = useState(false)

    const onClick = (e) => {
        if (!props.url) {
            setError(true)
            return 0;
        }
        props.addData(e);
    }


    return (<div className={s.container}>
            <input
                className={classNames(s.container__input, error&&s.container__input__error)}
                type="text"
                value={props.url}
                placeholder={"Введите URL картинки"}
                onChange={(event) => {
                    props.onChange(event.target.value);
                    setError(false);
                }}
            />
            <div className={s.button} onClick={onClick}>
                Загрузить изображение
            </div>
        </div>
    )
};

export default Main;
