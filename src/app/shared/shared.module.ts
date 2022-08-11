import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CdkTableModule } from '@angular/cdk/table';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LayoutModule } from '@angular/cdk/layout';

const modules = [
  CommonModule,
  NgApexchartsModule,
  MatNativeDateModule,
  FormsModule,
  LayoutModule,
  ReactiveFormsModule,
  RouterModule,
  MatRadioModule,
  MatDatepickerModule,
  MatChipsModule,
  MatSelectModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSortModule,
  MatTableModule,
  MatSliderModule,
  DragDropModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTreeModule,
  MatCardModule,
  MatSidenavModule,
  CdkTableModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSnackBarModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
  ],
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }
