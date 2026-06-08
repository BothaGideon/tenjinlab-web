import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
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
export class OtakuTrackerPage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly changelogUrl =
    'https://raw.githubusercontent.com/BothaGideon/otaku_tracker/main/CHANGELOG.md';

  openChangelog = signal<string | null>('1.2.0');
  changelogLoadError = signal(false);

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

  ngOnInit(): void {
    this.loadRemoteChangelog();
  }

  private loadRemoteChangelog(): void {
    this.http
      .get(this.changelogUrl, { responseType: 'text' })
      .subscribe({
        next: markdown => {
          const parsedEntries = this.parseChangelog(markdown);
          if (parsedEntries.length === 0) {
            this.changelogLoadError.set(true);
            return;
          }

          this.changelog = parsedEntries;
          this.openChangelog.set(parsedEntries[0].version);
          this.changelogLoadError.set(false);
        },
        error: () => {
          this.changelogLoadError.set(true);
        },
      });
  }

  private parseChangelog(markdown: string): ChangelogEntry[] {
    const lines = markdown.split(/\r?\n/);
    const entries: ChangelogEntry[] = [];

    let currentEntry: ChangelogEntry | null = null;
    let currentSection: string | null = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();

      const versionMatch = line.match(/^##\s+\[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?$/);
      if (versionMatch) {
        if (currentEntry && currentEntry.version.toLowerCase() !== 'unreleased') {
          entries.push(currentEntry);
        }

        const [, version, isoDate] = versionMatch;
        currentEntry = {
          version,
          date: this.formatDate(isoDate),
          badge: 'update',
          highlights: [],
        };
        currentSection = null;
        continue;
      }

      if (!currentEntry) {
        continue;
      }

      const sectionMatch = line.match(/^###\s+(Added|Changed|Fixed|Removed|Security)$/i);
      if (sectionMatch) {
        currentSection = sectionMatch[1].toLowerCase();
        continue;
      }

      const bulletMatch = line.match(/^-\s+(.+)$/);
      if (bulletMatch && currentSection) {
        const content = bulletMatch[1].trim();
        if (content.toLowerCase() === 'none yet.') {
          continue;
        }

        const prefix = this.sectionPrefix(currentSection);
        currentEntry.highlights.push(prefix ? `${prefix}: ${content}` : content);
      }
    }

    if (currentEntry && currentEntry.version.toLowerCase() !== 'unreleased') {
      entries.push(currentEntry);
    }

    return entries
      .filter(entry => entry.highlights.length > 0)
      .map(entry => ({ ...entry, badge: this.detectBadge(entry.highlights) }));
  }

  private detectBadge(highlights: string[]): ChangelogEntry['badge'] {
    const normalized = highlights.join(' ').toLowerCase();
    if (normalized.includes('fixed:') || normalized.includes('security:')) {
      return 'fix';
    }
    if (normalized.includes('added:')) {
      return 'new';
    }
    return 'update';
  }

  private sectionPrefix(section: string): string {
    switch (section) {
      case 'added':
        return 'Added';
      case 'changed':
        return 'Changed';
      case 'fixed':
        return 'Fixed';
      case 'removed':
        return 'Removed';
      case 'security':
        return 'Security';
      default:
        return '';
    }
  }

  private formatDate(isoDate?: string): string {
    if (!isoDate) {
      return 'Date unavailable';
    }

    const [year, month, day] = isoDate.split('-').map(Number);
    const parsed = new Date(year, (month ?? 1) - 1, day ?? 1);
    if (Number.isNaN(parsed.getTime())) {
      return isoDate;
    }

    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

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
