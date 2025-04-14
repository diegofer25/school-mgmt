const express = require("express");
const router = express.Router();
const studentController = require("./students-controller");
const { studentSchema, studentUpdateSchema, studentStatusSchema } = require("./student-schema");
const { validateRequest } = require("../../utils");

router.get("", studentController.handleGetAllStudents);
router.post("", validateRequest(studentSchema), studentController.handleAddStudent);
router.get("/:id", studentController.handleGetStudentDetail);
router.post("/:id/status", validateRequest(studentStatusSchema), studentController.handleStudentStatus);
router.put("/:id", validateRequest(studentUpdateSchema), studentController.handleUpdateStudent);

module.exports = { studentsRoutes: router };
