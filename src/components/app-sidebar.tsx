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
import { ChartAreaIcon, CircleQuestionMarkIcon } from "lucide-react";
import React, { useEffect } from "react";
import { ComboboxPopover } from "@/components/popover";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Effect, useStore } from "@tanstack/react-store";
import { ChartStore, chartStore } from "@/store/ChartStore";

export type Option = {
  value: string;
  label: string;
  desc?: string;
};

export function AppSidebar() {
  const [style, setStyle] = React.useState<Option[] | null>(null);

  const chartState = useStore(chartStore, (state: ChartStore) => state.chart);
  const styleState = useStore(chartStore, (state: ChartStore) => state.style);
  const optionsState = useStore(
    chartStore,
    (state: ChartStore) => state.options,
  );

  console.log(optionsState);

  useEffect(() => {
    const effect = new Effect({
      fn: () => {
        if (chartStore.state.chart === "area") {
          setStyle([
            { value: "default", label: "Default", desc: "Default style" },
            { value: "basic", label: "Basic" },
            { value: "basisClosed", label: "Basic Closed" },
            { value: "basisOpen", label: "Basis Open" },
            { value: "bumpX", label: "Bump X" },
            { value: "bumpY", label: "Bump Y" },
            { value: "bump", label: "Bump" },
            { value: "linear", label: "Linear" },
            { value: "linearClosed", label: "Linear Closed" },
            { value: "monotoneX", label: "Monotone X" },
            { value: "monotoneY", label: "Monotone Y" },
            { value: "monotone", label: "Monotone" },
            { value: "step", label: "Step" },
            { value: "stepBefore", label: "Step Before" },
            { value: "stepAfter", label: "Step After" },
          ]);
        } else if (chartStore.state.chart === "bar") {
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
        } else if (chartStore.state.chart === "line") {
        } else if (chartStore.state.chart === "pie") {
        } else if (chartStore.state.chart === "radar") {
        } else if (chartStore.state.chart === "radial") {
        } else {
          setStyle(null);
        }
      },
      deps: [chartStore],
    });

    const unmount = effect.mount();

    return () => {
      unmount();
    };
  }, [chartState]);

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
                  onSelect={(s) =>
                    chartStore.setState((state) => {
                      return state.chart !== s
                        ? {
                            ...state,
                            chart: s,
                            style: "default",
                          }
                        : { ...state };
                    })
                  }
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
              defaultValue={styleState || undefined}
              onSelect={(s) =>
                chartStore.setState((state) => {
                  return state.style !== s
                    ? {
                        ...state,
                        style: s,
                      }
                    : { ...state };
                })
              }
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
                    checked={optionsState.grid.enabled}
                    onCheckedChange={(checked) => {
                      chartStore.setState((state) => {
                        return state.options.grid.enabled !== checked
                          ? {
                              ...state,
                              options: {
                                ...state.options,
                                grid: {
                                  ...state.options.grid,
                                  enabled: !!checked,
                                },
                              },
                            }
                          : { ...state };
                      });
                    }}
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
                    checked={optionsState.axis.enabled}
                    onCheckedChange={(checked) => {
                      chartStore.setState((state) => {
                        return state.options.axis.enabled !== checked
                          ? {
                              ...state,
                              options: {
                                ...state.options,
                                axis: {
                                  ...state.options.axis,
                                  enabled: !!checked,
                                },
                              },
                            }
                          : { ...state };
                      });
                    }}
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
                    checked={optionsState.tooltip.enabled}
                    onCheckedChange={(checked) => {
                      chartStore.setState((state) => {
                        return state.options.tooltip.enabled !== checked
                          ? {
                              ...state,
                              options: {
                                ...state.options,
                                tooltip: {
                                  ...state.options.tooltip,
                                  enabled: !!checked,
                                },
                              },
                            }
                          : { ...state };
                      });
                    }}
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
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=false]]:border-transparent has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                  <Checkbox
                    id="toggle-legend"
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    checked={optionsState.legend.enabled}
                    onCheckedChange={(checked) => {
                      chartStore.setState((state) => {
                        return state.options.legend.enabled !== checked
                          ? {
                              ...state,
                              options: {
                                ...state.options,
                                legend: {
                                  ...state.options.legend,
                                  enabled: !!checked,
                                },
                              },
                            }
                          : { ...state };
                      });
                    }}
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Add Legend
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Display a legend on the chart for better understanding.
                    </p>
                  </div>
                </Label>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <CircleQuestionMarkIcon />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
