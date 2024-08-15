import React, { useRef, useState, useEffect } from 'react';
import Allpasswords from './Allpasswords';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef(0);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showsave, setshowsave] = useState(false);
    const [showadd, setshowadd] = useState(true);
    const [passwordArray, setPasswordArray] = useState([]);
    const [editID, seteditID] = useState(null)

    const getpassword = async () => {
      let get = await fetch("http://localhost:3000/");
      let passwords = await get.json();
      //console.log(passwords);
      setPasswordArray(passwords);
      
    }
    

    useEffect(() => {
        getpassword();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async() => {
      if(form.site == "" || form.username == "" || form.password == ""){
        alert(`Please fill the form first`);
      }
      else{
        const uid = uuidv4();
        const newPasswords = [...passwordArray, {...form, id: uid}];
        setPasswordArray(newPasswords);
        let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uid}) })
        setForm({ site: "", username: "", password: "" })
        //console.log(newPasswords);
        
      }
    };

    const showPassword = () => {
        if (ref.current.src.includes("eye-svgrepo-com.png")) {
            ref.current.src = "eye-closed-svgrepo-com.png";
            setShowPass(true);
        } else {
            ref.current.src = "eye-svgrepo-com.png";
            setShowPass(false);
        }
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPressed(false);
    };

    const buttonStyle = {
        backgroundColor: isPressed ? '#4ea8de' : isHovered ? '#64dfdf' : 'rgb(93 217 255)',
    };
    const updatepassword = async () => {
        if (form.site === "" || form.username === "" || form.password === "") {
          alert(`Please fill the form first`);
          return;
        }
      
        const updatedPassword = { ...form, id: editID };
      
        try {
          let res = await fetch("http://localhost:3000/", { method: "PUT", headers: {"Content-Type": "application/json" }, body: JSON.stringify(updatedPassword)});
      
          let result = await res.json();
          if (result.success) {
            const updatedPasswordArray = passwordArray.map((item) =>
              item.id === editID ? updatedPassword : item
            );
            setPasswordArray(updatedPasswordArray);
            setForm({ site: "", username: "", password: "" });
            seteditID(null);
            setshowadd(true);
            setshowsave(false);
          } else {
            console.error("Failed to update password");
          }
        } catch (error) {
          console.error("Error updating password:", error);
        }
      };
      
    

    return (
      <>
        <div className='manager'>
            <input value={form.site} onChange={handleChange} type="text" name="site" id="url" placeholder='Enter URL' />
            <div className="info">
                <input value={form.username} onChange={handleChange} type="text" name="username" id="username" placeholder='Enter username' />
                <div className='pass'>
                    <input value={form.password} onChange={handleChange} type={showPass ? 'text' : 'password'} name="password" id="password" placeholder='Enter password' />
                    <div className="showpass">
                        {form.password !== "" && <img ref={ref} onClick={showPassword} src="eye-svgrepo-com.png" alt="Show Password" />}
                    </div>
                </div>
            </div>
            <div className="addpass">
                {showadd && <button style={buttonStyle} onClick={savePassword} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id='add'>Add Password</button>}
                {showsave && <button style={buttonStyle} onClick={updatepassword} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id='save'>Save Password</button>}
            </div>
            <Allpasswords passwordArray={passwordArray} setForm={setForm} seteditID = {seteditID} setshowadd = {setshowadd} setshowsave = {setshowsave} setPasswordArray = {setPasswordArray} form = {form} />
        </div>
      </>  
    );
};

export default Manager;
