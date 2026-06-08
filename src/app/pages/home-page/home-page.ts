import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

interface Project {
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  icon: string;
  slug: string;
  pills: string[];
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  projects: Project[] = [
    {
      name: 'OtakuTracker',
      eyebrow: 'MyAnimeList — Reimagined',
      tagline: 'Your anime universe, elevated',
      description:
        'A beautifully redesigned MAL experience — manage your watchlist, explore new series, and dive deep into your anime stats with a UI that actually feels modern.',
      icon: 'logos/ot_logo.jpeg',
      slug: 'otakutracker',
      pills: ['Smart Watchlist', 'MAL Sync', 'Discovery Engine', 'Season Tracker', 'Stats & Insights'],
    },
  ];
}
