const { z } = require('zod');

const studentFields = {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().optional(),
  dob: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be in YYYY-MM-DD format")),
  admissionDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Admission Date must be in YYYY-MM-DD format")),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  roll: z.number().or(z.string().regex(/^\d+$/, "Roll number must be a numeric string")),
  currentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  fatherName: z.string().optional(),
  fatherPhone: z.string().optional(),
  motherName: z.string().optional(),
  motherPhone: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  relationOfGuardian: z.string().optional(),
  systemAccess: z.boolean().optional(),
};

const studentSchema = z.object({
  body: z.object({
    ...studentFields,
    id: z.number().optional(),
  }),
});

const studentUpdateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a numeric string"),
  }),
  body: z.object(Object.fromEntries(
    Object.entries(studentFields).map(([key, value]) => [key, value.optional()])
  )),
});

const studentStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "id must be a numeric string"),
  }),
  body: z.object({
    status: z.boolean({
      required_error: "Status is required",
      invalid_type_error: "Status must be a boolean"
    }),
    reviewerId: z.number({
      invalid_type_error: "Reviewer ID must be a number"
    }).optional(),
  }),
});

module.exports = {
  studentSchema,
  studentUpdateSchema,
  studentStatusSchema
};
