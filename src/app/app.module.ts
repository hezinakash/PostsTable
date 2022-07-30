import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/tableComponent/table/table.component';
import { PostTableComponent } from './components/postsTbale/post-table/post-table.component';
import { PostsService } from './services/posts/posts.service';
import { SearchbarComponent } from './components/searchbar/searchbar/searchbar.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PostTableComponent,
    SearchbarComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
