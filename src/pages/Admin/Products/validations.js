import * as yup from 'yup'

const newScheme = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required()
}) 

export default newScheme 