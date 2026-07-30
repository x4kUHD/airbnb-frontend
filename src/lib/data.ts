import type { LucideIcon } from "lucide-react";
import {
  Umbrella,
  Mountain,
  Trees,
  Waves,
  Fence,
  Castle,
  Flame,
  Tent,
  Snowflake,
  MountainSnow,
  Sailboat,
  Gem,
  Wifi,
  Utensils,
  Car,
  Tv,
  WashingMachine,
  Wind,
  Refrigerator,
  Microwave,
  Coffee,
  ShowerHead,
  Dumbbell,
  PawPrint,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Categories — the horizontal rail under the navbar                   */
/* ------------------------------------------------------------------ */

export type Category = { label: string; icon: LucideIcon };

export const CATEGORIES: Category[] = [
  { label: "Beach", icon: Umbrella },
  { label: "Mountains", icon: Mountain },
  { label: "Cabins", icon: Trees },
  { label: "Amazing pools", icon: Waves },
  { label: "Countryside", icon: Fence },
  { label: "Castles", icon: Castle },
  { label: "Trending", icon: Flame },
  { label: "Camping", icon: Tent },
  { label: "Arctic", icon: Snowflake },
  { label: "Skiing", icon: MountainSnow },
  { label: "Lakefront", icon: Sailboat },
  { label: "Luxe", icon: Gem },
];

/* ------------------------------------------------------------------ */
/* Listings                                                            */
/* ------------------------------------------------------------------ */

export type Listing = {
  id: number;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  reviews: number;
  guestFavorite?: boolean;
};

export const LISTINGS: Listing[] = [
  {
    id: 1,
    location: "Malibu, California",
    distance: "2,345 kilometres away",
    dates: "Aug 12 – 17",
    price: 412,
    rating: 4.96,
    reviews: 184,
    guestFavorite: true,
  },
  {
    id: 2,
    location: "Aspen, Colorado",
    distance: "1,208 kilometres away",
    dates: "Sep 3 – 8",
    price: 289,
    rating: 4.89,
    reviews: 96,
  },
  {
    id: 3,
    location: "Lake Tahoe, Nevada",
    distance: "684 kilometres away",
    dates: "Aug 24 – 29",
    price: 356,
    rating: 5.0,
    reviews: 41,
    guestFavorite: true,
  },
  {
    id: 4,
    location: "Joshua Tree, California",
    distance: "312 kilometres away",
    dates: "Oct 1 – 6",
    price: 198,
    rating: 4.81,
    reviews: 233,
  },
  {
    id: 5,
    location: "Big Sur, California",
    distance: "1,976 kilometres away",
    dates: "Sep 14 – 19",
    price: 524,
    rating: 4.94,
    reviews: 77,
  },
  {
    id: 6,
    location: "Sedona, Arizona",
    distance: "902 kilometres away",
    dates: "Nov 5 – 10",
    price: 245,
    rating: 4.85,
    reviews: 158,
    guestFavorite: true,
  },
  {
    id: 7,
    location: "Portland, Oregon",
    distance: "1,431 kilometres away",
    dates: "Aug 19 – 24",
    price: 167,
    rating: 4.78,
    reviews: 312,
  },
  {
    id: 8,
    location: "Santa Fe, New Mexico",
    distance: "1,120 kilometres away",
    dates: "Sep 22 – 27",
    price: 213,
    rating: 4.92,
    reviews: 64,
  },
  {
    id: 9,
    location: "Hudson Valley, New York",
    distance: "3,842 kilometres away",
    dates: "Oct 12 – 17",
    price: 378,
    rating: 4.88,
    reviews: 129,
  },
  {
    id: 10,
    location: "Kauai, Hawaii",
    distance: "4,015 kilometres away",
    dates: "Dec 2 – 7",
    price: 649,
    rating: 4.97,
    reviews: 205,
    guestFavorite: true,
  },
  {
    id: 11,
    location: "Park City, Utah",
    distance: "756 kilometres away",
    dates: "Jan 8 – 13",
    price: 431,
    rating: 4.83,
    reviews: 88,
  },
  {
    id: 12,
    location: "Marfa, Texas",
    distance: "1,689 kilometres away",
    dates: "Sep 30 – Oct 5",
    price: 152,
    rating: 4.9,
    reviews: 47,
  },
];

/* ------------------------------------------------------------------ */
/* Listing detail                                                      */
/* ------------------------------------------------------------------ */

export const AMENITIES: { label: string; icon: LucideIcon }[] = [
  { label: "Wifi", icon: Wifi },
  { label: "Kitchen", icon: Utensils },
  { label: "Free parking on premises", icon: Car },
  { label: "TV with standard cable", icon: Tv },
  { label: "Washer", icon: WashingMachine },
  { label: "Air conditioning", icon: Wind },
  { label: "Refrigerator", icon: Refrigerator },
  { label: "Microwave", icon: Microwave },
  { label: "Coffee maker", icon: Coffee },
  { label: "Hot water", icon: ShowerHead },
  { label: "Exercise equipment", icon: Dumbbell },
  { label: "Pets allowed", icon: PawPrint },
];

/* ------------------------------------------------------------------ */
/* Search page filter pills                                            */
/* ------------------------------------------------------------------ */

export const FILTER_PILLS = [
  "Price",
  "Type of place",
  "Free cancellation",
  "Wifi",
  "Kitchen",
  "Air conditioning",
];

/* ------------------------------------------------------------------ */
/* Profile / trips                                                     */
/* ------------------------------------------------------------------ */

export type Trip = {
  id: number;
  title: string;
  location: string;
  dates: string;
  host: string;
};

export const TRIPS: Trip[] = [
  {
    id: 1,
    title: "Oceanfront villa with infinity pool",
    location: "Malibu, California, United States",
    dates: "Aug 12 – 17, 2026",
    host: "Hosted by Sofia",
  },
  {
    id: 2,
    title: "Modern A-frame cabin in the pines",
    location: "Lake Tahoe, Nevada, United States",
    dates: "Sep 24 – 28, 2026",
    host: "Hosted by Marcus",
  },
];
