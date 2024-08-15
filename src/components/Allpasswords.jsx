import React from "react";
import { useState, useRef } from "react";
const Allpasswords = ({ passwordArray, setForm, seteditID, setshowadd, setshowsave, setPasswordArray, form}) => {

  const [activecopy, setactivecopy] = useState([null, null]);
  const [showtable, setshowtable] = useState(false)
  const showref = useRef(0);
  const isActiveCopy = (index, j) => {
    return activecopy[0] === index && activecopy[1] === j;
  };
  const handlecopyactive = (index, j) => {
    setactivecopy([index, j]);
  };

  const handlecopyclick = (text, index, j) => {
    if (activecopy[0] === index && activecopy[1] === j) {
      setactivecopy([null, null])
    }
    else{
      navigator.clipboard.writeText(text);
      handlecopyactive(index, j);
    }
  };
  const handleEdit = (item, id) => {
    setForm({ site: item.site, username: item.username, password: item.password });
    seteditID(id);
    setshowadd(false);
    setshowsave(true);
  }
  const handleDelete = async(id) => {
    const a = confirm("Do you want to delete password? (Cannot be undone)");
    if(a){
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      let result = await res.json();
      if (result.success) {
        const newpassarray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(newpassarray);
        console.log("Delete pressed");
      }
  }
  };

  const handleshowtable = () => {
    if (showref.current.src.includes("eye-svgrepo-com.png")) {
      showref.current.src = "eye-closed-svgrepo-com.png";
      setshowtable(true);
  } else {
      showref.current.src = "eye-svgrepo-com.png";
      setshowtable(false);
  }
  }
  
  
  
  return (
    <>
    <div className="allpasstablecontainer">
      <p id="yourpasshead">Your Passwords</p>
      {passwordArray.length != 0 && <div onClick={() => handleshowtable()} className="showtable">
        <span>Show Password</span>
      <span><img   ref={showref} className="showpasstable" src="eye-svgrepo-com.png" alt="" /></span>
      </div>}
      {passwordArray.length == 0 && (<div id="passEmpty">PassWord Empty</div>)}
      {passwordArray.length !== 0 && (
       
        <table className="passtable">
          <thead className="theading">
            <tr>
              <th>URL</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {passwordArray.map((item, index) => (
              <tr key={index}>
                <td className="tcolumn">{item.site} <span><img onClick={() => handlecopyclick(item.site ,index, 1)} className = "copyicon" src={isActiveCopy(index, 1)  ? "copied.png" : "copy.png"} alt="" /></span></td>
                <td className="tcolumn">{showtable ? item.username : "***"} <span><img onClick={() => handlecopyclick(item.username ,index, 2)} className = "copyicon" src={isActiveCopy(index, 2)  ? "copied.png" : "copy.png"} alt="" /></span></td>
                <td className="tcolumn">{showtable ? item.password : "***"} <span><img onClick={() => handlecopyclick(item.password ,index, 3)} className = "copyicon" src={isActiveCopy(index, 3) ? "copied.png" : "copy.png"} alt="" /></span></td>
                <td className="tcolumn"><span><img onClick={() => handleEdit(item,item.id)} className="actionicon" src="edit.png" alt="" /></span><span><img onClick={() => handleDelete(item.id)} className="actionicon" src="delete.png" alt="" /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
       
      )}
    </div>
  </>
  );
  
};

export default Allpasswords;
