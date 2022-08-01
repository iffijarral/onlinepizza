import * as yup from 'yup';

export const ProductValidationSchema = yup.object().shape({    
    
    name: yup.string().required(),    
    file:  yup.mixed(),
    id: yup.number(),
    file: yup.mixed().when("id", {
        is: (id) => id === undefined,
        then: yup.mixed().required('Vælg venligst et billede først')
    }),
    price: yup.number().required()
});

