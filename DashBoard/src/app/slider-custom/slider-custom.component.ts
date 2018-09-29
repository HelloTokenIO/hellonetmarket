import {Component} from '@angular/core';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
  selector: 'slider-custom',
  templateUrl: 'slider-custom.component.html',
  styleUrls: ['slider-custom.component.css'],
})
export class SliderCustom {
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'years';
    }

    return value;
  }
}