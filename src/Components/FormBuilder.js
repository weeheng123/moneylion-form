import React, { useState } from 'react'

// All the dependencies from material-ui, haven't used it before, hope it goes well. 
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import Preview from './Preview'

import '../App.css'
import { makeStyles } from '@material-ui/core/styles'

// In line styling unique to material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      height: '100%',
    },
    '& .MuiTextField-root': {
    },
    '& .MuiFormControl-root .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiButton-root': {
      marginTop: '1rem',
    },
  }
}))

function FormBuilder() {
  const classes = useStyles();
  const [formEntry, setFormEntry] = useState([
    { name: '', fieldType: '' },
  ]);

  const [generate, setGenerate] = useState(false);

  const [submit, setSubmit] = useState(false);

  const handleChangeInput = (index, event) => {
      const values = [...formEntry];
      values[index][event.target.name] = event.target.value;
      setFormEntry(values);
  }

  //Allows react to render the "Generated Form", also does a little bit of error handling just in case the formEntry
  //object is empty
  const handleGenerate = (e) => {
      e.preventDefault();
      const values = [...formEntry];
      console.log(values.length);
      console.log(values);
      let boolean = false;
      for(let i=0; i<values.length; i++){
        if(values[i].name !== "" && values[i].fieldType !== ""){
          boolean = true
        }
          else{
          boolean = false;
        }
      }
      if(boolean === false){
        alert("All the Field Name and Types must be filled.")
      }
      console.log(boolean);
      setGenerate(boolean);
      setSubmit(boolean);  
  }

  //Renders FormBuilder and PreviewForm again
  const handleBack = (e) => {
      e.preventDefault();
      setGenerate(false);
  }

  //Disaster handling just in case user deletes the last field,
  //as there is no way to add any fields if user deletes this
  const handleRemoveFields = (index) => {
    const values = [...formEntry];
    if(values.length === 1){
      alert("Unable to remove final field")
    }
    else{
    values.splice(index, 1);
    setFormEntry(values);
    }
  }

  const handleAddFields = () => {
    setFormEntry([...formEntry, { name: '', fieldType: ''}])
  }

  //For the "Please provide an optional function to clear the list" feature
  const handleRemoveAll = () => {
    const values = [...formEntry];
    values.splice(1, values.length - 1);
  }

  if(generate === false){
    return (
    <Container maxWidth="sm">
      <div className="form-builder">
        <h1>Dynamic Form Builder</h1>
        <form className={classes.root}>
          { formEntry.map((form, index) => (
            <div key={index} className="row">
                <TextField 
                name="name"
                label="Field Name"
                variant= "filled"
                value={formEntry.name} 
                onChange={event => handleChangeInput(index, event)}
                >
                </TextField>
                <Select
                name="fieldType"
                value={formEntry.fieldType}
                onChange={event => handleChangeInput(index, event)}>
                    <MenuItem value="" disabled selected>Select a Type</MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="checkbox">CheckBox</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                </Select>
                <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveIcon/>
                </IconButton>
                <IconButton
                  onClick={() => handleAddFields(index)}
                >
                  <AddIcon />
                </IconButton>
            </div>
          )) }
          <Button variant="contained" color="primary" type="submit" onClick={handleRemoveAll}>Remove All</Button>
        </form>
      </div>
      <div className="preview-form">
       <h1>Preview Form</h1>
        <Preview entries={formEntry}/> 
        <Button variant="contained" color="primary" type="submit" onClick={handleGenerate}>Generate Form</Button>
      </div>
    </Container>
  );
  }
  else if(generate === true){
    return(
      <Container maxWidth="sm">
        <div className="generated-form">
          <h1>Generated Form</h1>
          <form>
            <Preview entries={formEntry} submit={submit}/> 
            <Button className="button-spacing" variant="contained" color="primary" type="submit" onClick={handleBack}>Back</Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default FormBuilder;