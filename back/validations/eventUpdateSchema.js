import eventCreationSchema from "./eventCreationSchema.js";

const eventUpdateSchema = eventCreationSchema.partial();

export default eventUpdateSchema;
