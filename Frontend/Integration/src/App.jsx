import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup'
import { Box ,TextField,Button, Typography} from '@mui/material';
import {BrowserRouter,Routes,Route,Link}  from 'react-router-dom'

function Home(){
  return (
<Box  display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh">
  <Typography variant="h3" gutterBottom>WELCOME BACK, ADMIN</Typography>
       <Box display="flex" gap={2}>
        <Button 
          component={Link} 
          to="/create" 
          variant="contained" 
          color="primary" 
          sx={{ width: 200 }}
        >
          Create New User
        </Button>
        
        <Button 
          component={Link} 
          to="/view" 
          variant="contained" 
          color="primary" 
          sx={{ width: 200 }}
        >
          View / Delete / Update
        </Button>
      </Box>
</Box>
  )
}

function CreateNewUser({initialValues,validateSchema,handleFormSubmit}){
  return (
  <Box m='10'>
    <Typography variant='h4' color=''>Create New User</Typography>
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
  </Box> )

}
 function Viewser({columns,rows,handleRowUpdate}){
  return (
    <Box>

      
      
      <DataGrid columns={columns} 
      rows={rows}  
      processRowUpdate={handleRowUpdate}   
      experimentalFeatures={{ newEditingApi: true }}
  autoHeight/>

      </Box>
  )

 }

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
    id:yup.number().typeError('ID must be a number').required('ID is required'),
    name:yup.string().required('name is required'),
    age:yup.number().typeError('Age must be a number').required('age is required'),
    grade:yup.string().required('grade is required'),
    combination:yup.string().required('combination is required'),

  })
  const [name,setName]=useState([]);
  const api=axios.create({
    baseURL:'http://localhost:3000/students'
    
  })

  const [editableRowId, setEditableRowId] = useState(null);
   const handleUpdateClick = (id) => {
    setEditableRowId(id);
   
  };
 useEffect( ()=>{
    api.get('')
    .then(res=>{
      setName(res.data);
    })
    .catch(err=>{
      console.log("Failed to fetch data")
    })

  })
  const handleRowUpdate=async (updateRow,oldRow)=>{
    try{
    await api.put(`/${updateRow.id}`,updateRow);
     console.log("Updated successfully:", updateRow);
     setEditableRowId(null);
     return updateRow;
  } catch(error){
    console.error("Updating Failed",error)

  } }

  const handleDeleteClick=(id)=>{
    api.delete(`/${id}`)
     .then(() => {
            console.log("Deleted");})

       .catch(err => console.error("Delete failed", err));      
  }
  

 
  const rows=name;
  const columns=[
    {field:'id',headerName:'ID', flex:1,editable:false},
    {field:'name',headerName:'Name', flex:1, editable: (params) => params.id === editableRowId },
    {field:'age',headerName:'Age', flex:1, editable: (params) => params.id === editableRowId },
    {field:'grade',headerName:'Grade', flex:1, editable: (params) => params.id === editableRowId },
    {field:'combination',headerName:'Combination', flex:1, editable: (params) => params.id === editableRowId },
     {
      field: 'update',
      headerName: 'UPDATE',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleUpdateClick(params.row.id)}
        >
          UPDATE
        </Button>
      ),
    },
        {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]
  return (
      <div>
     
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/create" element={<CreateNewUser initialValues={initialValues} validateSchema={validateSchema} handleFormSubmit={handleFormSubmit}/>}/>
  <Route path="/view" element={<Viewser  columns={columns} rows={rows}  handleRowUpdate={handleRowUpdate} />}/>

 
</Routes>
</BrowserRouter>

      </div>
  )
}

export default App
