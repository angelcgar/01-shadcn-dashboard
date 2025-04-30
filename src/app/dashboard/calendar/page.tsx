"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [multiple, setMultiple] = useState<Date[] | undefined>([])

  const smallDate = date?.toLocaleDateString("es-Es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-wrap">

      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
      disabled={date => date.getDay() === 0}
      />
      
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
      />
      
      <Calendar
      mode="multiple"
      selected={multiple}
      onSelect={setMultiple}
      className="rounded-md border shadow"
    
      />

      <div>
        <h1>Informacion</h1>
        <div className="border-b">
          {smallDate}
        </div>
        <p>{multiple?.map(date => date.toLocaleDateString()).join(", ")}</p>
      </div>
      
    </div>
  );
}
