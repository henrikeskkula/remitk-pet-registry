import { inject } from '@angular/core';
import { MAT_DATE_LOCALE, MatDateFormats, NativeDateAdapter } from '@angular/material/core';

export const ET_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'dd.MM.yyyy',
    timeInput: 'HH:mm'
  },
  display: {
    dateInput: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    },
    monthYearLabel: {
      month: 'long',
      year: 'numeric'
    },
    dateA11yLabel: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    },
    monthYearA11yLabel: {
      month: 'long',
      year: 'numeric'
    },
    timeInput: {
      hour: '2-digit',
      minute: '2-digit'
    },
    timeOptionLabel: {
      hour: '2-digit',
      minute: '2-digit'
    }
  }
};

export class EtDateAdapter extends NativeDateAdapter {
  private readonly matDateLocale = inject(MAT_DATE_LOCALE, { optional: true });

  constructor() {
    super();
    this.setLocale(this.matDateLocale ?? 'et-EE');
  }

  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return null;
      }

      const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(trimmedValue);

      if (match) {
        const day = Number(match[1]);
        const month = Number(match[2]) - 1;
        const year = Number(match[3]);
        const result = new Date(year, month, day);

        if (
          result.getFullYear() === year &&
          result.getMonth() === month &&
          result.getDate() === day
        ) {
          return result;
        }

        return null;
      }
    }

    return super.parse(value, this.locale);
  }

  override format(date: Date, displayFormat: object): string {
    if (
      typeof displayFormat === 'object' &&
      displayFormat !== null &&
      'day' in displayFormat &&
      'month' in displayFormat &&
      'year' in displayFormat
    ) {
      const day = `${date.getDate()}`.padStart(2, '0');
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    }

    return super.format(date, displayFormat);
  }
}
