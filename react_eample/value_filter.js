/* filter couse subject classtype class room short name*/
const crouseShortName = Object.values(courses).find(e => e.id === `${state.courseId}`)
const subjectsShortName = Object.values(subjects).find(e => e.id === `${state.subjectId}`)
const classTypesShortName = Object.values(classTypes).find(e => e.id === `${state.classTypeId}`)
const classRoomsShortName = Object.values(classRooms).find(e => e.id === `${state.classRoomId}`)
