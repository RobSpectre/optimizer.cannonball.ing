import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function calculateTravelTime(distance, speed, economy, capacity, stop_time) {
  const driving_time_hours = distance / speed
  const gallons_needed = distance / economy
  const stops = Math.ceil(gallons_needed / capacity)
  const refueling_time_hours = stops * (stop_time / 60)
  const total_time_hours = driving_time_hours + refueling_time_hours
  return {
    total_time: total_time_hours * 60,
    stops: stops,
    refueling_time: refueling_time_hours * 60,
    fuel_consumed: gallons_needed
  }
}

export function findOptimalSpeed(distance, capacity, stop_time, speedMpgData) {
  let best_speed = null
  let min_time = Infinity
  let stops = null
  let refueling_time = null
  let fuel_consumed = null

  for (const { speed, economy } of speedMpgData) {
    const travel_data = calculateTravelTime(distance, speed, economy, capacity, stop_time)
    if (travel_data.total_time < min_time) {
      min_time = travel_data.total_time
      best_speed = speed
      stops = travel_data.stops
      refueling_time = travel_data.refueling_time
      fuel_consumed = travel_data.fuel_consumed
    }
  }

  return {
    best_speed,
    min_time,
    stops,
    refueling_time,
    fuel_consumed 
  }
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
    const travel_data = calculateTravelTime(
      distance,
      speed,
      economy,
      capacity,
      stop_time)
    
    travel_data.total_time = convertMinutesToHoursMinutes(travel_data.total_time)
    travel_data.refueling_time = convertMinutesToHoursMinutes(travel_data.refueling_time)

    return travel_data 
}
