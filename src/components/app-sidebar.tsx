import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChartAreaIcon } from "lucide-react";
import React, { useEffect } from "react";
import { ComboboxPopover } from "@/components/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Option = {
  value: string;
  label: string;
};

export function AppSidebar() {
  const [selectedChart, setSelectedChart] = React.useState<Option | null>(null);
  const [selectedStyle, setSelectedStyle] = React.useState<Option | null>(null);
  const [style, setStyle] = React.useState<Option[] | null>(null);

  useEffect(() => {
    if (selectedChart?.value === "area") {
      setStyle([
        { value: "default", label: "Default" },
        { value: "linear", label: "Linear" },
        { value: "step", label: "Step" },
        { value: "legend", label: "Legend" },
        { value: "stacked", label: "Stacked" },
        { value: "stacked2", label: "Stacked Expanded" },
        { value: "gradient", label: "Gradient" },
        { value: "axes", label: "Axes" },
      ]);
    } else if (selectedChart?.value === "bar") {
      setStyle([
        { value: "default", label: "Default" },
        { value: "interactive", label: "Interactive" },
        { value: "horizontal", label: "Horizontal" },
        { value: "multiple", label: "Multiple" },
        { value: "stacked", label: "stacked" },
        { value: "label", label: "Label" },
        { value: "custom_label", label: "Custom Label" },
        { value: "mixed", label: "Mixed" },
        { value: "active", label: "Active" },
        { value: "negative", label: "Negative" },
      ]);
    } else if (selectedChart?.value === "line") {
    } else if (selectedChart?.value === "pie") {
    } else if (selectedChart?.value === "radar") {
    } else if (selectedChart?.value === "radial") {
    } else {
      setStyle(null);
    }

    if (selectedChart !== null) {
      setSelectedStyle({ value: "default", label: "Default" });
    }
  }, [selectedChart]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <ChartAreaIcon className="size-4" />
                </div>
                <div className="flex flex-row items-center gap-2 leading-none">
                  <span className="font-medium">Chart Viewer</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ComboboxPopover
                  label="Chart"
                  options={[
                    { value: "area", label: "Area Charts" },
                    { value: "bar", label: "Bar Charts" },
                    { value: "line", label: "Line Charts" },
                    { value: "pie", label: "Pie Charts" },
                    { value: "radar", label: "Radar Charts" },
                    { value: "radial", label: "Radial Charts" },
                  ]}
                  selectedOption={selectedChart}
                  setSelectedOption={setSelectedChart}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenu>
          <SidebarMenuItem>
            <ComboboxPopover
              label="Style"
              options={style}
              selectedOption={selectedStyle}
              setSelectedOption={setSelectedStyle}
            />
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="mt-4" />
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col gap-3">
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=false]]:border-transparent has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-grid"
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Add a Grid
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Display grid lines on the chart for better readability.
                    </p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=false]]:border-transparent has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-axis"
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Add an Axis
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Display axis lines on the chart for better readability.
                    </p>
                  </div>
                </Label>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=false]]:border-transparent has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-tooltip"
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Add Tooltip
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Show data values on hover for better insights.
                    </p>
                  </div>
                </Label>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
