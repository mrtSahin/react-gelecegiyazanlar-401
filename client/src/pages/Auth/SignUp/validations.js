import * as Yup from 'yup'

export const validate = Yup.object().shape({
    email: Yup
    .string()
    .email('Geçerli bir mail giriniz.')
    .required('Zorunlu alan!'),
    password: Yup
    .string()
    .min(3, 'Parola en az 3 karakter olmalı')
    .required('Zorunlu alan!'),
    passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref("password")], 'Parolalar uyuşmuyor.') // password ile uyuşup uyuşmadığını kontrol ediyor.
    .required('Zorunlu alan!')
})