import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props); // функционал Formik

    //field - объект содержит пропсы
    //meta - объект содержит ошибки и использования

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckBox = ({ children, ...props }) => {

    const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <label className="checkbox" >
                <input type='checkbox' {...props} {...field} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}


const FormClassic = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле!'),
                    email: Yup.string()
                        .email('Неправильный email адрес')
                        .required('Обязательное поле!'),
                    amount: Yup.number()
                        .min(10, 'Минимум 10')
                        .required('Обязательное поле!'),
                    currency: Yup.string()
                        .required('Выберите валюту!'),
                    text: Yup.string()
                        .min(10, 'Минимум 10 символов!'),
                    terms: Yup.boolean()
                        .required('Необходимо согласие!')
                        .oneOf([true], 'Необходимо согласие!')
                })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                {/* <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className='error' name='name' component='p' /> */}
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                {/* <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className='error' name='email' component='p' /> */}
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className='error' name='amount' component='p' />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select" // select
                >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='p' />
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea" // textarea
                />
                <ErrorMessage className='error' name='text' component='p' />
                {/* <label className="checkbox">
                    <Field
                        name="terms"
                        type="checkbox"
                    />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className='error' name='terms' component='p' /> */}
                <MyCheckBox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckBox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default FormClassic;