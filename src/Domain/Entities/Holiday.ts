export interface Holiday {
  holidays: Map<HolidayMapElements['month'], HolidayMapElements['days']>;
}

export interface HolidayMapElements {
  month: 1|2|3|4|5|6|7|8|9|10|11|12;
  days: DaysObject;
}

export interface DaysObject {
  nationalHoliday: number[];
  autonomicHoliday: number[];
  localHoliday: number[];
}