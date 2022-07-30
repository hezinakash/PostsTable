import { Injectable } from '@angular/core';
import { JsonpalaceholderService } from '../../apis/jsonplacholderAPI';
import iPost from 'src/app/interfaces/post-interface';
import iComment from 'src/app/interfaces/comment-interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  // use HTTP client instead in Angular
  getPosts(): Promise<iPost[]> {
    return JsonpalaceholderService.get('/posts')
    .then(response => response.data);
  }

  getPostById(postId: number): Promise<iPost> {
    return JsonpalaceholderService.get(`/posts/${postId}`)
    .then(response => response.data);
  }

  getComments(): Promise<iComment[]> {
    return JsonpalaceholderService.get('/comments')
    .then(response => response.data);
  }
}
