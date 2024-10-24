import { prisma } from "@/lib/prisma"


export default function makeAppointment() {
  const appointmentService = prisma.appointment

  return appointmentService
}