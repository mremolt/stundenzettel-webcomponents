import { CSSResult, LitElement, TemplateResult, customElement, html, property } from 'lit-element';
import { addDays, format, startOfDay, subDays } from 'date-fns';

import { unflatten } from 'flat';

import '../elements/button.element';
import '../elements/link-button.element';

import { REDUX_STORE, TIMESHEET_API_SERVICE } from '../tokens';
import { RootState } from '../store/root.reducer';
import { TimesheetItem } from '../models/timesheet-item.interface';
import { buildEmptyTimesheetDto } from '../store/timesheet/timesheet.reducer';
import { connect } from '../store/store';
import { container } from '../ioc/container';
import { fetchAsync, setCurrentDay, update } from '../store/timesheet/timesheet.actions';
import { selectCurrentTimesheetItem, selectEntities, selectLoaded } from '../store/timesheet/timesheet.selectors';

import { STYLES } from './styles';

@customElement('sz-day-view')
export class DayViewElement extends connect(LitElement) {
  public static get styles(): CSSResult {
    return STYLES;
  }

  /**
   * Location object injected from @vaadin/router
   */
  private readonly location: { params: { day: string }; getUrl: (params: any) => string };

  private readonly store = container.inject(REDUX_STORE);

  private readonly apiService = container.inject(TIMESHEET_API_SERVICE);

  private currentDay: Date;

  @property({ type: Boolean }) private formValid: boolean;

  private currentItem: TimesheetItem;

  private get prevDayUrl(): string {
    return this.location.getUrl({ day: format(subDays(this.currentDay, 1), 'yyyy-MM-dd') });
  }

  private get nextDayUrl(): string {
    return this.location.getUrl({ day: format(addDays(this.currentDay, 1), 'yyyy-MM-dd') });
  }

  private get form(): HTMLFormElement | null {
    return this.shadowRoot.querySelector('form');
  }

  private getFormValid(): boolean {
    return this.form && this.form.checkValidity();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.currentDay = this.getCurrentDay();
    this.store.dispatch(setCurrentDay(this.currentDay));

    const loaded = selectLoaded(this.store.getState());
    if (!loaded) {
      this.store.dispatch(fetchAsync());
    }
  }

  public updated(): void {
    this.formValid = this.getFormValid();
  }

  public save(e: Event): void {
    e.preventDefault();

    if (this.getFormValid) {
      const data = new FormData(this.form);
      data.append('date', format(this.currentDay, 'yyyy-MM-dd'));

      const dto = unflatten(Object.fromEntries(data.entries()));

      this.store.dispatch(update(dto));

      const items = selectEntities(this.store.getState());
      this.apiService.save(items);
    }
  }

  public render(): TemplateResult {
    return html`
      <h1>Day View ${format(this.currentDay, 'dd.MM.yyyy')}</h1>

      <div>
        <sz-link-button href="${this.prevDayUrl}">prev</sz-link-button>
        <sz-link-button href="${this.nextDayUrl}">next</sz-link-button>
      </div>

      <form @change="${this.updateFormValidity}" @submit="${this.save}">
        <div class="form-group">
          <label for="input-start">Start</label>
          <input type="time" name="start" required id="input-start" value="${this.currentItem.start}" />
        </div>

        <div class="form-group">
          <label for="input-end">End</label>
          <input type="time" name="end" required id="input-end" value="${this.currentItem.end}" />
        </div>

        <div class="form-group">
          <label for="input-break">Break</label>
          <input type="time" name="break" required id="input-break" value="${this.currentItem.break}" />
        </div>

        <div class="form-group">
          <label for="input-p1">Project 1</label>
          <input type="time" name="projects.0" id="input-p1" value="${this.currentItem.projects[0] || ''}" />
        </div>

        <div class="form-group">
          <label for="input-p2">Project 2</label>
          <input type="time" name="projects.1" id="input-p2" value="${this.currentItem.projects[1] || ''}" />
        </div>

        <div class="form-group">
          <label for="input-p3">Project 3</label>
          <input type="time" name="projects.2" id="input-p3" value="${this.currentItem.projects[2] || ''}" />
        </div>

        <div class="form-group">
          <label for="input-comment">Comment</label>
          <input type="text" name="comment" id="input-comment" value="${this.currentItem.comment}" />
        </div>

        <div class="form-group">
          <sz-button ?disabled="${!this.formValid}" @click="${this.save}">Save</sz-button>
        </div>
      </form>
    `;
  }

  protected stateChanged(state: RootState): void {
    this.currentItem = selectCurrentTimesheetItem(state) || (buildEmptyTimesheetDto() as TimesheetItem);
  }

  private getCurrentDay(): Date {
    if (this.location.params.day) {
      const [year, month, day] = this.location.params.day.split('-').map(i => parseInt(i, 10));
      return startOfDay(new Date(year, month - 1, day));
    }

    return startOfDay(new Date());
  }

  private updateFormValidity(): void {
    this.formValid = this.getFormValid();
  }
}
