import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateTravelTime(distance, speed, economy, capacity, stop_time) {
  const driving_time_hours = distance / speed
  const gallonsNeeded = distance / economy
  const stops = Math.max(0, Math.ceil(gallonsNeeded / capacity) - 1)
  const refueling_time_hours = stops * stop_time
  const total_time_hours = driving_time_hours + refueling_time_hours
  return total_time_hours * 60
}

export function findOptimalSpeed(distance, capacity, stop_time, speedMpgData) {
  let best_speed = null
  let min_time = Infinity

  for (const { speed, economy } of speedMpgData) {
    const total_time = calculateTravelTime(distance, speed, economy, capacity, stop_time)
    if (total_time < min_time) {
      min_time = total_time
      best_speed = speed
    }
  }

  return { best_speed, min_time }
}
