import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import iPost from 'src/app/interfaces/post-interface';
import iComment from 'src/app/interfaces/comment-interface';
import iColumnData from 'src/app/interfaces/column-data-interface';


@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.less']
})
export class PostTableComponent implements OnInit {
  
  posts: iPost[] = [];
  postsIdsToDisplay: number[] = [];
  comments: iComment[] = [];
  columns: iColumnData[] = [];
  searchStr: string = "";
  noDataMsg: string = "No posts available yet...";
  page: number = 1;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.columns = [
      { 
        title: "Post Number",
        key: "id",
        type: "number"
      },
      { 
        title: "Title",
        key: "title",
        type: "string"
      },
      { 
        title: "Content",
        key: "body",
        type: "string"
      }];
    // setTimeout(() => this.initPosts(), 2000);
    this.initPosts();
  }

  initPosts() {
    this.postService.getPosts().then(posts => {
      this.posts = posts;
      this.clearNoDataMsg();
      this.posts[0].body+=" hezi"; // To remove
     }).catch(e => this.setNoDataMsg("No posts available yet..."));
  }

  onChange(searchStr: string){
    this.searchStr = searchStr;
    this.postsIdsToDisplay = [];
    this.page = 1;

    if (this.searchStr) {
      this.filterPoastsToDisplayBySearchStr();
    }
  }

  onPageChanged(page: number) {
    this.page = page;
  }

  postsToDisplay() {
    console.log("in function");
    let postsToDisplay: iPost[] = [];

    if (!this.searchStr && !this.postsIdsToDisplay.length) {
      postsToDisplay = this.posts;
    }
    else if (this.postsIdsToDisplay.length){
      postsToDisplay = this.posts.filter(post => this.postsIdsToDisplay.indexOf(post.id) > -1);
    }
    
    return postsToDisplay;
  }

  private filterPoastsToDisplayBySearchStr() {
    this.displayPostsByBody();
    this.displayPostByCommentsBody();

    if (!this.postsIdsToDisplay.length) {
      this.setNoDataMsg(`No posts were found for this search: ${this.searchStr}`);
    }
  }

  private displayPostsByBody() {
    this.postsIdsToDisplay = this.posts.filter(post => post.body.indexOf(this.searchStr) > -1)
    .map(post => post.id);
  }

  private displayPostByCommentsBody() {
    this.postService.getComments().then(comments => {
      this.comments = comments

      const postsIds: number[] = this.getPostsIdsByCommentsBody();
      this.addPostsToDisplayById(postsIds);
    })
    .catch(e => console.log(`An error appended while fetching comments - ${e}`));
  }

  private getPostsIdsByCommentsBody() {
    return this.comments.filter(comment => !(comment.postId in this.postsIdsToDisplay) && comment.body.indexOf(this.searchStr) > -1)
    .map(comment => comment.postId);
  }

  private addPostsToDisplayById(postsIds: number[]) {
      for (const id of postsIds) {
        let postToAdd = this.posts.find(post => post.id == id);

        if (postToAdd){
          this.postsIdsToDisplay.push(postToAdd.id);
        }
        else {
          this.fetchNewPostToDisplayById(id);
        }
    }
  }

  private fetchNewPostToDisplayById(id: number) {
    this.postService.getPostById(id).then(newPost => {
      this.posts.push(newPost);
      this.postsIdsToDisplay.push(newPost.id);
    })
    .catch(e => console.log(`An error appended while fetching post ${id} - ${e}`));
  }

  private clearNoDataMsg() {
    this.noDataMsg = "";
  }

  private setNoDataMsg(newMsg: string) {
    this.noDataMsg = newMsg;
  }

}
