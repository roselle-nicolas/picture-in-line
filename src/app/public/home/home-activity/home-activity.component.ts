import { Component, OnInit } from '@angular/core';
import { HomeActivityCard } from 'src/app/shared/models/home-activity-card';

@Component({
  selector: 'pil-home-activity',
  templateUrl: './home-activity.component.html',
  styleUrls: ['./home-activity.component.scss']
})
export class HomeActivityComponent implements OnInit {

  activityCards: HomeActivityCard[];

  constructor() { }

  ngOnInit(): void {
    this.activityCards = [
      {
        title: 'Compressez vos images',
        imageSrc: './assets/images/home/copress-picture.png',
        textContent: 'Choisissez vos images parmi de nombreux formats.',
      },
      {
        title: 'Libérez votre temps',
        imageSrc: './assets/images/home/chrono.png',
        textContent: 'Revenez plus tard et reprenez le cours de vos opérations.'
      },
      {
        title: 'Gérez vos projets',
        imageSrc: './assets/images/home/download.jpg',
        textContent: 'Retrouver facilement vos images par projets.'
      },
    ]
  }

}
