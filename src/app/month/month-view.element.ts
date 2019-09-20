import { CSSResult, LitElement, TemplateResult, css, customElement, html } from 'lit-element';
import { addMonths, format, isWeekend, subMonths } from 'date-fns';
import { boundMethod } from 'autobind-decorator';
import { classMap } from 'lit-html/directives/class-map';

import { CalendarInfo, getCalendarInfo } from '../utils/date';
import { REDUX_STORE, TIMESHEET_API_SERVICE } from '../tokens';
import { container } from '../ioc/container';
import { minutesToTimeString } from '../utils/time';

import { RootState } from '../store/root.reducer';
import { TimesheetDto, TimesheetItem } from '../models/timesheet-item.interface';
import { connect } from '../store/store';
import { fetchAsync, setCurrentMonth, update, updateProject } from '../store/timesheet/timesheet.actions';
import {
  selectAggregatedTimes,
  selectDirty,
  selectLoaded,
  selectTimesheetItems,
} from '../store/timesheet/timesheet.selectors';

import '../elements/button.element';
import '../elements/link-button.element';

type InputType = 'text' | 'time';

@customElement('sz-month-view')
export class MonthViewElement extends connect(LitElement) {
  public static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: var(--theme-card-background-color);
      }

      tr.weekend {
        background-color: #999;
      }

      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: var(--theme-active-background-color);
        color: var(--theme-active-color);
      }

      input:invalid {
        border: 1px dashed red;
      }
    `;
  }

  /**
   * Location object injected from @vaadin/router
   */
  private readonly location: { params: { month: string }; getUrl: (params: any) => string };

  private readonly store = container.inject(REDUX_STORE);

  private readonly apiService = container.inject(TIMESHEET_API_SERVICE);

  private calendarInfo: CalendarInfo;

  private aggregatedTime: { full: number; internal: number; projects: number } = { full: 0, internal: 0, projects: 0 };

  private items: { [key: string]: TimesheetItem } = {};

  private get prevMonthUrl(): string {
    return this.location.getUrl({ month: format(subMonths(this.calendarInfo.start, 1), 'yyyy-MM') });
  }

  private get nextMonthUrl(): string {
    return this.location.getUrl({ month: format(addMonths(this.calendarInfo.start, 1), 'yyyy-MM') });
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.calendarInfo = this.getCalendarInfo();
    this.store.dispatch(setCurrentMonth(this.calendarInfo.start));

    const loaded = selectLoaded(this.store.getState());
    if (!loaded) {
      this.store.dispatch(fetchAsync());
    }
  }

  public render(): TemplateResult {
    return html`
      <h1>Month overview ${format(this.calendarInfo.start, 'MM.yyyy')}</h1>

      <div>
        <sz-link-button href="${this.prevMonthUrl}">prev</sz-link-button>
        <sz-link-button href="${this.nextMonthUrl}">next</sz-link-button>
        <sz-button @click="${this.save}">Save me</sz-button>
      </div>

      <form>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Break</th>
              <th>Full time</th>
              <th>Internal time</th>
              <th>Project 1</th>
              <th>Project 2</th>
              <th>Project 3</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            ${this.getSummaryTemplate()} ${this.calendarInfo.days.map(this.getTableBodyTemplate)}
            ${this.getSummaryTemplate()}
          </tbody>
        </table>
      </form>

      <div><sz-button @click="${this.save}">Save me</sz-button></div>
    `;
  }

  @boundMethod
  public save(): void {
    const dirty = selectDirty(this.store.getState());
    if (dirty) {
      this.apiService.save(this.items);
    }
  }

  protected stateChanged(state: RootState): void {
    this.items = selectTimesheetItems(state);
    this.aggregatedTime = selectAggregatedTimes(state);
  }

  private updateItem(event: Event, day: Date, key: string): void {
    const dto: Partial<TimesheetDto> = {
      date: format(day, 'yyyy-MM-dd'),
      [key]: (event.target as HTMLInputElement).value,
    };
    this.store.dispatch(update(dto));
  }

  private updateProject(event: Event, day: Date, index: number): void {
    const dto = {
      date: format(day, 'yyyy-MM-dd'),
      value: (event.target as HTMLInputElement).value,
      index,
    };
    this.store.dispatch(updateProject(dto));
  }

  private getCalendarInfo(): CalendarInfo {
    let year: number;
    let month: number;

    if (this.location.params.month) {
      [year, month] = this.location.params.month.split('-').map(i => parseInt(i, 10));
      month -= 1;
    } else {
      const now = new Date();
      year = now.getFullYear();
      month = now.getMonth();
    }

    return getCalendarInfo(year, month);
  }

  @boundMethod
  private getTableBodyTemplate(day: Date): TemplateResult {
    const key = format(day, 'yyyy-MM-dd');
    const item = (this.items[key] || { projects: [] }) as TimesheetItem;

    return html`
      <tr class=${classMap({ weekend: isWeekend(day as Date) })}>
        <td>${format(day, 'dd.MM.yyyy')}</td>
        <td>
          ${this.getInputTemplate(day, item, 'start')}
        </td>
        <td>
          ${this.getInputTemplate(day, item, 'end')}
        </td>
        <td>
          ${this.getInputTemplate(day, item, 'break')}
        </td>
        <td>${minutesToTimeString(item.workTime)}</td>
        <td>${minutesToTimeString(item.internalWorkTime)}</td>
        <td>
          <input type="time" @change="${(e: Event) => this.updateProject(e, day, 0)}" value="${item.projects[0]}" />
        </td>

        <td>
          <input type="time" @change="${(e: Event) => this.updateProject(e, day, 1)}" value="${item.projects[1]}" />
        </td>

        <td>
          <input type="time" @change="${(e: Event) => this.updateProject(e, day, 2)}" value="${item.projects[2]}" />
        </td>
        <td>
          ${this.getInputTemplate(day, item, 'comment', false, 'text')}
        </td>
      </tr>
    `;
  }

  @boundMethod
  private getInputTemplate(
    day: Date,
    item: TimesheetItem,
    key: string,
    required = true,
    type: InputType = 'time'
  ): TemplateResult {
    return html`
      <input
        type="${type}"
        ?required="${required}"
        @change="${(e: Event) => this.updateItem(e, day, key)}"
        value="${item[key] || ''}"
      />
    `;
  }

  @boundMethod
  private getSummaryTemplate(): TemplateResult {
    return html`
      <tr>
        <th colspan="4">
          Summary
        </th>
        <th>${minutesToTimeString(this.aggregatedTime.full)}</th>
        <th>${minutesToTimeString(this.aggregatedTime.internal)}</th>
        <th colspan="3">${minutesToTimeString(this.aggregatedTime.projects)}</th>
        <th>&nbsp</th>
      </tr>
    `;
  }
}
