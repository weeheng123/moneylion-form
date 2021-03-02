import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import '../App.css'

//Entire function heavily relies on props passed down from FormBuilder
//Basically the same component used for Preview Form
function Preview(props){
    const entries = props.entries;
    const [submit, setSubmit] = useState(props.submit);

    const [email, setEmail] = useState("example@email.com");
    const [error, setError] = useState(false);
    // const [errorFields, setErrorFields] = useState([]);
    const [text, setText] = useState("");
    const [number, setNumber] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleText = (e) => {
        setText(e.target.value);
    }

    const handleNumber = (e) => {
        setNumber(e.target.value);
    }

    //Error Handling for Email Field,
    const handleSubmit = (e) => {
        e.preventDefault();
        const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
       
        if (!regEx.test(email)){
            setError(true);
        }
        // if (email === ""){
        //     setError(true);
        //     if(!errorFields.includes("Email Address")){
        //     errorFields.push("Email Address")
        //     }
        // }
        // if(text === ""){
        //     setError(true);
        //     if(!errorFields.includes("Text")){
        //     errorFields.push("Text")
        //     }
        // }
        // if(number === ""){
        //     setError(true);
        //     if(!errorFields.includes("Number")){
        //         errorFields.push("Number")
        //     }
        // }
        else{
            setError(false);
            alert("Form Successfully Submitted!");
        }
    }

    // const errorArray = errorFields.join();
    return(
        //Iterate through object passed down by FormBuilder, tons of conditional rendering.
        <div>
            {entries.map(entry => {
                if(entry.fieldType === "text"){
                    return(
                    <div className="preview-row">
                    <TextField 
                    label={entry.name}
                    placeholder={entry.name}
                    value={text}
                    onChange={handleText}
                    required
                    >
                    </TextField>
                    </div>
                    );
                }
                else if(entry.fieldType  === "boolean"){
                    return(
                        <div className="preview-row">
                        <FormControlLabel
                        control={<Switch name="boolean" />}
                        label={entry.name}
                        />
                        </div>
                    );
                }
                else if(entry.fieldType  === "checkbox"){
                    return(
                        <div className="preview-row">
                        <FormControlLabel
                        control={<Checkbox name="checkBox" />}
                        label={entry.name}
                        />
                        </div>
                    )
                }
                else if(entry.fieldType  === "number"){
                    return(
                        <div className="preview-row">
                        <TextField
                            id="standard-number"
                            label={entry.name}
                            type="number"
                            value={number}
                            onChange={handleNumber}
                            required
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        </div>
                        )
            }
            else if(entry.fieldType  === "date"){
                    return(
                        <div className="preview-row">
                            <TextField
                                id="date"
                                label={entry.name}
                                type="date"
                                defaultValue="2021-03-01"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        )
            }
            else if(entry.fieldType  === "email"){
                    return(
                        <div className="preview-row">
                            <TextField 
                                label={entry.name}
                                placeholder={entry.name}
                                value={email}
                                onChange={handleEmail}
                                required
                            >
                            </TextField>
                        </div>
                        )
            }
                // <div>
                //     <label>{entry.name}</label>
                //     <input type={entry.fieldType}></input>
                // </div>
            })}
        {error ? <h5>Invalid Email Address</h5> : null}
        {//Wanted this button to be together with this form, just a gut feeling.
        //A tertiary operator so that it doesn't render in FormBuilder page.
        submit ? <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button> : null
        }
        </div>
    )
}

export default Preview;