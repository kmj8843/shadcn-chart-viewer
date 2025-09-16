import { ChartAreaDefault } from "@/components/charts/AreaChart";
import { chartStore } from "@/store/ChartStore";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const store = useStore(chartStore, (state) => state);

  return (
    <div className="flex items-center flex-col w-full mt-10 mx-20">
      {store.chart === "area" && (
        <ChartAreaDefault
          type={store.style}
          grid={store.options.grid.enabled}
          axis={store.options.axis.enabled}
          axis_key={store.options.axis.key}
          legend={store.options.legend.enabled}
          tooltip={store.options.tooltip.enabled}
        />
      )}
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
}
