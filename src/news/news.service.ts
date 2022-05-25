import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import { writeFileSync } from 'fs';
const util = require('util');

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getMarketSentiment() {
    return {
      sentiment: 'This is you market sentiment.',
    };
  }

  async getDawnNews() {
    const data = await this.getData('https://www.dawn.com/business');
    const news = [];
    const $ = cheerio.load(data);
    // console.log(container);
    $('article.story.box.mb-4.border-b.border-gray-200.pb-4', data).each(
      function (i, el) {
        const title = $(el).find('.story__title').text().replace(/\n/g, '');
        const link = $(el).find('a').attr('href');
        const desc = $(el)
          .find('.story__excerpt')
          .text()
          .replace(/  /g, '')
          .replace(/\n/g, '');
        const image = $(el).find('.media__item').find('img').attr('src');
        news.push({
          title: title,
          description: desc,
          link: link,
          image: image
            ? image
            : 'https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png',
        });
      },
    );
    return {
      news,
    };
  }

  async getProfitNews() {
    const data = await this.getData(
      'https://profit.pakistantoday.com.pk/category/personal-finance/markets/',
    );
    const news = [];
    const $ = cheerio.load(data);
    // console.log(container);
    $('div.td_module_10.td_module_wrap.td-animation-stack', data).each(
      function (i, el) {
        const title = $(el)
          .find('h3.entry-title.td-module-title')
          .text()
          .replace(/\n/g, '');
        const link = $(el)
          .find('h3.entry-title.td-module-title')
          .find('a')
          .attr('href');
        const desc = $(el)
          .find('.td-excerpt')
          .text()
          .replace(/  /g, '')
          .replace(/\n/g, '');
        const image = $(el).find('.td-module-thumb').find('img').attr('src');
        news.push({
          title: title,
          description: desc,
          link: link,
          image: image
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjymY5kmRqN3yXPuW3l-Qr41DE1exs-Nv4RxiB_EFdZNHqAtE0DuqbDLhqIdOAuklUTg&usqp=CAU'
            : 'https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png',
        });
      },
    );
    return {
      news,
    };
  }

  async getBrNews() {
    const data = await this.getData(
      'https://www.brecorder.com/pakistan/business-economy',
    );
    const news = [];
    const $ = cheerio.load(data);
    // console.log(container);
    $('article.story.box', data).each(function (i, el) {
      const title = $(el).find('.story__title').text().replace(/\n/g, '');
      const link = $(el).find('a').attr('href');
      const desc = $(el)
        .find('.story__excerpt')
        .text()
        .replace(/  /g, '')
        .replace(/\n/g, '');
      const image = $(el).find('.media__item').find('img').attr('src');
      news.push({
        title: title,
        description: desc,
        link: link,
        image: image
          ? image
          : 'https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png',
      });
    });
    return {
      news,
    };
  }

  async getNationNews() {
    const html = await this.getData('https://nation.com.pk/business/');
    const news = [];
    const $ = cheerio.load(html);
    $(
      'article.type-post.format-standard.has-post-thumbnail.listing-item.listing-item-blog.listing-item-blog-2.main-term-34.bsw-8 ',
      html,
    ).each(function (i, el) {
      const title = $(el)
        .find('h2.title')
        .text()
        .replace(/\t/g, '')
        .replace(/\n/g, '');
      const link = $(el).find('h2.title').find('a').attr('href');
      const desc = $(el)
        .find('.post-summary')
        .text()
        .replace(/\t/g, '')
        .replace(/\n/g, '');
      const image = 'https://nation.com.pk/storage/2021/10/logo-nation.png';
      news.push({
        title: title,
        description: desc,
        link: link,
        image: image
          ? image
          : 'https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png',
      });
    });
    return {
      news,
    };
  }

  async getMarketPerformance() {
    const html = await this.getData('https://dps.psx.com.pk/');
    const performance = [];
    const $ = cheerio.load(html);
    $('div.topIndices__item', html).each(function (i, el) {
      const name = $(el).find('.topIndices__item__name').text();
      const value = $(el).find('.topIndices__item__val').text();
      const change = $(el)
        .find('.topIndices__item__change')
        .text()
        .replace(/ /g, '');
      const changePercentage = $(el)
        .find('.topIndices__item__changep')
        .text()
        .replace(/[{()}]/g, '');
      performance.push({
        name,
        value,
        change,
        changePercentage,
      });
    });
    return {
      performance,
    };
  }

  async getStockInformation(stockName: string) {
    try {
      const html = await this.getData(
        `https://dps.psx.com.pk/company/${stockName}`,
      );
      const $ = cheerio.load(html);
      const quoteDetails = $('div.quote__details', html);
      const details = {
        fullName: quoteDetails.find('.quote__name').text(),
        sector: quoteDetails.find('.quote__sector').text(),
        price: $('div.quote__price', html).find('.quote__close').text(),
        change: $('div.quote__change', html).find('.change__value').text(),
        changePercentage: $('div.quote__change', html)
          .find('.change__percent')
          .text(),
        stockName,
      };
      return details;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Unable to get ${stockName} details`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getData(url): Promise<any> {
    try {
      const res = await lastValueFrom(this.httpService.get(url).pipe());
      writeFileSync('test.txt', util.inspect(res));
      return res.data;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Unable to reach ${url}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  noChannelFound() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Sorry, we dont cater to this channel',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
