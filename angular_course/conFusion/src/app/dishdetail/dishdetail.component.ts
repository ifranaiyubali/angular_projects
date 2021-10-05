import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') dishCommentFormDirective;

  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishCommentForm: FormGroup;
  dishComment: Comment;

  formErrors = {
    'author': '',
    'comment' : ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Message is required.'
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private dishCom: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
    }

  createForm() {
    this.dishCommentForm = this.dishCom.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]]
    });

    this.dishCommentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.dishCommentForm) { return; }
    const form = this.dishCommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); })
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.dishComment = this.dishCommentForm.value;
    this.dishCommentFormDirective.resetForm();
    this.dishCommentForm.reset({
      rating: 5,
    });
    this.dishComment['date'] = new Date().toISOString()
    this.dish.comments.push(this.dishComment);
    console.log(this.dishComment);
  }
}
