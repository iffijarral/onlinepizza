import * as yup from 'yup';

export const CategoryValidationSchema = yup.object().shape({    
    
    name: yup.string().required(),    
    file:  yup.mixed().required('Vælg først et billede'),
    id: yup.number(),
    file: yup.mixed().when("id", {
        is: (id) => id === undefined,
        then: yup.mixed().required('Vælg venligst et billede først')
    })
});

