import { noop } from 'rxjs';

export function Noop(): <T>(target: T) => void {
  return noop;
}
