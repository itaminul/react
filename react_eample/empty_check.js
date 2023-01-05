const [showQrButton, setShowQrButton] = useState(false)
const handelChange = (e) => {
e.preventDefault();
let value = e.target.value;
if(state.courseId != "" & state.subjectId != "" & state.classTypeId != "" & state.classRoomId != ""){
setShowQrButton(true)
}
setState({
...state,
[e.target.name] : value
})
}
