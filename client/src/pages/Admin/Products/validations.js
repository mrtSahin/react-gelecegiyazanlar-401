import * as Yup from 'yup'

const validationSchema = Yup.object().shape(
  {
    title:Yup.string().required('Bu alan zorunludur.'),
    description:Yup.string().min(20,'En az 20 karakterlik bir açıklama giriniz.').required('Bu alan zorunludur.'),
    price:Yup.number().required('Bu alan zorunludur.'),
  }
)

export default validationSchema