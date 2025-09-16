"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

type Option = {
  value: string;
  label: string;
};

export function ComboboxPopover({
  label,
  options,
  defaultValue,
  onSelect,
}: {
  label: string;
  options: Option[] | null;
  defaultValue?: string;
  onSelect?: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<Option | null>(null);

  useEffect(() => {
    setOption(options?.find((o) => o.value === defaultValue) || null);
  }, [defaultValue]);

  useEffect(() => {
    if (onSelect && option) {
      onSelect(option.value);
    }
  }, [option]);

  return (
    <div className="flex items-center space-x-4 justify-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {option ? <>{option.label}</> : <>+ Choose {label}</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Select option" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      setOption?.(
                        options.find((priority) => priority.value === value) ||
                          null,
                      );
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
