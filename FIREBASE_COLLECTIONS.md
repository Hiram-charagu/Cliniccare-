# ClinicCare Firestore Collections

Use these collections to back the current app structure.

## `users`
- `name`
- `email`
- `role` (`admin`, `doctor`, `patient`)
- `photoURL`
- `phone`
- `departmentId`
- `createdAt`

## `departments`
- `name`
- `description`
- `headDoctorId`
- `patientCount`
- `status`

## `appointments`
- `patientId`
- `doctorId`
- `departmentId`
- `scheduledAt`
- `status`
- `notes`
- `reason`

## `medicalRecords`
- `patientId`
- `doctorId`
- `appointmentId`
- `type`
- `title`
- `summary`
- `attachments`
- `createdAt`

## `prescriptions`
- `patientId`
- `doctorId`
- `appointmentId`
- `medications`
- `instructions`
- `issuedAt`
- `status`

## `consultations`
- `patientId`
- `doctorId`
- `appointmentId`
- `diagnosis`
- `symptoms`
- `plan`
- `createdAt`

## `carePlans`
- `patientId`
- `doctorId`
- `goals`
- `medications`
- `followUpDate`
- `status`

## `billing`
- `patientId`
- `appointmentId`
- `invoiceNumber`
- `amount`
- `status`
- `dueDate`

## `messages`
- `senderId`
- `recipientId`
- `subject`
- `body`
- `read`
- `createdAt`

## `logs`
- `actorId`
- `action`
- `entityType`
- `entityId`
- `createdAt`
- `meta`

## `settings`
- Use a single document like `settings/global`
- `clinicName`
- `contactEmail`
- `supportPhone`
- `theme`
- `notificationsEnabled`
