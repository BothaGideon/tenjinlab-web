import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../../components/footer/footer';
import { Navbar } from '../../../components/navbar/navbar';

interface ChangelogEntry {
  version: string;
  date: string;
  badge: 'new' | 'update' | 'fix';
  highlights: string[];
}

@Component({
  selector: 'app-otakutracker-page',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './otakutracker-page.html',
  styleUrl: './otakutracker-page.scss',
})
export class OtakuTrackerPage {
  openChangelog = signal<string | null>('1.2.0');

  toggleChangelog(version: string) {
    this.openChangelog.update(v => (v === version ? null : version));
  }

  changelog: ChangelogEntry[] = [
    {
      version: '1.2.0',
      date: 'May 2025',
      badge: 'new',
      highlights: [
        'Added Discovery Engine with AI-powered recommendations',
        'New Season Tracker view with airing schedule',
        'Stats & Insights dashboard with watch-time heatmaps',
        'Revamped home feed with personalized sections',
      ],
    },
    {
      version: '1.1.0',
      date: 'February 2025',
      badge: 'update',
      highlights: [
        'Full MAL OAuth sync — import your existing lists in seconds',
        'Offline mode — browse your watchlist without internet',
        'Custom list sorting and filtering',
        'Performance improvements to list rendering',
      ],
    },
    {
      version: '1.0.0',
      date: 'November 2024',
      badge: 'new',
      highlights: [
        'Initial release on Google Play Store',
        'Smart Watchlist with status tracking (Watching, Completed, On-Hold, Dropped)',
        'Series detail pages with full MAL metadata',
        'Dark-first UI with custom purple theme',
      ],
    },
  ];

  screenshots = [
    { src: 'screenshots/otaku_tracker/home.jpeg', alt: 'Home screen' },
    { src: 'screenshots/otaku_tracker/my_list.jpeg', alt: 'My List' },
    { src: 'screenshots/otaku_tracker/seasonal.jpeg', alt: 'Seasonal' },
    { src: 'screenshots/otaku_tracker/anime_details.jpeg', alt: 'Anime Details' },
  ];

  features = [
    {
      icon: '📋',
      title: 'Smart Watchlist',
      description: 'Track every series across Watching, Completed, On-Hold, and Dropped, with quick-edit controls directly from your list.',
    },
    {
      icon: '🔄',
      title: 'MAL Sync',
      description: 'Full OAuth integration with MyAnimeList. Import your existing library in one tap, synced both ways.',
    },
    {
      icon: '🔍',
      title: 'Rich Discovery',
      description: 'Explore seasonal feeds, apply filters, and use richer search metadata to find your next series quickly.',
    },
    {
      icon: '📅',
      title: 'Seasonal Browser',
      description: 'Browse the current season with carousels and feed updates, including list user-count stats on seasonal cards.',
    },
    {
      icon: '📊',
      title: 'Stats Polish',
      description: 'Cleaner poster overlays and details stats with compact and separated-number formatting for faster scanning.',
    },
    {
      icon: '🌙',
      title: 'Dark-first Design',
      description: 'Built for night-time watching sessions. Every screen designed around a premium dark aesthetic.',
    },
  ];
}
