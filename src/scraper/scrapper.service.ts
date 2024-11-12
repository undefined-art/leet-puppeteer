import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  private readonly url = 'https://leetcode.com/';

  async fetchProblems(
    page: number = 1,
    size: number = 15,
    difficulty?: string,
  ): Promise<any> {
    const problemsData = await this.fetchProblemsData();

    if (!problemsData) {
      throw new Error('Failed to fetch problems data.');
    }

    const filteredProblems = this.filterProblems(
      problemsData.stat_status_pairs,
      difficulty,
    );

    const paginatedProblems = this.paginateProblems(
      filteredProblems,
      page,
      size,
    );

    return {
      total: filteredProblems.length,
      pages: Math.ceil(filteredProblems.length / size),
      current: page,
      problems: paginatedProblems,
    };
  }

  private async fetchProblemsData() {
    const browser = await puppeteer.launch({ headless: true });
    const pageInstance = await browser.newPage();

    try {
      await pageInstance.goto(this.url + 'api/problems/all/');

      const data = await pageInstance.evaluate(() =>
        JSON.parse(document.body.innerText),
      );

      return data;
    } catch (error) {
      console.error('Error fetching problems data:', error);

      return null;
    } finally {
      await browser.close();
    }
  }

  private filterProblems(statStatusPairs: any[], difficulty?: string) {
    let problems = statStatusPairs.filter(({ paid_only }) => !paid_only);

    if (difficulty) {
      problems = problems.filter(
        (problem) => problem.difficulty.level === difficulty,
      );
    }

    return problems;
  }

  private paginateProblems(problems: any[], page: number, size: number) {
    const startIndex = (page - 1) * size;

    return problems.slice(startIndex, startIndex + size);
  }

  async fetchProblemDetails(slug: string): Promise<any> {
    // TODO
    return slug;
  }
}
