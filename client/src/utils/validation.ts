type ArgumentsType = {
    isAuth: boolean
    values: any
    errors: any
}

const validation = ({isAuth, values, errors}: ArgumentsType) => {
    const rules: any = {
        email: (value: string) => {
            if (!value) {
                errors.email = "Введите E-Mail"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = "Некорректный E-Mail"
            }
        },
        fullname: (value: string) => {
            const trimValue = value.trim()
            if (!isAuth && !trimValue) {
                errors.fullname = "Укажите свое имя и фамилию"
            } else if (trimValue.length < 2) {
                errors.fullname = "Укажите свое имя и фамилию"
            }
        },
        password: (value: string) => {
            if (!value) {
                errors.password = "Введите пароль";
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.password = isAuth ? "Неверный пароль" : "Слишком лёгкий пароль"
            }
        },
        password2: (value: string) => {
            if (!isAuth && value !== values.password) {
                errors.password2 = "Пароли не совпадают"
            }
        }
    }

    Object.keys(values).forEach((key) => rules[key] && rules[key](values[key]))
}

export default validation