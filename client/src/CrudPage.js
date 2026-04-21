import React,{useEffect,useState} from "react";
import Axios from 'axios';
function CrudPage()
{
    const [foodName,setFoodName]=useState("")
    const [description,setDecription]=useState("")
    const [foodList,setFoodList]=useState([]);
    const [newFoodName, setNewFoodName] = useState([]);
    const [newDescription, setNewDescription] = useState([]);

     useEffect(()=>{
    fetchData();
   },[])

    //insert query

    const addFoodData=()=>{
        Axios.post("https://santhoshdb-crud.onrender.com/insert",{foodName,description})
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

     //getData
    const fetchData=()=>{
        Axios.get("https://santhoshdb-crud.onrender.com/read").then((response)=>{
            console.log(response.data)
            setFoodList(response.data)
        })
    }

    //  update data 
    
    const updateFood = (id, index) => {
    Axios.put("https://santhoshdb-crud.onrender.com/update", {
        id,newFoodName: newFoodName[index] || foodList[index].foodName,
        newDescription: newDescription[index] || foodList[index].description,
    })
    .then(() => fetchData())
    .catch((err) => console.log(err));
};

    //delete
    const deleteFood=(id)=>{
        Axios.delete(`https://santhoshdb-crud.onrender.com/delete/${id}`).then(()=>fetchData())
    }

    return(
        <>
        <div className="container">
            <h1>This is crud</h1>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="FoodName" required onChange={(e)=>setFoodName(e.target.value)}/><br></br>
                <input type="text" className="form-control" placeholder="Decription" required onChange={(e)=>setDecription(e.target.value)}/>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={addFoodData}>ADD FOOD</button>
            </div>

             <h3>View Details</h3>
          <table className='table table-bordered table-striped'>
            <tr>
                <th>FoodName</th>
                <th>FoodDescription</th>
                <th>Edit</th>
                {/* <th>Delete</th> */}
            </tr>
            <tbody>
                {foodList.map((val,index)=>(
                    <tr key={index}>
                        <td>{val.foodName}</td>
                        <td>{val.description}</td>
                        <td>
                 <input type='text' placeholder='UpdatedFoodName' onChange={(e) => {const arr = [...newFoodName]; arr[index] = e.target.value; setNewFoodName(arr);}}/>
                 <input type='text' placeholder='UpdatedDescription' onChange={(e) => {const arr = [...newDescription]; arr[index] = e.target.value;setNewDescription(arr);}}/>
                 <button className='btn btn-primary' onClick={() => updateFood(val._id, index)}>Edit</button>
                        </td>
                        {/* <td>
                             <button className='btn btn-danger' onClick={()=>deleteFood(val._id)}>Delete</button>
                        </td> */}
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
        </>
    )
}
export default CrudPage;