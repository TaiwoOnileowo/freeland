import { filters } from "@/lib/data";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Filters = () => {
  
  return (
    <div className="w-[250px] p-4 grid-filters border-r border-r-300 h-[calc(100vh-120px)] sticky top-[110px] overflow-y-auto">
      <RadioGroup defaultValue="relevance">
        <h2 className="">Sort by</h2>
        {filters[0].values.map((filter, index) => (
          <div
            key={index}
            className="rounded-full border p-2 flex items-center gap-2 border-gray-200 shadow-sm"
          >
            <RadioGroupItem value={filter.value} />
            <h4 className="text-[#333] text-[14px] font-bold">{filter.name}</h4>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filters;
