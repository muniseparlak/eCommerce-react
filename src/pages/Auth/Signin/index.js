import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Input, Flex, Heading, FormControl, FormLabel, Alert} from '@chakra-ui/react';
import { fetchLogin } from '../../../api'
import { useAuth } from '../../../Context/AuthContext';



const SignIn = ({history}) => {
	
	const {login} = useAuth()

	const validate = (values) => {
		const errors = {};
		
		if(!values.password) {
			errors.password = 'Zorunlu alan';
		}
		
		if (!values.email) {
	     errors.email = 'Zorunlu alan';
	   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	     errors.email = 'Geçersiz e-mail adresi';
	   }
	
		return errors;
	}

	const { handleSubmit, handleChange, values, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
			
		},
		validate,
		onSubmit: async(values, bag) => {
			console.log(values);

			
			try {
				  const registerResponse = await fetchLogin(
				    {
				      email: values.email,
			          password: values.password
				   }
				  );
				  
				 login(registerResponse);
				 history.push('/')
				 console.log(registerResponse);
				} catch (error) {
				  bag.setErrors({general: error.response.data.message})
				}

		},
	});

	return(

	<>	

 	<Flex align="center" width='full' justifyContent="center">
	<Box>
	 <Box>
            <Heading align="center" >
            Sign In
            </Heading>
            <Box my={5}>
               {errors.general && (
                 <Alert status='error'>{errors.general}</Alert>
               )}
             </Box>
     </Box>
		<Box my={5} textAlign="left">
		<form onSubmit={handleSubmit}>
			<FormControl mt={5}>
			<FormLabel>E-mail</FormLabel>
			<Input
				type="text"
				name="email"
				onChange={handleChange}
				values={values.email}
				isInvalid={touched.email && errors.email}
			/>
			{errors.email ? errors.email : null}
			</FormControl>

			<FormControl mt={5}>
			<FormLabel>Password</FormLabel>
			<Input
				type="password"
				name="password"
				onChange={handleChange}
				values={values.password}
			/>
			{errors.password ? errors.password : null}
			</FormControl>
			
			<Button type="submit" width={'full'} mt={5} colorScheme={'pink'}>Sign In</Button>
		</form>
		</Box>
	</Box>
	</Flex>
	

	</>
	);
}

export default SignIn;
