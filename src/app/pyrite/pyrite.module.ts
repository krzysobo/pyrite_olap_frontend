import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PyriteMainComponent } from "./main/pyrite-main.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule, MatTableDataSource  } from "@angular/material/table";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {MatTabsModule} from '@angular/material/tabs';

import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { AggregatesComponent } from "./main/sub/aggregates/aggregates.component";
import { FactsComponent } from "./main/sub/facts/facts.component";
// import { HttpClient, HttpHandler } from "@angular/common/http";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule, 
        MatInputModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        FormsModule, 
        ReactiveFormsModule, 
        CommonModule, 
        RouterLink, 
        RouterLinkActive,
        MatFormFieldModule, 
        MatSortModule, 
        MatPaginatorModule, 
        MatDialogModule,
        MatExpansionModule, 
        MatAccordion,
        MatTabsModule,
        MatTableModule, 
        // MatTableDataSource,
    ],

    declarations: [
        PyriteMainComponent,
        AggregatesComponent,
        FactsComponent,

    ],
    providers: [
        MatDialog,
    ],

    exports: [

    ]
})
export class PyriteModule { }
