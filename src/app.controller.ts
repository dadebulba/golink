import { Controller, Get, HttpException, HttpStatus, Param, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomError } from './models/customError';
import { Link } from './models/link';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  webUI() {
    console.log(this.appService.getLinks());
    return { links : this.appService.getLinks() };
  }

  @Get(':id')
  @Redirect()
  findOne(@Param() params) {
    console.log(params.id);
    let link: Link = this.appService.getLink(params.id);
    if(link){
      return { url: link.from };
    }
    else {
      throw new HttpException('Specified link not found', HttpStatus.NOT_FOUND);
    }

  }
}
