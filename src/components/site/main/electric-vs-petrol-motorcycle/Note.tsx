import { motion } from "framer-motion";

interface ElectricVsPetrolMotorcycleNoteProps {
  note: string;
}

function ElectricVsPetrolMotorcycleNote({
  note,
}: ElectricVsPetrolMotorcycleNoteProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.2 }}
      className="mx-auto mt-8 max-w-5xl font-bold rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-center text-sm leading-7 text-slate-600"
    >
      {note}
    </motion.p>
  );
}

export default ElectricVsPetrolMotorcycleNote;
