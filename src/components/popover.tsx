"use client";

import * as React from "react";

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

type Option = {
  value: string;
  label: string;
};

export function ComboboxPopover({
  label,
  options,
  selectedOption,
  setSelectedOption,
}: {
  label: string;
  options: Option[] | null;
  selectedOption?: Option | null;
  setSelectedOption?: React.Dispatch<React.SetStateAction<Option | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center space-x-4 justify-center">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>+ Choose {label}</>
            )}
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
                      setSelectedOption?.(
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
