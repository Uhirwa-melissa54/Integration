import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup'
import { Box ,TextField,Button} from '@mui/material';


function App() {
  const initialValues={
    id:"",
    name:"",
    age:"",
    grade:"",
    combination:""
  }
  const handleFormSubmit= (values)=>{
 console.log(values);
 api.post('',values)
 .then(res=>{
  console.log("New user created",res.data);
  getStudents();
 })
 .catch(err=>{
  console.error("Unable to create user",err);
 })
  }
  const validateSchema=yup.object({
    id:yup.string().required('ID is required'),
    name:yup.string().required('name is required'),
    age:yup.string().required('age is required'),
    grade:yup.string().required('grade is required'),
    combination:yup.string().required('combination is required'),

  })
  const [name,setName]=useState([]);
  const api=axios.create({
    baseURL:process.env.REACT_API
  })
  const getStudents=()=>{
    api.get('')
    .then(res=>{
      setName(res.data);
    })
    .catch(err=>{
      console.log("Failed to fetch data")
    })

  }

 
  const rows=name;
  const columns=[
    {field:'id',headerName:'ID', flex:1},
    {field:'name',headerName:'Name', flex:1},
    {field:'age',headerName:'Age', flex:1},
    {field:'grade',headerName:'Grade', flex:1},
    {field:'combination',headerName:'Combination', flex:1}
  ]
  return (
      <div>
      <h1>Students</h1>
<Formik  
initialValues={initialValues} 
validationSchema={validateSchema}
onSubmit={handleFormSubmit}>


  
  {({values,errors,touched,handleBlur,handleChange,handleSubmit,isSubmitting})=>{
    return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField name='id'   margin='normal' type='text' 
fullWidth label='ID'
 variant="filled" 
onBlur={handleBlur} onChange={handleChange} 
value={values.id}  
error={!!touched.id && !!errors.id} 
helperText={touched.id && errors.id} 

/>

     <TextField name='name'   margin='normal' type='text' 
fullWidth label='Full name'
 variant="filled" 
onBlur={handleBlur} onChange={handleChange} 
value={values.name}  
error={!!touched.name && !!errors.name} 
helperText={touched.name && errors.name} 

/>
     <TextField name='age'   margin='normal' type='text' 
fullWidth label='Age'
 variant="filled" 
onBlur={handleBlur} onChange={handleChange} 
value={values.age}  
error={!!touched.age && !!errors.age} 
helperText={touched.age && errors.age} 

/>

     <TextField name='grade'   margin='normal' type='text' 
fullWidth label='Grade'
 variant="filled" 
onBlur={handleBlur} onChange={handleChange} 
value={values.grade}  
error={!!touched.grade && !!errors.grade} 
helperText={touched.grade && errors.grade} 

/>
     <TextField name='combination'   margin='normal' type='text' 
fullWidth label='Combination'
 variant="filled" 
onBlur={handleBlur} onChange={handleChange} 
value={values.combination}  
error={!!touched.combination && !!errors.combination} 
helperText={touched.combination && errors.combination} 

/>
<Button type='submit' variant='contained'>Create New User</Button>

      </Box>

    </form>
    )
  }
  }  
  

</Formik>
      <button onClick={getStudents}>Load Students</button>
      
      <DataGrid columns={columns} rows={rows}/>
      </div>
  )
}

export default App
