import * as yup from 'yup';

export const AccountValidationSchema = yup.object().shape({    
    
    name: yup.string().required()    
     
    
});

