import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { CartState } from '../Context/Context'

function Contact() {
    const{state:{allData, contact},dispatch}= CartState();
    const [add, setAdd] = useState(false);
    //const [contact, setContact] = useState([]);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({ 'firstName': '', 'lastName': '', 'activity': ''})
    const [editId, setEditId] = useState();

    // const handleSubmit = (e) => {
    //     contact.push(data);
    //     setData({ 'firstName': '', 'lastName': '', 'activity': ''})
    //     setAdd(false)
    // }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data)

    }

    // const deleteContact = (i) => {

    //     const newContact = contact.filter((ele, id) => {
    //         return i !== id;
    //     })
    //     setContact(newContact);

    // }

    const editContact = (i) => {
        setAdd(true)
        console.log(allData[i])
        setData(allData[i])
        setEdit(true)
        setEditId(i)
    }

    // const handleEdit = (e) => {
    //     const updatelist = contact.map((item, i) => {
    //         console.log(i);
    //         return i === editId ? data : item;
    //     });

    //     setContact(updatelist);
    //     console.log(updatelist);
    //     setData({ 'firstName': '', 'lastName': '', 'activity': ''})
    //     setEdit(false);
    //     setAdd(false)
    // }
    return (
        <>
            <div >
                    <div className="col-sm-10 body">


                        {add ?

                            <form className='card p-5 justify-content-center' style={{ width: '40%', marginLeft: '20%', marginTop: '10%' }}>
                                <div className="align-items-center">
                                    <div className="col-auto">
                                        <label className="col-form-label">First Name</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="name" className="form-control" value={data.firstName} name='firstName' onChange={onChange} />
                                    </div>
                                    <div className="col-auto">
                                        <label className="col-form-label">Last Name</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="name2" className="form-control" value={data.lastName} name='lastName' onChange={onChange} />
                                    </div>
                                    <div className="col-auto">
                                        <label className="col-form-label mt-2">Status:</label>
                                    </div>
                                    <div className="col-auto form-check" >
                                    <div onChange={onChange}>
                                    <input type="radio" style={{ marginLeft: '20px' }} value="Active" name="activity" checked={data.activity === "Active"} /> Active
                                    <input type="radio" style={{ marginLeft: '20px' }} value="Inactive" name="activity" checked={data.activity === "Inactive"}/> InActive
                                  </div>
                                    </div>
                                    
                                    {edit ? <button type="button" className="button btns" onClick={(e)=> {
                                        dispatch({
                                          type:'EDIT_CONTACT',
                                          payload:{
                                            id:editId,
                                            data: data
                                          }
                                        })
                                        setAdd(false)
                                        setData(contact)
                                    }} style={{ marginLeft: '40%', backgroundColor: 'green' }}>Update</button>
                                        :
                                        <button type="button" className="button btns" onClick={() => {
                                            dispatch({
                                                type:'ADD_TO_CONTACT',
                                                payload: data
                                            })
                                            setAdd(false)
                                            setData(contact)
                                          }} style={{ marginLeft: '40%', backgroundColor: 'blue' }}>Submit</button>
                                    }
                                </div>
                            </form>
                            :
                            <button className='button p-2' onClick={() => setAdd(true)}>Create Contact</button>}
                        <div>

                            {allData.length === 0 ?
                                <div className="alert alert-danger" style={{ marginTop: '10%', width: '60%', marginLeft: '10%' }} role="alert">
                                    <span><RxCross2 /></span> No Contact Found Please add Contact from Create Contact Button
                                </div> :
                                <div className='row mt-5'>
                                    {allData.map((item, i) => {
                                        return <div className="col-md-3 mx-4" key={i}>
                                            <div className="card my-3" style={{ width: '18rem' }} key={i}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ textAlign: 'center' }}>First Name : {item.firstName}</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted mx-4" style={{ textAlign: 'center' }}>Last Name : {item.lastName}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted mx-4" style={{ textAlign: 'center' }}>Status : {item.activity}</h6>
                                                    <div className='d-flex justify-content-evenly mt-5' style={{ height: '10%' }}>
                                                        <button type="button" className='btns' style={{ backgroundColor: 'red' }} onClick={() => {
                                                            dispatch({
                                                              type:'REMOVE_CONTACT',
                                                              payload:item
                                                          })
                                                          }}>Delete</button>
                                                        <button type='button' className='btns' style={{ backgroundColor: 'green' }} onClick={() => { editContact(i) }}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            }


                        </div>





                    </div>



                </div>



        </>
    )
}

export default Contact