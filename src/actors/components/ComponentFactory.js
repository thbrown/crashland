import { CommandModule } from "./CommandModule";
import { SmallThruster } from "./SmallThruster";
import { MediumThruster } from "./MediumThruster";
import { LargeThruster } from "./LargeThruster";
import { CargoContainer } from "./CargoContainer";

const TYPES = [
  CommandModule,
  SmallThruster,
  MediumThruster,
  LargeThruster,
  CargoContainer,
];

export function getCount() {
  return TYPES.length;
}

// Component factory
export function newComponent(
  x,
  y,
  angle,
  mouse,
  grid,
  key,
  typeIndex,
  keyboard
) {
  let Type = TYPES[typeIndex];
  return new Type(x, y, angle, mouse, grid, key, keyboard);
}
