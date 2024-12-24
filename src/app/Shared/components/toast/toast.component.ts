import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { selectGlobalError, selectGlobalMessage } from '../../selectors/shared.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  message: string | null = null;
  error: string | null = null;
  private subscriptions = new Subscription();

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.subscriptions.add(
      this.store.select(selectGlobalMessage).subscribe((msg) => {
        if (msg) {
          this.message = msg;
          console.log(this.message);
          this.clearToastAfterDelay();
          console.log(this.message);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(selectGlobalError).subscribe((err) => {
        if (err) {
          this.error = err;
          console.log(this.error);
          this.clearToastAfterDelay();
        }
      })
    );
  }

  clearToastAfterDelay() {
    timer(3000).subscribe(() => {
      this.message = null;
      this.error = null;
      this.cdr.detectChanges();
    });
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
