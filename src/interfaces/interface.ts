interface OperatingHour {
    id: number;
    restaurant_id: number;
    day: string;
    opening_time: string;
    closing_time: string;
}

export interface CardProps {
    name: string;
    operating_hours: OperatingHour[];
}

export interface ListItem {
    id: number
    name: string,
    created_at: Date | null,
    operating_hours: []
}

export interface FormData {
    restaurantName: string;
    mondayOpening: string;
    mondayClosing: string;
    tuesdayOpening: string;
    tuesdayClosing: string;
    wednesdayOpening: string;
    wednesdayClosing: string;
    thursdayOpening: string;
    thursdayClosing: string;
    fridayOpening: string;
    fridayClosing: string;
    saturdayOpening: string;
    saturdayClosing: string;
    sundayOpening: string;
    sundayClosing: string;
}

export type OperatingHours = {
    [key: string]: string; // key is day, value is the time range
};