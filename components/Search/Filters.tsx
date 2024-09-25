import { filters } from "@/lib/data";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
const Filters = () => {
  const router = useRouter();
  const [selectedProviders, setSelectedProviders] = useState<string[]>([
    "unsplash",
    "pixabay",
    "pexels",
    "freepik",
  ]);
  const searchParams = useSearchParams();
  const providersSearchParams = searchParams.get("pr") || "all";
  const providers = providersSearchParams.split(",");
  const handleChange = async (name: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set(name, value);

    window.scrollTo({ top: 0, behavior: "smooth" });

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };
  const handleSelectProvider = (provider: string) => {
    let newProviders = [...selectedProviders];
    if (selectedProviders.includes(provider)) {
      newProviders = selectedProviders.filter((p) => p !== provider);
    } else {
      newProviders.push(provider);
    }
    setSelectedProviders(newProviders);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("pr", newProviders.join(","));
    console.log(currentParams.toString());
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };
  console.log(selectedProviders);
  return (
    <div className="w-[250px] p-4 grid-filters border-r border-r-300 h-[calc(100vh-120px)] sticky top-[110px] overflow-y-auto">
      <RadioGroup
        defaultValue="relevance"
        onValueChange={(value) => handleChange("order", value)}
      >
        <h2 className="">Sort by</h2>
        {filters[0].values.map((filter, index) => (
          <div
            key={index}
            className="rounded-md border p-2 flex items-center gap-2 border-gray-200 shadow-sm"
          >
            <RadioGroupItem value={filter.value} />
            <h4 className="text-[#333] text-[14px] font-bold">{filter.name}</h4>
          </div>
        ))}
      </RadioGroup>
      <div>
        <h2 className="mt-4">Provider</h2>
        <div className="grid grid-cols-2 mt-3 gap-2">
          {filters[1].values.map((filter, index) => (
            <div
              key={index}
              className="p-2 flex gap-2 items-center justify-center cursor-pointer hover:border-blue-500 rounded-md border border-gray-200"
              onClick={() => {
                handleSelectProvider(filter.value);
              }}
            >
              <Checkbox
                checked={
                  providers.includes(filter.value) || providers[0] === "all"
                }
              />
              {filter.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
