import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Project {
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  icon: string;
  slug: string;
  pills: string[];
  gradient: string;
  accentColor: string;
}

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input() project!: Project;
}
