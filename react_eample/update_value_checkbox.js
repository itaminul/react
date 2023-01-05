import React, { useEffect, useState } from 'react'
import QRcode from 'react-qr-code'
import { Box, Button, Divider, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { handleEditClose } from '../../../reducer/ModalSlice';
import Select from 'react-select'
import { redirect, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import useFetch from 'react-fetch-hook';
 
 
const patchUrl = `http://192.168.0.84:5001/api/stuAttendance`;
const coursesUrl = `http://192.168.0.84:5001/api/course`;
const subUrl = `http://192.168.0.84:5001/api/subjects`;
const classRoomsUrl = `http://192.168.0.84:5001/api/classRooms`;
const classTypeUrl = `http://192.168.0.84:5001/api/classTypes`;
 
 
const StuAttenEditForm = () => {
 const dispatch = useDispatch();
 const val = useSelector((state) => state.Modal.val)
 const [courses, setCourses] = useState([])
  useEffect(() => {
   const getCouse = async() => {
     try {
       const result = await fetch(`${coursesUrl}`)
       const jsonData = await result.json();
       setCourses(jsonData.result)
     } catch (error) {
       console.log(error)       
     }
   }
   getCouse()
 }, [])
 
 
 /* fetch subject */
 const [subjects, setSubjects] = useState([])
 
 useEffect(() => {
   const getSubject = async() => {
     try {
       const response = await fetch(`${subUrl}`)
       const json = await response.json()
       setSubjects(json.result)       
     } catch (error) {
       console.log(error)
     }
   }
   getSubject()
 }, [])
 
 /*fetch class types*/
 const[classTypes, setClassTypes] = useState([])
 useEffect(() => {
   const getClassTypes = async() => {
     try {
       const response = await fetch(`${classTypeUrl}`)
       const json = await response.json()
       setClassTypes(json.result)
     } catch (error) {
       console.log(error)
     }
   }
   getClassTypes()
 }, [])
 
 /*fetch class rooms data*/
 
 const[classRooms, setClassRooms] = useState([])
 useEffect(() => {
   const getClassRooms = async() => {
     try {
       const response = await fetch(`${classRoomsUrl}`)
       const json = await response.json()
       setClassRooms(json.result)
     } catch (error) {
       console.log(error)
     }
   }
   getClassRooms()
 }, [])
 
 
 const[qrButton, setShowQrButton] = useState(false)
 
 /* start create handler function*/
 const [state, setState] = useState({
   courseId: val.courseId,
   subjectId: val.subjectId,
   classTypeId: val.classTypeId,
   classRoomId: val.classRoomId,
   groupId: val.groupId
 })
 
   /*filter*/
   const filterCouseName = Object.values(courses).find(e => e.id === `${state.courseId}`)
   const filterSubjectName = Object.values(subjects).find(e => e.id === `${state.subjectId}`)
   const filterClassTypeName = Object.values(classTypes).find(e => e.id === `${state.classTypeId}`)
   const filterClassRoomeName = Object.values(classRooms).find(e => e.id === `${state.classRoomId}`)
  
 /*find short name*/
 const[sCourse, setScouse] = useState([])
 
 useEffect(() => {
   if(typeof(filterCouseName) !== 'undefined') {
     let getShortName = filterCouseName.shortName
     setScouse(getShortName)
   }
 
 }, [state])
 
 const[sSubject, setSubject] = useState([])
 
 useEffect(() => {
   if(typeof(filterSubjectName) !== 'undefined') {
     let getShortSubName = filterSubjectName.shortName
     setSubject(getShortSubName)
   }
 
 }, [state])
 
 const[sClassType, setClassType] = useState([])
 
 useEffect(() => {
   if(typeof(filterClassTypeName) !== 'undefined') {
     let getShortClassTypeName = filterClassTypeName.shortName
     setClassType(getShortClassTypeName)
   }
 
 }, [state])
 
 const[sClassRoom, setClassRoom] = useState([])
 
 useEffect(() => {
   if(typeof(filterClassRoomeName) !== 'undefined') {
     let getShortClassRoomName = filterClassRoomeName.shortName
     setClassRoom(getShortClassRoomName)
   }
 
 }, [state])
 
 const handelChange = (e) => {
   e.preventDefault();
   let value = e.target.value;
 
   if(state.courseId != "" & state.subjectId != "" & state.classTypeId != "" & state.classRoomId != ""){
       setShowQrButton(true)
     }
     setState( previousState => {
       return {
         ...previousState,
         [e.target.name]: value
       }
     })
 
 
 }

  
 const [grpName, setGpName] = useState([])
 
 const handelChangeGRP = (e) => {
     let {value, checked }= e.target
     if(value){
     setShowQrButton(true)
     }else{
       setShowQrButton(false)
     }
 
    if(checked){
 
     setGpName(prevState => [
       ...prevState,
       {name: value}
     ])
   }else{
     let temp = grpName;
     temp = temp.filter((item) => item.name !== value);
     setGpName(temp);
   }
 
 }
 
 
 /*checkbox value initial state false*/
 const [isChecked, setIsChecked] = useState(false);
 const [isCheckedB, setIsCheckedB] = useState(false);
 const [isCheckedC, setIsCheckedC] = useState(false);
 const [isCheckedD, setIsCheckedD] = useState(false);
 const [isCheckedE, setIsCheckedE] = useState(false);
 
 /* value string to array */
 const ary = Object.assign([],val.groupId)
 /* value find using includes return true false*/
 const groupNameA = ary.includes('A');
 const groupNameB = ary.includes('B');
 const groupNameC = ary.includes('C');
 const groupNameD = ary.includes('D');
 const groupNameE = ary.includes('E');
 
 /* group name A check */
const checkcheck = () => {
 if (groupNameA) {
   setIsChecked(true)
 } else {
   setIsChecked(false)
 }
}
 
 /* group name B check */
const checkcheckB = () => {
 if (groupNameB) {
   setIsCheckedB(true)
 } else {
   setIsCheckedB(false)
 }
}
 /* group name C check */
 
const checkcheckC = () => {
 if (groupNameC) {
   setIsCheckedC(true)
 } else {
   setIsCheckedC(false)
 }
}
 /* group name D check */
 
const checkcheckD = () => {
 if (groupNameD) {
   setIsCheckedD(true)
 } else {
   setIsCheckedD(false)
 }
}
 
 /* group name E check */
const checkcheckE = () => {
 if (groupNameE) {
   setIsCheckedE(true)
 } else {
   setIsCheckedE(false)
 }
}
 
useEffect(() => {
 checkcheck();
 checkcheckB()
 checkcheckC()
 checkcheckD()
 checkcheckE()
}, [])
 

 
/*create QR code*/
const [showSubmitButton, setShowSubmitButton] = useState(false)
const[showQRImage, setShowQRImage] = useState(false)
 
const prevGrp = `${state.groupId},`
const stringData = grpName.map(({name}) => `${name}`).join('');
const cnew = prevGrp.concat(stringData)
const removeDupValue =[...new Set(cnew.split(","))].join("");
const createQRCode = `${state.courseId}${state.subjectId}${state.classTypeId}${state.classRoomId}${removeDupValue}`
 
const [qrcode,  setQr] = useState([])
 
const showQrCode = () => {
 setShowQRImage(true)
   const generateQRCode = `${sCourse}${sSubject}${sClassType}${sClassRoom}${removeDupValue}`
   setQr(generateQRCode)
   setShowSubmitButton(true)
 
}
 
/* submit form */
 
const handleSubmit = async(e) => {
 e.preventDefault();
 console.log('a')
 const prevGrp = `${state.groupId},`
 const stringData = grpName.map(({name}) => `${name}`).join(',');
 const cnew = prevGrp.concat(stringData)
 const removeDupValue =[...new Set(cnew.split(","))].join(",");
 const createQRCode = `${qrcode}`
 
   const createJson = {
   courseId: state.courseId,
   subjectId: state.subjectId,
   classTypeId: state.classTypeId,
   classRoomId: state.classRoomId,
   groupId: removeDupValue,
   qrCode: createQRCode
 }
 
 
 await fetch(`${patchUrl}/${val.id}`,{
   method: 'PATCH',
   headers: {
     'Content-Type': 'application/json'
 
   },
   body: JSON.stringify(createJson)  
 })
 .then((response) => response.json())
 .then((data) => {
   if(data.success){
     dispatch(handleEditClose)
   }
 })
 
}
 
 
 return (
   <div>
     <form>
       <Grid container spacing={2}>
         <Grid item xs={6}>
               <Box className="input-box">
                   <div className='label-name'> Course :</div>
                   <select
                   name="courseId"
                    onChange={handelChange}
                   value={state.courseId}
                   style={{
                   "padding" : ".8em 2.4em .8em .10em",
                   "width" : "100%",
                   "maxWidth": "100%",
                   "boxSizing": "border-box",
                   "margin": "0",
                   "background": "white",
                   "border": "1px solid #aaa",}}
                   >
                   <option value="">--select--</option>
                   {courses.map((course) => (
                   <option value={course.id}> {course.courseName}</option>
                   ))}
               </select>
               </Box>
               <Box className="input-box">
               <div className='label-name'> Subject :</div>
                   <select
                   name="subjectId"
                   onChange={handelChange}
                   value={state.subjectId}
                   style={{
                   "padding" : ".8em 2.4em .8em .10em",
                   "width" : "100%",
                   "maxWidth": "100%",
                   "boxSizing": "border-box",
                   "margin": "0",
                   "background": "white",
                   "border": "1px solid #aaa",}}
                   >
                   <option>--select--</option>
                   {subjects.map((sub) => (
                     <option value={sub.id}>{sub.subjectName}</option>
                   ))}
                 </select>
               </Box>
 
               <Box className="input-box">
               <div className='label-name'> Class Types :</div>
                   <select
                   name="classTypeId"
                   onChange={handelChange}
                   value={state.classTypeId}
                   //onChange={handelChangeCouse}
                   style={{
                   "padding" : ".8em 2.4em .8em .10em",
                   "width" : "100%",
                   "maxWidth": "100%",
                   "boxSizing": "border-box",
                   "margin": "0",
                   "background": "white",
                   "border": "1px solid #aaa",}}
                   >
                   <option>--select--</option>
                   {classTypes.map((ctype) => (
                     <option value={ctype.id}>{ctype.ClassTypesName}</option>
                   ))}
                 </select>
               </Box>
               <Box className="input-box">
                   <div className='label-name'> Class Rooms :</div>
                   <select
                   name='classRoomId'
                   onChange={handelChange}
                   value={state.classRoomId}
 
                   style={{
                   "padding" : ".8em 2.4em .8em .10em",
                   "width" : "100%",
                   "maxWidth": "100%",
                   "boxSizing": "border-box",
                   "margin": "0",
                   "background": "white",
                   "border": "1px solid #aaa",}}
                   >
                   <option value="">--select--</option>
                   {classRooms.map((classRoom) => (
                   <option value={classRoom.id}> {classRoom.classRoomsName}</option>
                   ))}
               </select>
               </Box>
               <Box>
                   <div className='label-name'     
                   style={{marginLeft: "15px"}}
                   > Group Name :{val.groupId}</div>
 
                   <Checkbox 
                   style={{marginLeft: "5px"}}
                       value="A"
                       name='grpName'
                        onClick={handelChangeGRP}
                       checked={isChecked}
                       // defaultChecked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                  
                   />
                   A
                   <Checkbox 
                       value="B"
                       name='grpName'
                       onClick={handelChangeGRP}                       
                       color="secondary"
                       checked={isCheckedB}
                       onChange={() => setIsCheckedB(!isCheckedB)}
                        />
                       B
                   <Checkbox 
                     value="C"
                     name='grpName'
                      onClick={handelChangeGRP}                       
                       color="default"
                       checked={isCheckedC}
                       onChange={() => setIsCheckedC(!isCheckedC)}
                      
                        />
                       C
                   <Checkbox
                       value="D"
                       name='grpName'
                        onClick={handelChangeGRP}
                       color="success"
                       checked={isCheckedD}
                       onChange={() => setIsCheckedD(!isCheckedD)}
                   />
                   D
                   <Checkbox
                       value="E"
                       name='grpName'
                        onClick={handelChangeGRP}
                       color="success"
                       checked={isCheckedE}
                       onChange={() => setIsCheckedE(!isCheckedE)}
                   />
                   E
                </Box>

                 
               {qrButton?
                <Button
                onClick={showQrCode}
                >Show QR</Button>
                :null}
 
           <Divider />
           <Box display="flex" justifyContent="end" gap="10px" padding="16px 16px 0">
                {showSubmitButton?
 
                 <Button type='button' size='small' variant="contained"
                       color="success"
                       onClick={handleSubmit}
                       >Submit</Button>
                       :null}
                     <Button size='small' variant="contained" color="error"
                       onClick={() => { dispatch(handleEditClose()) }}>Close</Button>
 
            </Box>
            </Grid>
            <Grid item xs={6}>
             {showQRImage?
 
            <div style={{ height: "auto", marginTop: "26px", margin: "0 auto", maxWidth: 264, width: "100%" }}>
                       <QRcode       
                           size={256}
                           style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                           value={`${qrcode}`}
                           viewBox={`0 0 256 256`}
               />
                 </div>
                 :null }
 
            </Grid>
       </Grid>
       </form>
   </div>
 )
}
 
 
export default StuAttenEditForm