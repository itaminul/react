        const [courses, setCourses] = useState([])
        useEffect(() => {
        const courseFeatch = async() => {
        try {
        const response = await fetch(`${coursesUrl}`)
        const json = await response.json();
        setCourses(json.result);
        } catch (error) {
        console.log(error)
        }
        }
        courseFeatch();
        }, [])

        /* from submit */
        const handleSubmit = async(e) => {
        e.preventDefault()
        const grpNameString = grpName.toString()
        const createJsonData = {
        courseId: state.courseId,
        subjectId: state.subjectId,
        classTypeId: state.classTypeId,
        classRoomId: state.classRoomId,
        qrCodeGen: gererateQrCode,
        groupId: grpNameString
        }
        await fetch(`${postUrl}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(createJsonData)
        })
        .then(( response ) => console.log(response))

        }

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
        



