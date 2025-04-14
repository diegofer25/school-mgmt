const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const students = await getAllStudents({ name, className, section, roll });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const message = await addNewStudent(req.body);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = { ...req.body, userId: id };
    const message = await updateStudent(payload);
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const studentDetail = await getStudentDetail(id);
    res.json(studentDetail);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, reviewerId } = req.body;
    const payload = { userId: id, status, reviewerId };
    const message = await setStudentStatus(payload);
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
