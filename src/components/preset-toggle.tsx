import { PaletteIcon } from "lucide-react";

import { usePreset } from "#/components/preset-provider";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { presetCatalog } from "#/config/presets";
import type { Dictionary } from "#/i18n";

export function PresetToggle({
  dictionary,
  label = "Change design preset",
}: {
  readonly dictionary?: Dictionary;
  readonly label?: string;
}) {
  const { preset, setPreset } = usePreset();
  const currentPreset = presetCatalog.presets.find((item) => item.id === preset);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <PaletteIcon aria-hidden="true" />
        <span className="sr-only">
          {label}. {dictionary?.appearance.current ?? "Current"}: {currentPreset?.label}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{dictionary?.appearance.preset ?? "Design preset"}</DropdownMenuLabel>
          {presetCatalog.presets.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.id}
              checked={preset === item.id}
              onCheckedChange={(checked) => checked && setPreset(item.id)}
              className="items-start py-2"
            >
              <span>
                <span className="block font-medium">{item.label}</span>
                <span className="block text-xs leading-5 text-muted-foreground">
                  {dictionary?.appearance.descriptions[item.id] ?? item.description}
                </span>
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
