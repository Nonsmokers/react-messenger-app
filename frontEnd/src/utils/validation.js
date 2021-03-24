export default ({isAuth, values, errors}) => {
    const rules = {
        fullname: value => {
            if (!isAuth && !value) {
                errors.username = "Укажите свое имя и фамилию";
            }
        },
        email: (value) => {
            if (!value) {
                errors.email = "Введите E-Mail";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = "Неверный E-Mail";
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = "Введите пароль";
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.password = isAuth ? "Неверный пароль" : "Слишком лёгкий пароль";
            }
        },
        password2: value => {
            if (!isAuth && value !== values.password) {
                errors.password2 = "Пароли не совпадают";
            }
        }
    }

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};