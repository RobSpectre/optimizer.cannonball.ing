import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateTravelTime(distance, speed, economy, capacity, stop_time) {
  const driving_time_hours = distance / speed
  const gallonsNeeded = distance / economy
  const stops = Math.ceil(gallonsNeeded / capacity)
  const refueling_time_hours = stops * (stop_time / 60)
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

export function convertMinutesToHoursMinutes(minutesFloat) {
  const totalMinutes = Math.floor(minutesFloat);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Pad minutes and hours with leading zero if necessary
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
}

export function calculateTravelTimeWithFormatting(
  distance,
  speed,
  economy,
  capacity,
  stop_time) {
    const minutes = calculateTravelTime(
      distance,
      speed,
      economy,
      capacity,
      stop_time)

    return convertMinutesToHoursMinutes(minutes)
}
